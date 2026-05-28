
function arraybuffer_emit(event, data) {
    return axios.post(`/emit/${event}`, data ?? {},{responseType: 'arraybuffer', timeout: 3000000});
}

const GRAPHICS_BASE_PATH = 'data/graphics';

function guessMimeTypeFromPath(path) {
    const ext = (path.split('?')[0].split('#')[0].split('.').pop() || '').toLowerCase();
    switch (ext) {
        case 'png':
            return 'image/png';
        case 'jpg':
        case 'jpeg':
            return 'image/jpeg';
        case 'gif':
            return 'image/gif';
        case 'webp':
            return 'image/webp';
        case 'svg':
            return 'image/svg+xml';
        case 'mp4':
            return 'video/mp4';
        default:
            return 'application/octet-stream';
    }
}

function toGraphicsPath(urlOrPath) {
    if (!urlOrPath) return urlOrPath;
    if (urlOrPath.startsWith('static/asset/')) {
        return `${GRAPHICS_BASE_PATH}/${urlOrPath.substring('static/asset/'.length)}`;
    }
    if (urlOrPath.startsWith('data/graphics/')) {
        return `${GRAPHICS_BASE_PATH}/${urlOrPath.substring('data/graphics/'.length)}`;
    }
    return urlOrPath;
}

function getOrCreateLoadingLabel(el) {
    const parent = el?.parentElement;
    if (!parent) return null;

    const id = el.id ? `${el.id}__loading` : '';
    let label = null;
    if (id) {
        try {
            label = parent.querySelector(`#${CSS.escape(id)}`);
        } catch (_) {
            label = parent.querySelector(`#${id}`);
        }
    }
    if (!label) {
        label = parent.querySelector('.asset-loading-label');
    }
    if (label) return label;

    label = document.createElement('div');
    if (id) label.id = id;
    label.className = 'asset-loading-label tag is-dark';
    label.textContent = 'Loading...';
    label.style.position = 'absolute';
    label.style.top = '50%';
    label.style.left = '50%';
    label.style.transform = 'translate(-50%, -50%)';
    label.style.zIndex = '10';
    label.style.borderRadius = '8px';
    label.style.pointerEvents = 'none';
    label.style.display = 'none';
    label.style.zIndex = '1000';
    label.style.padding = '4px 8px';
    parent.appendChild(label);
    return label;
}

function showLoading(el) {
    const label = getOrCreateLoadingLabel(el);
    if (label) label.style.display = '';
}

function hideLoading(el) {
    const label = getOrCreateLoadingLabel(el);
    if (label) label.style.display = 'none';
}

function waitForMediaLoaded(el) {
    return new Promise(resolve => {
        if (!el) return resolve();

        const tag = (el.tagName || '').toUpperCase();
        if (tag === 'IMG') {
            if (el.complete) return resolve();
            const onDone = () => resolve();
            el.addEventListener('load', onDone, { once: true });
            el.addEventListener('error', onDone, { once: true });
            return;
        }

        if (tag === 'VIDEO') {
            if (el.readyState >= 2) return resolve();
            const onDone = () => resolve();
            el.addEventListener('loadeddata', onDone, { once: true });
            el.addEventListener('error', onDone, { once: true });
            return;
        }

        return resolve();
    });
}

// Cache asset blob URLs so slideshow/video swaps don't refetch the same files.
// Keyed by the request path sent to `getAssetData`.
const assetBlobUrlCache = new Map();

function getAssetCacheKey(urlOrPath) {
    return toGraphicsPath(urlOrPath);
}

async function getOrCreateAssetBlobUrl(urlOrPath) {
    const key = getAssetCacheKey(urlOrPath);
    if (!key) return null;

    const cached = assetBlobUrlCache.get(key);
    if (cached) return cached;

    const data = await fetchAssetArrayBuffer(key);
    if (!data) return null;

    const mime = guessMimeTypeFromPath(key);
    const blobUrl = URL.createObjectURL(new Blob([data], { type: mime }));
    assetBlobUrlCache.set(key, blobUrl);
    return blobUrl;
}

