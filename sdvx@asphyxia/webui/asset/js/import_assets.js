let importing = false;

function arraybuffer_emit(event, data) {
    return axios.post(`/emit/${event}`, data ?? {},{responseType: 'arraybuffer', timeout: 3000000});
}
const {fetchFile} = FFmpegUtil;
const { FFmpeg } = FFmpegWASM;
let ffmpeg = null;
ffmpeg = new FFmpeg();
ffmpeg.on("log", ({message})=>{
    console.log(message)
});



const transcode = async (file, url) => {  

    console.log(file.filename)
    if ((await ffmpeg.listDir('/')).findIndex((i)=>i.name=="temp") == -1){
        console.log('creating temp directory')
        await ffmpeg.createDir('/temp');
    }

    if (!file.filename.includes(".wma")){
        if ((await ffmpeg.listDir('/temp')).findIndex((i)=>i.name==file.filename.split('/')[1]) == -1){
            console.log('found directory, creating')
            await ffmpeg.createDir('/'+file.filename);
            console.log("Created directory")
        }
        return
    }

    
    console.log('write file to wasm fs')
    
    console.log(url)
    await ffmpeg.writeFile('/'+file.filename, await fetchFile(url));
    await ffmpeg.exec(['-i', '/'+file.filename, `/${file.filename.substring(0, file.filename.length - 4)}.mp3`]);

    await ffmpeg.deleteFile('/'+file.filename);

    
};



document.querySelector('#import_assets').addEventListener('click', async function() {
    if (!importing) {
        importing = true;
        document.querySelector('#import_assets').disabled = true;
        document.querySelector('#import_assets').classList.add('is-loading');

        document.querySelector('.ui-import-blocker').style.display = 'block';

        try {
            const data = await arraybuffer_emit("import_assets", {
                "path": document.querySelector('#path').value,
            });
            if (!data || !data.data) {
                throw new Error("Invalid data received");
            }
            document.querySelector('#import_progress').value = 30;
            

            const blobWriter = new zip.BlobWriter();
            const writer = new zip.ZipWriter(blobWriter);


            const blob = new Blob([data.data], { type: 'application/zip' });

            const zipReader = new zip.ZipReader(new zip.BlobReader(blob));
            const entries = await zipReader.getEntries();
            console.log(entries);
            let blobArray = [];
            for (const entry of entries) {
                let fileData = new Blob([await entry.getData(new zip.Uint8ArrayWriter())], { type: 'application/octet-stream' });
                // create url for the file
                blobArray.push(fileData);
            }

            let t = 60 / entries.length;

            for (let i = 0; i < entries.length; i++) {
                const value = parseInt(entries[i].filename.split('/')[1].split('_')[1]);

                if (!entries[i].filename.includes(".wma") &&
                     entries[i].filename.split('/')[2] == '' &&
                     value % 20 == 0){
                    console.log('reloading ffmpeg')
                    await ffmpeg.terminate();
                    await ffmpeg.load({
                        coreURL: "../../../../core/package/dist/umd/ffmpeg-core.js",
                    })

                    await ffmpeg.createDir('/temp');
                    console.log(await ffmpeg.listDir('/temp'))
                    
                }



                const entry = entries[i];
                let fileData = blobArray[i];
                const url = URL.createObjectURL(fileData);
                await transcode(entry, url);
                if (entry.filename.includes(".wma")){
                    let transcodedData = await ffmpeg.readFile(`/${entry.filename.substring(0, entry.filename.length - 4)}.mp3`);
                    await writer.add(`${entry.filename.substring(0, entry.filename.length - 4)}.mp3`, new zip.BlobReader(new Blob([transcodedData], { type: 'audio/mpeg' })));
                }
                // close blob url
                URL.revokeObjectURL(url);
                await new Promise(resolve => setTimeout(resolve, 200));
                document.querySelector('#import_progress').value += t;
            }

            await writer.close();
            const zipBlob = await blobWriter.getData();
            const zipBlobUrl = URL.createObjectURL(zipBlob);
            // const link = document.createElement('a');
            // link.href = zipBlobUrl;
            // link.download = 'downloaded-file.zip';
            // link.click();

            document.querySelector('#import_progress').value = 100;
            document.querySelector('#import_assets').disabled = false;
            document.querySelector('#import_assets').classList.remove('is-loading');


            document.querySelector('.ui-import-blocker>.ui-import-blocker-content>p').childNodes[2].textContent='Complete!'

            // delay for 2 second
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.querySelector('.ui-import-blocker').style.display = 'none';
            importing = false;
        } catch (err) {
            console.error("Error processing import:", err);
            alert("Import failed!");
            importing = false;
        }
    } else {
        alert("Already importing!");
    }
});


document.querySelector('#update_nemsys').addEventListener('click', function() {
    if (!importing) {
        importing = true;
        if(document.querySelector('#nemsys').files.length == 0){
            alert("Please select a file!")
            importing = false;
            return;
        }

        // read file as buffer array
        let reader = new FileReader();
        reader.readAsText(document.querySelector('#nemsys').files[0]);
        reader.onload = function(event) {
            console.log(event.target.result)
            emit("update_webui_nemsys",{
                    "file": JSON.stringify(reader.result)
                }
            ).then(function(data) {
                if (data.data.status == "ok") {
                    alert("Updated successfully!")
                    importing = false;
                }
            }).catch(function(err) {
                console.log(err)
                alert("Import failed!")
                importing = false;
            });
        }

        
    }else{
        alert("Already importing!")
    }
});

document.querySelector('#update_chat_stamp').addEventListener('click', function() {
    if (!importing) {
        importing = true;
        if(document.querySelector('#chat_stamp').files.length == 0){
            alert("Please select a file!")
            importing = false;
            return;
        }

        // read file as buffer array
        let reader = new FileReader();
        reader.readAsText(document.querySelector('#chat_stamp').files[0], "shift-jis");
        reader.onload = function(event) {
            console.log(event.target.result)
            emit("update_webui_chat_stamp",{
                    "file": JSON.stringify(reader.result)
                }
            ).then(function(data) {
                if (data.data.status == "ok") {
                    alert("Updated successfully!")
                    importing = false;
                }
            }).catch(function(err) {
                console.log(err)
                alert("Import failed!")
                importing = false;
            });
        }

        
    }else{
        alert("Already importing!")
    }
});