window.addEventListener('beforeunload', () => {
    for (const blobUrl of assetBlobUrlCache.values()) {
        try {
            URL.revokeObjectURL(blobUrl);
        } catch (_) {}
    }
    assetBlobUrlCache.clear();
});

async function fetchAssetArrayBuffer(urlOrPath) {
    const path = toGraphicsPath(urlOrPath);
    try {
        const res = await arraybuffer_emit('getAssetData', { path });
        return res?.data ?? null;
    } catch (_) {
        return null;
    }
}

async function setMediaSrcFromAsset(el, urlOrPath) {
    if (!el) return;

    showLoading(el);
    try {
        const blobUrl = await getOrCreateAssetBlobUrl(urlOrPath);
        el.setAttribute('src', blobUrl ?? urlOrPath);
        await waitForMediaLoaded(el);
    } finally {
        hideLoading(el);
    }
}

function zeroPad(num, places) {
    let zero = places - num.toString().length + 1;
    return Array(+(zero > 0 && zero)).join("0") + num;
}

const preloadImage = src => 
    new Promise((resolve, reject) => {
        const image = new Image()
        image.onload = resolve
        image.onerror = reject
        image.src = src
    })

function generateElements(html) {
    const template = document.createElement('template');
    template.innerHTML = html.trim();
    return template.content.children[0];
}

function isSlideShow(num){
    return database["subbg"].filter(x => x.value == num)[0]["multi"] ?? false;
}

function isScroll(num){
    return database["subbg"].filter(x => x.value == num)[0]["scroll"] ?? false;
}

function isVideo(num){
    return database["subbg"].filter(x => x.value == num)[0]["video"] ?? false;
}


let nemsys_selector = document.querySelector('#nemsys_select');
nemsys_selector.addEventListener('change', async ()=>{
    let preview = document.querySelector('#nemsys_pre');
    let value = nemsys_selector.value;
    await setMediaSrcFromAsset(preview, "data/graphics/game_nemsys/nemsys_" + zeroPad(value, 4) + ".png");
});

document.querySelector('#nemsys_pre').addEventListener('mousemove', (e)=>{
    let x = e.layerX;
    let y = e.layerY;
    let preview = document.querySelector('#nemsys_pre');
    let width = preview.clientWidth;
    let height = preview.clientHeight;

    let yRot = 10 * ((x - width / 2) / width);
    let xRot = -10 * ((y - height / 2) / height);

    let string = 'perspective(500px) scale(1) rotateX(' + xRot + 'deg) rotateY(' + yRot + 'deg)'
    preview.style.transform = string;
    preview.style.transition = 'transform 0s';
});

document.querySelector('#nemsys_pre').addEventListener('mouseout', (e)=>{
    let preview = document.querySelector('#nemsys_pre');
    let string = 'perspective(500px) scale(1) rotateX(0) rotateY(0)'
    preview.style.transform = string;
    preview.style.transition = 'transform 0.5s';
});

let subbg_select = document.querySelector('[name="subbg"]');
let interval;
let cnt = 1;
subbg_select.addEventListener('change', async ()=>{
    let preview = document.querySelector('#sub_pre');
    let video = document.querySelector('#sub_video_pre');
    let value = subbg_select.value;
    clearInterval(interval);
    cnt = 1;

    const videoSelected = isVideo(value);

    // Ensure correct element is visible immediately.
    if (videoSelected) {
        preview.style.display = 'none';
        video.style.display = 'block';
    } else {
        video.style.display = 'none';
        try {
            video.pause();
            video.currentTime = 0;
        } catch (_) {}
        preview.style.display = '';
    }

    if(isScroll(value)){
        preview.classList.add('scroll');
    }else{
        preview.classList.remove('scroll');
    }

    if(videoSelected){
        await setMediaSrcFromAsset(video, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + ".mp4");
        video.setAttribute("autoplay", "");
        video.setAttribute("loop", "");
        return;
    }

    if(isSlideShow(value)){
        await setMediaSrcFromAsset(preview, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + "_01.png");
        interval = setInterval(()=>{
            if(cnt == 1){
                setMediaSrcFromAsset(preview, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + "_02.png");
                cnt = 2;
            }else if(cnt == 2){
                setMediaSrcFromAsset(preview, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + "_03.png");
                cnt = 3;
            }else{
                setMediaSrcFromAsset(preview, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + "_01.png");
                cnt = 1;
            }
        }, 1000);
    }else{
        clearInterval(interval);
        await setMediaSrcFromAsset(preview, "data/graphics/submonitor_bg/subbg_" + zeroPad(value, 4) + ".png");
    }
});

let audioContext = new AudioContext();
let play = audioContext.createBufferSource();
let gain = audioContext.createGain();
let biquadFilter = audioContext.createBiquadFilter();
play.connect(gain);
gain.connect(audioContext.destination);
gain.gain.value = 0.5;


$('[name="bgm"]').change(function() {
    // $('#custom_0').attr("src", "static/asset/audio/custom_" + zeroPad($('[name="bgm"]').val(), 2) + "/0.mp3");
    $('#custom_1').attr("src", "static/asset/audio/custom_" + zeroPad($('[name="bgm"]').val(), 2) + "/1.mp3");
    if ($('[name="bgm"]').val() == 99) {
        // $('#custom_0').attr("src", "static/asset/audio/special_00/0.m4a");
        $('#custom_1').attr("src", "static/asset/audio/custom_00/1.m4a");
    }
    // $('#custom_0').prop("volume", 0.5);
    $('#custom_1').prop("volume", 0.2);

    $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
        $(this).text('Play').animate({ 'opacity': 1 }, 200);
    });
    play_sel = false;
    if(play.state == "running"){
        play.stop();
    }
    fetch("static/asset/audio/custom_" + zeroPad($('[name="bgm"]').val(), 2) + (typeof database["bgm"][$('[name="bgm"]').val()].file === 'undefined' ? "/0.mp3":database["bgm"][$('[name="bgm"]').val()].file))
        .then(res => res.arrayBuffer())
        .then(arrayBuffer => audioContext.decodeAudioData(arrayBuffer))
        .then(audioBuffer => {
            play.buffer = null;
            play = audioContext.createBufferSource();
            gain = audioContext.createGain();
            play.connect(gain);
            biquadFilter = audioContext.createBiquadFilter();
            gain.connect(biquadFilter);
            // filter.connect(context.destination);
            biquadFilter.type = "highpass";
            biquadFilter.frequency.value = 0;

            biquadFilter.connect(audioContext.destination);
            gain.gain.value = 0.2;
            play.buffer = audioBuffer;
            play.loop = true;
            // play.loopStart = 1.2;
            // play.loopEnd = 22.7;
            play.loopStart = database["bgm"][$('[name="bgm"]').val()].loopStart ?? 0;
            play.loopEnd = database["bgm"][$('[name="bgm"]').val()].loopEnd ?? 30;
            $('#play_bgm').prop("disabled", false);
        });
    //disable play button
    $('#play_bgm').prop("disabled", true);
    $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
        $(this).text('Play').animate({ 'opacity': 1 }, 200);
    });
    audioContext.suspend()

    play_bgm = false;
    first = true;
});

let testcurrent = 2.8;

async function test(){
    let audioContext = new AudioContext();
    let play = audioContext.createBufferSource();
    let gain = audioContext.createGain();
    
    play.connect(gain);
    gain.connect(audioContext.destination);
    gain.gain.value = 0.5;

    let res = await fetch("static/asset/audio/custom_23/0.mp3");
    let arrayBuffer = await res.arrayBuffer();
    let audioBuffer = await audioContext.decodeAudioData(arrayBuffer);
    play.buffer = audioBuffer;
    play.loop = true;
    play.loopStart = 4.6;
    play.loopEnd = 20;
    play.start(audioContext.currentTime, 0);
}


$('[name="stampA"]').change(function() {
    $('#a_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampA"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#a_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#a_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#a_pre').fadeIn(200);
});



$('[name="stampB"]').change(function() {
    $('#b_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampB"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#b_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#b_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#b_pre').fadeIn(200);
});

$('[name="stampC"]').change(function() {
    $('#c_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampC"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#c_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#c_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#c_pre').fadeIn(200);
});

$('[name="stampD"]').change(function() {
    $('#d_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampD"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#d_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#d_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#d_pre').fadeIn(200);
});

$('[name="stampA_R"]').change(function() {
    $('#ar_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampA_R"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#ar_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#ar_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#ar_pre').fadeIn(200);
});

$('[name="stampB_R"]').change(function() {
    $('#br_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampB_R"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#br_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#br_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#br_pre').fadeIn(200);
});

$('[name="stampC_R"]').change(function() {
    $('#cr_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampC_R"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#cr_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#cr_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#cr_pre').fadeIn(200);
});

$('[name="stampD_R"]').change(function() {
    $('#dr_pre').fadeOut(200, async () => {
        let stamp = $('[name="stampD_R"]').val();
        if (stamp == 0) {
            await setMediaSrcFromAsset(document.querySelector('#dr_pre'), "static/asset/nostamp.png");
        } else {
            let group = Math.trunc((stamp - 1) / 4 + 1);
            let item = stamp % 4;
            if (item == 0) item = 4;
            await setMediaSrcFromAsset(document.querySelector('#dr_pre'), "data/graphics/chat_stamp/stamp_" + zeroPad(group, 4) + "/stamp_" + zeroPad(group, 4) + "_" + zeroPad(item, 2) + ".png");
        }
    });
    $('#dr_pre').fadeIn(200);
});

let disable_bg = false;
const transpose = window.mp4Transpose;
$('[name="mainbg"]').change(function() {
    let video = document.querySelector('#mainbg_video_pre');
    let img = document.querySelector('#mainbg_img_pre');

    let filestr = ""
    disable_bg = false;
    let bg_color = document.querySelector('.card').style["background-color"]
    document.querySelector('.card').style["background-color"] = bg_color.length == 9 ? bg_color.substring(0, bg_color.length - 2) + "99" : bg_color;
    switch($('[name="mainbg"]').val()){
        case "0":
            filestr = "default"
            // disable_bg = true;
            // document.querySelector('.card').style["background-color"] = bg_color.length == 9 ? bg_color.substring(0, bg_color.length - 2) : bg_color;
            break;
        case "1":
            filestr = "booth"
            break;
        case "2":
            filestr = "ii"
            break;
        case "3":
            filestr = "iii";
            break
        case "17":
            filestr = "iiis2"
            break;
        case "18":
            filestr = "iv"
            break;
        case "19":
            filestr = "v"
            break;
        default:
            filestr = "sysbg_" + zeroPad($('[name="mainbg"]').val(), 4);
            break;
    }

    
    img.setAttribute("src", "static/asset/main_bg/"+filestr+".png");
    
    
    // video.setAttribute("style", "")
    video.setAttribute("src", 'static/asset/video/'+filestr+'.mp4');
    video.setAttribute("autoplay", "");
    video.setAttribute("loop", "");
});


// $('#custom_0').on('ended', function() {
//     $('#custom_0').currentTime = 0;
//     $('#play_bgm').animate({ 'opacity': 0 }, 200, function() {
//         $(this).text('Play').animate({ 'opacity': 1 }, 200);
//     });

//     play_bgm = false;
// });

$('#custom_1').on('ended', function() {
    $('#custom_1').currentTime = 0;
    $('#play_sel').animate({ 'opacity': 0 }, 200, function() {
        $(this).text('Play').animate({ 'opacity': 1 }, 200);
    });
    play_sel = false;
});

let profile_data, database;
let play_bgm = false;
let play_sel = false;
let first = true;

let bg_opacity = false;

const getPreferredScheme = () => window?.matchMedia?.('(prefers-color-scheme:dark)')?.matches ? 'dark' : 'light';

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
    const newColorScheme = event.matches ? "true" : "false";
    document.querySelector('.card').style["background-color"] = newColorScheme ? "#0a0a0a99" : "#ffffff99";
});


document.addEventListener('DOMContentLoaded', function() {
    profile_data = JSON.parse(document.getElementById("data-pass").innerText);
    let colorScheme = getPreferredScheme() === 'dark';
    document.querySelector('.card').style["background-color"] = colorScheme ? "#0a0a0a99" : "#ffffff99";
    fetch("static/asset/json/data.json")
        .then(res => {return res.json()})
        .then(json => {
            database = json;

            let nemsys = document.querySelector('#nemsys_select');
            let nemsys_option = ""
            json["nemsys"].forEach(x => {
                nemsys_option += `<option value="${x.value}">${x.name}</option>`;
            });
            nemsys.innerHTML = nemsys_option;
            nemsys.value = profile_data["nemsys"];
            nemsys.dispatchEvent(new Event('change'));

            let subbg = document.querySelector('[name="subbg"]');
            let subbg_option = ""
            json["subbg"].forEach(x => {
                subbg_option += `<option value="${x.value}">${x.name}</option>`;
            });
            subbg.innerHTML = subbg_option;
            subbg.value = profile_data["subbg"];
            subbg.dispatchEvent(new Event('change'));

            let bgm = document.querySelector('[name="bgm"]');
            let bgm_option = ""
            json["bgm"].forEach(x => {
                bgm_option += `<option value="${x.value}">${x.name}</option>`;
            });
            bgm.innerHTML = bgm_option;
            bgm.value = profile_data["bgm"];
            bgm.dispatchEvent(new Event('change'));

            let akaname = document.querySelector('[name="akaname"]');
            let akaname_option = ""
            json["akaname"].forEach(x => {
                akaname_option += `<option value="${x.value}">${x.name}</option>`;
            });
            akaname.innerHTML = akaname_option;
            akaname.value = profile_data["akaname"];
            akaname.dispatchEvent(new Event('change'));

            let appeal_frame = document.querySelector('[name="appeal_frame"]');
            appeal_frame.value = profile_data["appeal_frame"];

            let support_team = document.querySelector('[name="support_team"]');
            support_team.value = profile_data["support_team"];

            let use_pro_team = document.querySelector('[name="use_pro_team"]');
            use_pro_team.checked = profile_data["use_pro_team"];

            let stampA = document.querySelector('[name="stampA"]');
            let stampB = document.querySelector('[name="stampB"]');
            let stampC = document.querySelector('[name="stampC"]');
            let stampD = document.querySelector('[name="stampD"]');
            let stampA_R = document.querySelector('[name="stampA_R"]');
            let stampB_R = document.querySelector('[name="stampB_R"]');
            let stampC_R = document.querySelector('[name="stampC_R"]');
            let stampD_R = document.querySelector('[name="stampD_R"]');

            let stampOptions = "";
            json["stamp"].forEach(x => {
                stampOptions += `<option value="${x.value}">${x.name}</option>`;
            });
            stampA.innerHTML = stampOptions;
            stampB.innerHTML = stampOptions;
            stampC.innerHTML = stampOptions;
            stampD.innerHTML = stampOptions;
            stampA_R.innerHTML = stampOptions;
            stampB_R.innerHTML = stampOptions;
            stampC_R.innerHTML = stampOptions;
            stampD_R.innerHTML = stampOptions;
            stampA.value = profile_data["stampA"];
            stampB.value = profile_data["stampB"];
            stampC.value = profile_data["stampC"];
            stampD.value = profile_data["stampD"];
            stampA_R.value = profile_data["stampA_R"];
            stampB_R.value = profile_data["stampB_R"];
            stampC_R.value = profile_data["stampC_R"];
            stampD_R.value = profile_data["stampD_R"];
            stampA.dispatchEvent(new Event('change'));
            stampB.dispatchEvent(new Event('change'));
            stampC.dispatchEvent(new Event('change'));
            stampD.dispatchEvent(new Event('change'));
            stampA_R.dispatchEvent(new Event('change'));
            stampB_R.dispatchEvent(new Event('change'));
            stampC_R.dispatchEvent(new Event('change'));
            stampD_R.dispatchEvent(new Event('change'));

            let mainbg = document.querySelector('[name="mainbg"]');
            let mainbg_option = ""

            json["mainbg"].forEach(x => {
                mainbg_option += `<option value="${x.value}">${x.name}</option>`;
            });
            mainbg.innerHTML = mainbg_option;
            mainbg.value = profile_data["mainbg"];
            mainbg.dispatchEvent(new Event('change'));

            

            setTimeout(()=>{
                document.querySelector('#mainbg_video_pre').play();
            }, 500)

            document.querySelector('html.has-aside-left.has-aside-mobile-transition.has-navbar-fixed-top.has-aside-expanded body div#app div#main-content.content div.simplebar-wrapper div.simplebar-mask div.simplebar-offset div.simplebar-content-wrapper div.simplebar-content')
                .style["overflow-y"] = "auto";
            document.querySelector('.uiblocker').style.display = 'none';
    });

    // let custom_0 = document.querySelector('#custom_0');
    let custom_1 = document.querySelector('#custom_1');

    // custom_0.volume = 0.5;
    custom_1.volume = 0.2;

    let play_bgm_button = generateElements('<button class="button is-primary" type="button" id="play_bgm"><button>');
    play_bgm_button.append("Play");
    play_bgm_button.addEventListener('click', function() {
        if (play_bgm) {
            // custom_0.pause();
            audioContext.suspend();
            play_bgm_button.innerHTML = "Play";
        } else {
            // custom_0.play();
            if(first){
                play.start()
                first = false
            }
            audioContext.resume()
            play_bgm_button.innerHTML = "Stop";
        }
        play_bgm = !play_bgm;
    });

    let play_bgm_outer_div = generateElements('<div class="buttons" style="border-top:2px solid #333333;padding-top: 10px; margin-right: 20px;"></div>');
    play_bgm_outer_div.append(play_bgm_button);
    document.querySelector('#bgm_pre').append(play_bgm_outer_div);

    let play_sel_button = generateElements('<button class="button is-primary" type="button" id="play_sel"><button>');
    play_sel_button.append("Play");
    play_sel_button.addEventListener('click', function() {
        if (play_sel) {
            custom_1.pause();
            play_sel_button.innerHTML = "Play";
        } else {
            custom_1.play();
            play_sel_button.innerHTML = "Stop";
        }
        play_sel = !play_sel;
    });

    let play_sel_outer_div = generateElements('<div class="buttons" style="border-top:2px solid #333333;padding-top: 10px; margin-right: 20px;"></div>');
    play_sel_outer_div.append(play_sel_button);
    document.querySelector('#sel_pre').append(play_sel_outer_div);


    let play_bg_button = generateElements('<button class="button is-primary" type="button" id="play_bg"><button>');
    play_bg_button.append("BG SHOW");
    play_bg_button.addEventListener('click', function() {
        
        let video = document.querySelector('#mainbg_video_pre');
        video.play();

        let card = document.querySelector('.card');
        card.style["opacity"] = "0";
        card.style["transition"] = "opacity 0.5s";

        let bg_ui_blocker = generateElements('<div id="bguiblocker" style="position: fixed; top: 0; left: 0; width: 100%; height: 100%; background-color: #000000; opacity: 0; z-index: 9999;"></div>');
        document.querySelector('body').append(bg_ui_blocker);
        document.querySelector('#bguiblocker').addEventListener('click', ()=>{
            let card = document.querySelector('.card');
            card.style["opacity"] = "1";
            document.querySelector('#bguiblocker').remove();
        });
        
    });

    let play_bg_outer_div = generateElements('<div class="buttons" style="border-top:2px solid #333333;padding-top: 10px; margin-right: 20px;"></div>');
    play_bg_outer_div.append(play_bg_button);
    document.querySelector('#mainbg_pre').append(play_bg_outer_div);
    
})

document.querySelector('#mainbg_video_pre').addEventListener('click', ()=>{
    let card = document.querySelector('.card');
    card.style["opacity"] = "1";
});

let easter_egg = "filter"
let entered = ""

document.addEventListener('keydown', function(event) {
    entered += event.key

    if(easter_egg.includes(entered)){
        if(entered == easter_egg){
            $("#bgm_pre").append(
                $('<input class="slider is-fullwidth is-success is-circle" step="1" min="0" max="3000" value="300" type="range">')
                    .on('input',function(e){
                        biquadFilter.frequency.value = e.target.value;
                    })
            )
            // .append(
            //     $('<div class="select">').append()
                    
            // );
            entered = ""
        }
    }
})
