import { pcdata, KDZ_pcdata, IIDX27_pcdata, IIDX28_pcdata, IIDX29_pcdata, IIDX30_pcdata, JDZ_pcdata, LDJ_pcdata, IIDX21_pcdata, IIDX22_pcdata, IIDX23_pcdata, IIDX24_pcdata, IIDX25_pcdata, IIDX26_pcdata, JDJ_pcdata, HDD_pcdata, I00_pcdata } from "../models/pcdata";
import { grade } from "../models/grade";
import { custom, default_custom } from "../models/custom";
import { IDtoCode, IDtoRef, Base64toBuffer, GetVersion, ReftoProfile, ReftoPcdata, ReftoQPRO, appendSettingConverter, NumArrayToString } from "../util";
import { eisei_grade, eisei_grade_data, lightning_musicmemo, lightning_musicmemo_new, lightning_playdata, lightning_settings, lm_playdata, lm_settings, lm_settings_new, musicmemo_data, musicmemo_data_new } from "../models/lightning";
import { profile, default_profile } from "../models/profile";
import { rival, rival_data } from "../models/rival";
import { world_tourism } from "../models/worldtourism";
import { shop_data } from "../models/shop";
import { tutorial } from "../models/tutorial";
import { expert } from "../models/ranking";

export const pccommon: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  let result: any = {
    "@attr": { expire: 300 },
    ir: K.ATTR({ beat: String(U.GetConfig("BeatPhase")) }),
    expert: K.ATTR({ phase: String(U.GetConfig("ExpertPhase")) }),
    expert_random_secret: K.ATTR({ phase: String(U.GetConfig("ExpertRandomPhase")) }),
  }

  // have no idea what some of attribute or value does //
  // exposing these to plugin setting or use static value //
  switch (version) {
    case 15:
    case 16:
      result = {
        ...result,
        cmd: K.ATTR({
          gmbl: String(Number(U.GetConfig("cmd_gmbl"))),
          gmbla: String(Number(U.GetConfig("cmd_gmbla"))),
          regl: String(Number(U.GetConfig("cmd_regl"))),
          rndp: String(Number(U.GetConfig("cmd_rndp"))),
          hrnd: String(Number(U.GetConfig("cmd_hrnd"))),
          alls: String(Number(U.GetConfig("cmd_alls"))),
        }),
      }
      break;
    case 17:
      result = {
        ...result,
        cmd: K.ATTR({
          gmbl: String(Number(U.GetConfig("cmd_gmbl"))),
          gmbla: String(Number(U.GetConfig("cmd_gmbla"))),
          regl: String(Number(U.GetConfig("cmd_regl"))),
          rndp: String(Number(U.GetConfig("cmd_rndp"))),
          hrnd: String(Number(U.GetConfig("cmd_hrnd"))),
          alls: String(Number(U.GetConfig("cmd_alls"))),
        }),
        lg: K.ATTR({ lea: String(U.GetConfig("sr_league")) }),
      }
    case 18:
      result = {
        ...result,
        cmd: K.ATTR({
          gmbl: String(Number(U.GetConfig("cmd_gmbl"))),
          gmbla: String(Number(U.GetConfig("cmd_gmbla"))),
          regl: String(Number(U.GetConfig("cmd_regl"))),
          rndp: String(Number(U.GetConfig("cmd_rndp"))),
          hrnd: String(Number(U.GetConfig("cmd_hrnd"))),
          alls: String(Number(U.GetConfig("cmd_alls"))),
        }),
        lg: K.ATTR({ lea: String(U.GetConfig("ra_league")) }),
        lf: K.ATTR({ life: String(U.GetConfig("ra_story")) }),
        ev: K.ATTR({ pha: String(U.GetConfig("ra_event")) }),
        lincle: K.ATTR({ phase: String(U.GetConfig("ra_lincle")) })
      }
      break;
    case 19:
      result = {
        ...result,
        lincle: K.ATTR({ phase: String(U.GetConfig("lc_lincle")) }),
        boss: K.ATTR({ phase: String(U.GetConfig("lc_boss")) }),
        mr_secret: K.ATTR({ flg: String(-1) }),
        travel: K.ATTR({ flg: String(-1) }),
      }
      break;
    case 20:
      result = {
        ...result,
        limit: K.ATTR({ phase: String(U.GetConfig("tr_limit")) }),
        boss: K.ATTR({ phase: String(U.GetConfig("tr_boss")) }),
        red: K.ATTR({ phase: String(U.GetConfig("tr_red")) }),
        yellow: K.ATTR({ phase: String(U.GetConfig("tr_yellow")) }),
        medal: K.ATTR({ phase: String(U.GetConfig("tr_medal")) }),
        cafe: K.ATTR({ open: String(Number(U.GetConfig("tr_cafe"))) }),
        tricolettepark: K.ATTR({ open: String(Number(U.GetConfig("tr_tripark"))) }),
      }
      break;
    case 21:
      result = {
        ...result,
        limit: K.ATTR({ phase: String(U.GetConfig("sp_limit")) }),
        boss: K.ATTR({ phase: String(U.GetConfig("sp_boss")) }),
        boss1: K.ATTR({ phase: String(U.GetConfig("sp_boss1")) }),
        medal: K.ATTR({ phase: String(1) }),
        vip_pass_black: {},
        cafe: K.ATTR({ open: String(Number(U.GetConfig("sp_cafe"))) }),
        tricolettepark: K.ATTR({ open: String(Number(U.GetConfig("sp_tripark"))) }),
        tricolettepark_skip: K.ATTR({ phase: String(U.GetConfig("sp_triparkskip")) }),
        deller_bonus: K.ATTR({ open: String(1) }),
        gumi_event: {},
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        superstar: K.ATTR({ phase: String(U.GetConfig("sp_superstar")) }),
      }
      break;
    case 22:
      result = {
        ...result,
        pre_play: K.ATTR({ phase: String(U.GetConfig("pd_preplay")) }),
        toho_remix: K.ATTR({ phase: String(U.GetConfig("pd_tohoremix")) }),
        limit: K.ATTR({ phase: String(U.GetConfig("pd_limit")) }),
        boss: K.ATTR({ phase: String(U.GetConfig("pd_boss")) }),
        chrono_diver: K.ATTR({ phase: String(U.GetConfig("pd_chronodiver")) }),
        qpronicle_chord: K.ATTR({ phase: String(U.GetConfig("pd_qproniclechord")) }),
        vip_pass_black: {},
        cc_collabo_event: K.ATTR({ phase: String(U.GetConfig("pd_cccollabo")) }),
        cc_collabo_license: {},
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        common_timeshift_phase: K.ATTR({ phase: String(U.GetConfig("pd_timephase")) }),
        expert_secret_full_open: {},
        eappli_expert: {},
        eaorder: {},
      }
      break;
    case 23:
      result = {
        ...result,
        boss: K.ATTR({ phase: String(U.GetConfig("cp_boss")) }),
        event1_phase: K.ATTR({ phase: String(U.GetConfig("cp_event1")) }),
        event2_phase: K.ATTR({ phase: String(U.GetConfig("cp_event2")) }),
        extra_boss_event: K.ATTR({ phase: String(30) }), // TODO:: verify //
        vip_pass_black: {},
        event1_ranbow_ticket: {},
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        expert_secret_full_open: {},
        remocon_collabo: {},
        ravemania_collabo: {},
        djlevel_result: {},
        virtual_coin: K.ATTR({ phase: String(1) }),
        reflec_volzza_collabo: {},
        bemani_summer2016: K.ATTR({ phase: String(U.GetConfig("cp_bemanisummer")) }),
      }
      break;
    case 24: // asphyxia_route_public //
    case 25:
    case 26:
      result = {
        ...result,
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        expert_secret_full_open: {},
        system_voice_phase: K.ATTR({ phase: String(_.random(0, 8)) }),
      }
      break;
    case 27:
      result = {
        ...result,
        boss: K.ATTR({ phase: String(U.GetConfig("hv_boss")) }),
        vip_pass_black: {},
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        expert_secret_full_open: {},
        system_voice_phase: K.ATTR({ phase: String(_.random(0, 8)) }),
        extra_boss_event: K.ATTR({ phase: String(U.GetConfig("hv_extraboss")) }),
        event1_phase: K.ATTR({ phase: String(U.GetConfig("hv_event")) }),
        premium_area_news: K.ATTR({ open: String(1) }),
        premium_area_qpro: K.ATTR({ open: String(1) }),
        play_video: {},
        display_asio_logo: {},
      }
      break;
    case 28:
      result = {
        ...result,
        movie_agreement: K.ATTR({ version: String(1) }),
        movie_upload: K.ATTR({ url: String(U.GetConfig("MovieUpload")) }),
        boss: K.ATTR({ phase: String(U.GetConfig("bo_boss")) }),
        vip_pass_black: {},
        eisei: K.ATTR({ open: String(Number(U.GetConfig("Eisei"))) }),
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        expert_secret_full_open: {},
        system_voice_phase: K.ATTR({ phase: String(_.random(0, 8)) }),
        extra_boss_event: K.ATTR({ phase: String(U.GetConfig("bo_extraboss")) }),
        event1_phase: K.ATTR({ phase: String(U.GetConfig("bo_event")) }),
        premium_area_news: K.ATTR({ open: String(1) }),
        premium_area_qpro: K.ATTR({ open: String(1) }),
        play_video: {},
        world_tourism: K.ATTR({ open_list: String(-1) }),
        bpl_battle: K.ATTR({ phase: String(1) }),
        display_asio_logo: {},
      }
      break;
    case 29:
      result = {
        ...result,
        movie_agreement: K.ATTR({ version: String(1) }),
        movie_upload: K.ATTR({ url: String(U.GetConfig("MovieUpload")) }),
        boss: K.ATTR({ phase: String(1) }), // TODO:: verify //
        vip_pass_black: {},
        eisei: K.ATTR({ open: String(Number(U.GetConfig("Eisei"))) }), // TODO:: verify //
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }), // TODO:: verify //
        expert_secret_full_open: {},
        system_voice_phase: K.ATTR({ phase: String(_.random(0, 8)) }),
        extra_boss_event: K.ATTR({ phase: String(1) }), // TODO:: verify //
        event1_phase: K.ATTR({ phase: String(4) }), // TODO:: verify //
        premium_area_news: K.ATTR({ open: String(1) }),
        premium_area_qpro: K.ATTR({ open: String(1) }),
        play_video: {},
        world_tourism: K.ATTR({ open_list: String(-1) }),
        bpl_battle: K.ATTR({ phase: String(1) }),
        display_asio_logo: {},
        lane_gacha: {},
      }
      break;
    case 30:
      result = {
        ...result,
        movie_agreement: K.ATTR({ version: String(1) }),
        movie_upload: K.ATTR({ url: String(U.GetConfig("MovieUpload")) }),
        vip_pass_black: {},
        deller_bonus: K.ATTR({ open: String(1) }),
        newsong_another: K.ATTR({ open: String(Number(U.GetConfig("NewSongAnother12"))) }),
        system_voice_phase: K.ATTR({ phase: String(_.random(0, 8)) }),
        premium_area_news: K.ATTR({ open: String(1) }),
        premium_area_qpro: K.ATTR({ open: String(1) }),
        play_video: {},
        display_asio_logo: {},
        lane_gacha: {},
        tourism_booster: {},
        ameto_event: {},
      }
      break;

    default:
      return send.deny();
  }

  return send.object(result);
};

export const pcreg: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const id = _.random(10000000, 99999999);
  const idstr = IDtoCode(id);
  const refid = $(data).attr().rid;

  let pcdata: object;
  let lightning_settings: object;
  let lightning_playdata: object;
  switch (version) {
    case 15:
      pcdata = HDD_pcdata;
      break;
    case 16:
      pcdata = I00_pcdata;
      break;
    case 17:
      pcdata = JDJ_pcdata;
      break;
    case 18:
      pcdata = JDZ_pcdata;
      break;
    case 19:
      pcdata = KDZ_pcdata;
      break;
    case 20:
      pcdata = LDJ_pcdata;
      break;
    case 21:
      pcdata = IIDX21_pcdata;
      break;
    case 22:
      pcdata = IIDX22_pcdata;
      break;
    case 23:
      pcdata = IIDX23_pcdata;
      break;
    case 24:
      pcdata = IIDX24_pcdata;
      break;
    case 25:
      pcdata = IIDX25_pcdata;
      break;
    case 26:
      pcdata = IIDX26_pcdata;
      break;
    case 27:
      pcdata = IIDX27_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings;
      break;
    case 28:
      pcdata = IIDX28_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings;
      break;
    case 29:
      pcdata = IIDX29_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings_new;
      break;
    case 30:
      pcdata = IIDX30_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings_new;
      break;

    default:
      return send.deny();
  }

  await DB.Upsert<profile>(
    refid,
    {
      collection: "profile",
    },
    {
      $set: {
        name: $(data).attr().name,
        pid: parseInt($(data).attr().pid),
        id,
        idstr,
        ...default_profile,
      }
    }
  );

  await DB.Upsert<pcdata>(
    refid,
    {
      collection: "pcdata",
      version: version,
    },
    {
      $set: pcdata,
    }
  );

  await DB.Upsert<custom>(
    refid,
    {
      collection: "custom",
      version: version,
    },
    {
      $set: default_custom,
    }
  );

  if (version >= 27) {
    await DB.Upsert<lightning_settings>(
      refid,
      {
        collection: "lightning_settings",
        version: version,
      },
      {
        $set: lightning_settings,
      }
    );

    await DB.Upsert<lightning_playdata>(
      refid,
      {
        collection: "lightning_playdata",
        version: version,
      },
      {
        $set: lightning_playdata,
      }
    );
  }

  return send.object(
    K.ATTR({
      id: String(id),
      id_str: idstr,
    })
  );
};

export const pcget: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = $(data).attr().rid;
  
  const profile = await DB.FindOne<profile>(refid, { collection: "profile" });
  const pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata", version: version });
  const custom = await DB.FindOne<custom>(refid, { collection: "custom", version: version });
  const grade = await DB.Find<grade>(refid, { collection: "grade", version: version });
  const rivals = await DB.Find<rival>(refid, { collection: "rival" });
  const world_tourism = await DB.Find<world_tourism>(refid, { collection: "world_tourism", version: version });
  const lm_settings = await DB.FindOne<lightning_settings>(refid, { collection: "lightning_settings", version: version });
  const lm_playdata = await DB.FindOne<lightning_playdata>(refid, { collection: "lightning_playdata", version: version });
  const lm_eisei_grade = await DB.Find<eisei_grade>(refid, { collection: "eisei_grade", version: version });
  const lm_music_memo = await DB.Find<lightning_musicmemo>(refid, { collection: "lightning_musicmemo", version: version });
  const lm_music_memo_new = await DB.Find<lightning_musicmemo_new>(refid, { collection: "lightning_musicmemo_new", version: version });
  const shop_data = await DB.FindOne<shop_data>({ collection: "shop_data" });
  const expert = await DB.Find<expert>(refid, { collection: "expert", version: version });

  if (_.isNil(pcdata)) return send.deny();

  const appendsettings = appendSettingConverter(
    custom.rank_folder,
    custom.clear_folder,
    custom.diff_folder,
    custom.alpha_folder,
    custom.rival_folder,
    custom.rival_battle_folder,
    custom.rival_info,
    custom.hide_playcount,
    custom.disable_graph_cutin,
    custom.classic_hispeed,
    custom.rival_played_folder,
    custom.hide_iidxid,
  );
  let dArray = [], eArray = [], rArray = [], mArray = [], bArray = [];

  grade.forEach((res: grade) => {
    dArray.push([res.style, res.gradeId, res.maxStage, res.archive]);
  });
  dArray.sort((a: grade, b: grade) => a.style - b.style || a.gradeId - b.gradeId);

  lm_eisei_grade.forEach((res) => {
    eArray.push({
      grade_type: res.grade_type,
      grade_id: res.grade_id,
      stage_num: res.stage_num,
      clear_type: res.clear_type,
      option: res.option,

      past: res.past_achievement,
      selected_course: res.past_selected_course,
      max_past: res.max_past_achievement,
      max_selected_course: res.max_past_selected_course,
    });
  });
  eArray.sort((a: eisei_grade_data, b: eisei_grade_data): number => a.grade_type - b.grade_type || a.grade_id - b.grade_id);

  if (rivals.length > 0) {
    for (let a = 0; a < rivals.length; a++) {
      let profile = await ReftoProfile(rivals[a].rival_refid);
      let pcdata = await ReftoPcdata(rivals[a].rival_refid, version);
      let qprodata = await ReftoQPRO(rivals[a].rival_refid, version);

      let rival_data: rival_data = {
        play_style: rivals[a].play_style,
        index: rivals[a].index,

        profile: profile,
        pcdata: pcdata,
        qprodata: qprodata,
      }

      rArray.push(rival_data);
    }
    rArray.sort((a: rival_data, b: rival_data): number => a.play_style - b.play_style || a.index - b.index);
  }

  let wArray = [];
  if (world_tourism.length > 0) {
    for (let wt of world_tourism) {
      let world_tourism_data = {
        tour_id: wt.tour_id,
        progress: wt.progress,
      }

      wArray.push(world_tourism_data);
    }
    wArray.sort((a, b) => a.tour_id - b.tour_id);
  }

  let event, gradeStr = "", exStr = "", skinStr = "";
  if (version == 15) {
    dArray.forEach((res) => {
      gradeStr += NumArrayToString([6, 3, 2, 7], [res[1], res[2], res[0], res[3]]);
    });

    expert.sort((a: expert, b: expert) => a.coid - b.coid);
    expert.forEach((res) => {
      for (let a = 0; a < 6; a++) {
        exStr += NumArrayToString([6, 3, 3], [res.coid, a, res.cArray[a]]);
        exStr += NumArrayToString([18], [res.pgArray[a]]);
        exStr += NumArrayToString([18], [res.gArray[a]]);
      }
    });

    skinStr += NumArrayToString([12], [custom.frame, custom.turntable, custom.note_burst, custom.menu_music, appendsettings, custom.lane_cover, 0, custom.category_vox]);

    return send.pugFile("pug/HDD/pcget.pug", {
      profile,
      pcdata,
      gradeStr,
      exStr,
      skinStr,
      rArray,
    });
  }
  else if (version == 16) {
    expert.sort((a: expert, b: expert) => a.coid - b.coid);
    expert.forEach((res) => {
      for (let a = 0; a < 6; a++) {
        eArray.push([res.coid, a, res.cArray[a], res.pgArray[a], res.gArray[a]]);
      }
    });

    return send.pugFile("pug/I00/pcget.pug", {
      profile,
      pcdata,
      dArray,
      eArray,
      appendsettings,
      custom,
      rArray,
    });
  }
  else if (version == 17) {
    expert.sort((a: expert, b: expert) => a.coid - b.coid);
    expert.forEach((res) => {
      for (let a = 0; a < 6; a++) {
        eArray.push([res.coid, a, res.cArray[a], res.pgArray[a], res.gArray[a]]);
      }
    });

    return send.pugFile("pug/JDJ/pcget.pug", {
      profile,
      pcdata,
      dArray,
      eArray,
      appendsettings,
      custom,
      rArray,
    });
  }
  else if (version == 18) {
    if (_.isNil(pcdata.fcombo)) { // temp //
      pcdata.fcombo = Array<number>(2).fill(0);

      await DB.Upsert<pcdata>(
        refid,
        {
          collection: "pcdata",
          version: version,
        },
        {
          $set: {
            fcombo: Array<number>(2).fill(0),
          }
        }
      );
    }

    event = await DB.FindOne(refid, { collection: "event_1", version: version });
    if (!_.isNil(event)) {
      event.cf = Base64toBuffer(event.cf).toString("hex");
      event.pf = Base64toBuffer(event.pf).toString("hex");
      event.mf = Base64toBuffer(event.mf).toString("hex");
    }

    return send.pugFile("pug/JDZ/pcget.pug", {
      profile,
      pcdata,
      dArray,
      appendsettings,
      custom,
      rArray,
      event,
    });
  }
  else if (version == 19) {
    event = await DB.FindOne(refid, { collection: "event_1", version: version });

    if (!_.isNil(event)) {
      event.cf = Base64toBuffer(event.cf).toString("hex");
      event.qcf = Base64toBuffer(event.qcf).toString("hex");
      event.piece = Base64toBuffer(event.piece).toString("hex");
    }

    return send.pugFile("pug/KDZ/pcget.pug", {
      profile,
      pcdata,
      dArray,
      appendsettings,
      custom,
      rArray,
      event,
    });
  }
  else if (version == 20) {
    if (!_.isNil(pcdata.st_stamp)) pcdata.st_stamp = Base64toBuffer(pcdata.st_stamp).toString("hex");
    if (!_.isNil(pcdata.st_help)) pcdata.st_help = Base64toBuffer(pcdata.st_help).toString("hex");

    if (_.isNil(pcdata.st_stamp)) pcdata.st_stamp = ""; // temp //

    let link5 = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "link5" });
    let tricolettepark = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "tricolettepark" });
    let redboss = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "redboss" });
    let yellowboss = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "yellowboss" });

    return send.pugFile("pug/LDJ/pcget.pug", {
      profile,
      pcdata,
      dArray,
      appendsettings,
      custom,
      rArray,
      link5,
      tricolettepark,
      redboss,
      yellowboss,
      shop_data,
    });
  }
  else if (version >= 21) {
    let link5 = null,
      tricolettepark = null,
      boss1 = null,
      chrono_diver = null,
      qpronicle_chord = null,
      qpronicle_phase3 = null,
      pendual_talis = null,
      open_tokotoko = null,
      mystery_line = null,
      event_1 = null,
      event_1s = null,
      evtArray = [], evtArray2 = [];

    if (version == 23) {
      if (!_.isNil(pcdata.st_tokimeki)) pcdata.st_tokimeki = Base64toBuffer(pcdata.st_tokimeki).toString("hex");

      open_tokotoko = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "event1_data" });
      mystery_line = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "event2_data" });
    }
    else if (version == 22) {
      if (!_.isNil(pcdata.st_album)) pcdata.st_album = Base64toBuffer(pcdata.st_album).toString("hex");

      chrono_diver = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "chrono_diver" });
      pendual_talis = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "boss_event_3" });
      if (_.isNil(pendual_talis)) pendual_talis = { point: 0 };

      qpronicle_chord = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "qpronicle_chord" });
      qpronicle_phase3 = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "qpronicle_phase3" });
    }
    else if (version == 21) {
      if (!_.isNil(pcdata.st_album)) pcdata.st_album = Base64toBuffer(pcdata.st_album).toString("hex");

      link5 = await DB.FindOne(refid, { collection: "event_1", version: 20, event_name: "link5" });
      tricolettepark = await DB.FindOne(refid, { collection: "event_1", version: 20, event_name: "tricolettepark" });

      boss1 = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "boss1" });
      if (!_.isNil(boss1.durability)) boss1.durability = Base64toBuffer(boss1.durability).toString("hex");
    }
    else {
      event_1 = await DB.Find(refid, { collection: "event_1", version: version });
      event_1s = await DB.Find(refid, { collection: "event_1_sub", version: version });

      if (event_1.length > 0) {
        for (let evt of event_1) {
          evtArray.push(evt);
        }
      }

      if (event_1s.length > 0) {
        for (let evt of event_1s) {
          evtArray2.push(evt);
        }
      }
    }

    if (version == 21 || version == 22 || version == 23) {
      if (!_.isNil(pcdata.sp_mlist)) {
        pcdata.sp_mlist = Base64toBuffer(pcdata.sp_mlist).toString("hex");
        pcdata.sp_clist = Base64toBuffer(pcdata.sp_clist).toString("hex");
        pcdata.dp_mlist = Base64toBuffer(pcdata.dp_mlist).toString("hex");
        pcdata.dp_clist = Base64toBuffer(pcdata.dp_clist).toString("hex");
      }
    }

    if (version >= 30 && lm_music_memo_new.length > 0) {
      lm_music_memo_new.forEach((res) => {
        let musicmemo_data: musicmemo_data_new = {
          folder_idx: res.folder_idx,
          folder_name: res.folder_name,
          play_style: res.play_style,

          music_ids: res.music_ids,
        }

        mArray.push(musicmemo_data);
      });
      mArray.sort((a: musicmemo_data_new, b: musicmemo_data_new): number => a.play_style - b.play_style || a.folder_idx - b.folder_idx);
    }
    else if (version >= 27 && lm_music_memo.length > 0) {
      lm_music_memo.forEach((res) => {
        let musicmemo_data: musicmemo_data = {
          music_idx: res.music_idx,
          play_style: res.play_style,

          music_id: res.music_id,
        }

        mArray.push(musicmemo_data);
      });
      mArray.sort((a: musicmemo_data, b: musicmemo_data): number => a.play_style - b.play_style || a.music_idx - b.music_idx);
    }

    /*** TODO:: figure out how badges works
       [save] - elements are below but get checks for id 0~12
       today_recommend (flg)
       weekly_ranking (flg)
       visitor (flg_id, flg)
       notes_radar (flg_id, flg) [2]
       world_tourism (flg)
       event1 (flg_id, flg) [10]
       arena (flg_id, flg) [2]
       iidx_exam (flg)

       [get]
       category_id - up to 12
       badge_flg_id
        - This can be up to 23
          - category_id: 0, 1 -> 23
          - category_id: 9 -> 9
          - category_id: 7, 10 -> 2
       badge_flg
    ***/

    if (version >= 30) {
      for (let a = 0; a < 13; a++) {
        if (a == 0 || a == 1) {
          for (let b = 0; b < 24; b++) {
            bArray.push({
              id: a,
              flg_id: b,
              flg: -1,
            });
          }
          continue;
        } else if (a == 9) {
          for (let b = 0; b < 10; b++) {
            bArray.push({
              id: a,
              flg_id: b,
              flg: -1,
            });
          }
          continue;
        } else if (a == 7 || a == 10) {
          for (let b = 0; b < 2; b++) {
            bArray.push({
              id: a,
              flg_id: b,
              flg: -1,
            });
          }
          continue;
        }

        bArray.push({
          id: a,
          flg_id: 0,
          flg: -1,
        });
      }
    }

    return send.pugFile(`pug/LDJ/${version}pcget.pug`, {
      profile,
      pcdata,
      lm_playdata,
      lm_settings,
      mArray,
      dArray,
      eArray,
      appendsettings,
      custom,
      rArray,
      evtArray,
      evtArray2,
      boss1,
      link5,
      tricolettepark,
      chrono_diver,
      qpronicle_chord,
      qpronicle_phase3,
      pendual_talis,
      open_tokotoko,
      mystery_line,
      wArray,
      bArray,
      shop_data,
    });
  }

  return send.deny();
};

export const pcoldget: EPR = async (info, data, send) => {
  const refid = $(data).attr().rid;
  const pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata" }); // version check removed //

  if (_.isNil(pcdata)) return send.deny();

  return send.success();
};

export const pcgetname: EPR = async (info, data, send) => {
  const refid = $(data).attr().rid;
  const profile = await DB.FindOne<profile>(refid, { collection: "profile" });

  if (_.isNil(profile)) return send.deny();

  return send.object(
    K.ATTR({
      name: profile.name,
      idstr: profile.idstr,
      pid: String(profile.pid),
    })
  );
};

export const pctakeover: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = $(data).attr().rid;
  const profile = await DB.FindOne<profile>(refid, { collection: "profile" });

  // do samething as pcreg //
  let pcdata: object;
  let lightning_settings: object;
  let lightning_playdata: object;
  switch (version) {
    case 15:
      pcdata = HDD_pcdata;
      break;
    case 16:
      pcdata = I00_pcdata;
      break;
    case 17:
      pcdata = JDJ_pcdata;
      break;
    case 18:
      pcdata = JDZ_pcdata;
      break;
    case 19:
      pcdata = KDZ_pcdata;
      break;
    case 20:
      pcdata = LDJ_pcdata;
      break;
    case 21:
      pcdata = IIDX21_pcdata;
      break;
    case 22:
      pcdata = IIDX22_pcdata;
      break;
    case 23:
      pcdata = IIDX23_pcdata;
      break;
    case 24:
      pcdata = IIDX24_pcdata;
      break;
    case 25:
      pcdata = IIDX25_pcdata;
      break;
    case 26:
      pcdata = IIDX26_pcdata;
      break;
    case 27:
      pcdata = IIDX27_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings;
      break;
    case 28:
      pcdata = IIDX28_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings;
      break;
    case 29:
      pcdata = IIDX29_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings_new;
      break;
    case 30:
      pcdata = IIDX30_pcdata;
      lightning_playdata = lm_playdata;
      lightning_settings = lm_settings_new;
      break;

    default:
      return send.deny();
  }

  await DB.Upsert<pcdata>(
    refid,
    {
      collection: "pcdata",
      version: version,
    },
    {
      $set: pcdata,
    }
  );

  await DB.Upsert<custom>(
    refid,
    {
      collection: "custom",
      version: version,
    },
    {
      $set: default_custom,
    }
  );

  if (version >= 27) {
    await DB.Upsert<lightning_settings>(
      refid,
      {
        collection: "lightning_settings",
        version: version,
      },
      {
        $set: lightning_settings,
      }
    );

    await DB.Upsert<lightning_playdata>(
      refid,
      {
        collection: "lightning_playdata",
        version: version,
      },
      {
        $set: lightning_playdata,
      }
    );
  }

  return send.object(
    K.ATTR({
      id: String(profile.id),
    })
  );
};

export const pcvisit: EPR = async (info, data, send) => {
  return send.object(
    K.ATTR({
      anum: "10",
      snum: "10",
      pnum: "10",
      aflg: "0",
      sflg: "0",
      pflg: "0",
    })
  );
};

export const pcsave: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));
  const cltype = parseInt($(data).attr().cltype); // 0 -> SP, 1 -> DP //

  if (version == -1) return send.deny();

  let profile = await DB.FindOne<profile>(refid, { collection: "profile" });
  let pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata", version: version });
  let custom = await DB.FindOne<custom>(refid, { collection: "custom", version: version });
  let lm_settings = await DB.FindOne<lightning_settings>(refid, { collection: "lightning_settings", version: version });
  let lm_playdata = await DB.FindOne<lightning_playdata>(refid, { collection: "lightning_playdata", version: version });

  if (_.isNil(pcdata)) return send.deny();

  const isTDJ = !(_.isNil($(data).element("lightning_play_data")));
  const hasStepUpData = !(_.isNil($(data).element("step")));
  const hasEventData = !(_.isNil($(data).element("event1"))) || !(_.isNil($(data).element("event_1")));
  const hasLanguageData = !(_.isNil($(data).element("language_setting")));
  const hasWorldTourism = !(_.isNil($(data).element("world_tourism_data")));
  const hasMusicMemo = !(_.isNil($(data).element("music_memo")));
  const hasTowerData = !(_.isNil($(data).element("tower_data")));

  if (cltype == 0) pcdata.spnum += 1;
  else pcdata.dpnum += 1;

  if (isTDJ) {
    if (cltype == 0) lm_playdata.sp_num += 1;
    else lm_playdata.dp_num += 1;

    lm_settings.headphone_vol = parseInt($(data).attr("lightning_setting").headphone_vol);
    lm_settings.slider = $(data).element("lightning_setting").numbers("slider");
    lm_settings.resistance_sp_left = parseInt($(data).attr("lightning_setting").resistance_sp_left);
    lm_settings.resistance_sp_right = parseInt($(data).attr("lightning_setting").resistance_sp_right);
    lm_settings.resistance_dp_left = parseInt($(data).attr("lightning_setting").resistance_dp_left);
    lm_settings.resistance_dp_right = parseInt($(data).attr("lightning_setting").resistance_dp_right);
    lm_settings.light = $(data).element("lightning_setting").numbers("light");
    lm_settings.concentration = $(data).element("lightning_setting").number("concentration");
  }

  profile.total_pc += 1;

  pcdata.mode = parseInt($(data).attr().mode);
  pcdata.pmode = parseInt($(data).attr().pmode);

  if (version == 15) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.sflg0 = parseInt($(data).attr().sflg0);
    pcdata.sflg1 = parseInt($(data).attr().sflg1);
    pcdata.sflg2 = parseInt($(data).attr().sflg2);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.ncomb = parseInt($(data).attr().ncomb);
    pcdata.mcomb = parseInt($(data).attr().mcomb);

    if (!_.isNil($(data).element("tutorial"))) {
      let clr = parseInt($(data).attr("tutorial").clr);
      await DB.Upsert<tutorial>(refid,
        {
          collection: "tutorial",
          version: version,
          tid: parseInt($(data).attr("tutorial").tid),
        },
        {
          $set: {
            clr
          }
        }
      );
    }
  }
  else if (version == 16) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.sflg0 = parseInt($(data).attr().sflg0);
    pcdata.sflg1 = parseInt($(data).attr().sflg1);
    pcdata.sflg2 = parseInt($(data).attr().sflg2);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.ncomb = parseInt($(data).attr().ncomb);
    pcdata.mcomb = parseInt($(data).attr().mcomb);
    pcdata.liflen = parseInt($(data).attr().lift);
    pcdata.fcombo[cltype] = parseInt($(data).attr().fcombo);

    if (!_.isNil($(data).element("tutorial"))) {
      let clr = parseInt($(data).attr("tutorial").clr);
      await DB.Upsert<tutorial>(refid,
        {
          collection: "tutorial",
          version: version,
          tid: parseInt($(data).attr("tutorial").tid),
        },
        {
          $set: {
            clr
          }
        }
      );
    }

    // bigint is returning convert error on sendPug so save as string //
    if (!_.isNil($(data).element("jewel"))) {
      pcdata.jewel_num = String($(data).element("jewel").bigint("jnum"));
      pcdata.jewel_bnum = $(data).element("jewel").numbers("bjnum");
    }
  }
  else if (version == 17) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.timing = parseInt($(data).attr().timing);
    pcdata.sflg0 = parseInt($(data).attr().sflg0);
    pcdata.sflg1 = parseInt($(data).attr().sflg1);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.ncomb = parseInt($(data).attr().ncomb);
    pcdata.mcomb = parseInt($(data).attr().mcomb);
    pcdata.liflen = parseInt($(data).attr().lift);
    pcdata.fcombo[cltype] = parseInt($(data).attr().fcombo);

    if (!_.isNil($(data).element("tutorial"))) {
      let clr = parseInt($(data).attr("tutorial").clr);
      await DB.Upsert<tutorial>(refid,
        {
          collection: "tutorial",
          version: version,
          tid: parseInt($(data).attr("tutorial").tid),
        },
        {
          $set: {
            clr
          }
        }
      );
    }
    if (!_.isNil($(data).element("party"))) pcdata.party = $(data).element("party").numbers("fnum");
  }
  else if (version == 18) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.timing = parseInt($(data).attr().timing);
    pcdata.sflg0 = parseInt($(data).attr().sflg0);
    pcdata.sflg1 = parseInt($(data).attr().sflg1);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.ncomb = parseInt($(data).attr().ncomb);
    pcdata.mcomb = parseInt($(data).attr().mcomb);
    pcdata.liflen = parseInt($(data).attr().lift);
    pcdata.fcombo[cltype] = parseInt($(data).attr().fcombo);

    // TODO:: STORY/LEAGUE //

    if (!_.isNil($(data).element("tour"))) {
      let event_data = {
        cf: $(data).element("tour").buffer("cf").toString("base64"),
        pf: $(data).element("tour").buffer("pf").toString("base64"),
        mf: $(data).element("tour").buffer("mf").toString("base64"),
        pt: parseInt($(data).attr("tour").pt),
        rsv: parseInt($(data).attr("tour").rsv),
        r0: parseInt($(data).attr("tour").r0),
        r1: parseInt($(data).attr("tour").r1),
        r2: parseInt($(data).attr("tour").r2),
        r3: parseInt($(data).attr("tour").r3),
        r4: parseInt($(data).attr("tour").r4),
        r5: parseInt($(data).attr("tour").r5),
        r6: parseInt($(data).attr("tour").r6),
        r7: parseInt($(data).attr("tour").r7),
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
        },
        {
          $set: event_data,
        }
      );
    }
  }
  else if (version == 19) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.notes = parseFloat($(data).attr().notes);
    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.help = parseInt($(data).attr().help);
    pcdata.liflen = parseInt($(data).attr().lift);
    pcdata.fcombo[cltype] = parseInt($(data).attr().fcombo);
    pcdata.pase = parseInt($(data).attr().pase);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.sdtype = parseInt($(data).attr().sdtype);
    pcdata.sflg0 = parseInt($(data).attr().sflg0);
    pcdata.sflg1 = parseInt($(data).attr().sflg1);
    pcdata.timing = parseInt($(data).attr().timing);

    if (!_.isNil($(data).element("jpoint"))) {
      pcdata.jpoint += parseInt($(data).attr("jpoint").point);
    }

    // TODO:: parsing (element type is binary) //
    if (hasStepUpData) {
      // hand0, hand1, hand2, hand3, hand4 (attr) //
      // binary (content) //
      if (cltype == 0) {
        pcdata.st_sp_ach = parseInt($(data).attr("step").sp_ach);
        pcdata.st_sp_dif = parseInt($(data).attr("step").sp_dif);
      } else {
        pcdata.st_dp_ach = parseInt($(data).attr("step").dp_ach);
        pcdata.st_dp_dif = parseInt($(data).attr("step").dp_dif);
      }
    }

    if (!_.isNil($(data).element("kingdom"))) {
      let event_data = {
        level: parseInt($(data).attr("kingdom").level),
        exp: parseInt($(data).attr("kingdom").exp),
        deller: parseInt($(data).attr("kingdom").deller),
        place: parseInt($(data).attr("kingdom").place),
        tower: parseInt($(data).attr("kingdom").tower),
        boss: parseInt($(data).attr("kingdom").boss),
        combo: parseInt($(data).attr("kingdom").combo),
        jewel: parseInt($(data).attr("kingdom").jewel),
        generic: parseInt($(data).attr("kingdom").generic),
        cf: $(data).element("kingdom").buffer("cf").toString("base64"),
        qcf: $(data).element("kingdom").buffer("qcf").toString("base64"),
        piece: $(data).element("kingdom").buffer("piece").toString("base64"),
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("history"))) {
      pcdata.type = $(data).element("history").numbers("type");
      pcdata.time = $(data).element("history").numbers("time");
      pcdata.p0 = $(data).element("history").numbers("p0");
      pcdata.p1 = $(data).element("history").numbers("p1");
      pcdata.p2 = $(data).element("history").numbers("p2");
      pcdata.p3 = $(data).element("history").numbers("p3");
      pcdata.p4 = $(data).element("history").numbers("p4");
    }
  }
  else if (version == 20) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    }
    else {
      pcdata.dach = parseInt($(data).attr().achi);
      pcdata.dp_opt = parseInt($(data).attr().opt);
      pcdata.dp_opt2 = parseInt($(data).attr().opt2);
    }

    pcdata.gno = parseInt($(data).attr().gno);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.timing = parseInt($(data).attr().timing);
    pcdata.help = parseInt($(data).attr().help);
    pcdata.sdhd = parseInt($(data).attr().sdhd);
    pcdata.sdtype = parseInt($(data).attr().sdtype);
    pcdata.notes = parseFloat($(data).attr().notes);
    pcdata.pase = parseInt($(data).attr().pase);
    pcdata.judge = parseInt($(data).attr().judge);
    pcdata.opstyle = parseInt($(data).attr().opstyle);
    pcdata.hispeed = parseFloat($(data).attr().hispeed);
    pcdata.judgeAdj = parseInt($(data).attr().judgeAdj);
    pcdata.liflen = parseInt($(data).attr().lift);
    pcdata.fcombo[cltype] = parseInt($(data).attr().fcombo);

    if (!_.isNil($(data).element("secret"))) {
      pcdata.secret_flg1 = $(data).element("secret").bigints("flg1").map(String);
      pcdata.secret_flg2 = $(data).element("secret").bigints("flg2").map(String);
      pcdata.secret_flg3 = $(data).element("secret").bigints("flg3").map(String);
    }

    if (!_.isNil($(data).element("qpro_secret"))) {
      custom.qpro_secret_head = $(data).element("qpro_secret").bigints("head").map(String);
      custom.qpro_secret_hair = $(data).element("qpro_secret").bigints("hair").map(String);
      custom.qpro_secret_face = $(data).element("qpro_secret").bigints("face").map(String);
      custom.qpro_secret_body = $(data).element("qpro_secret").bigints("body").map(String);
      custom.qpro_secret_hand = $(data).element("qpro_secret").bigints("hand").map(String);
    }

    if (hasStepUpData) {
      if (cltype == 0) {
        pcdata.st_sp_ach = parseInt($(data).attr("step").sp_ach);
        pcdata.st_sp_hdpt = parseInt($(data).attr("step").sp_hdpt);
        pcdata.st_sp_level = parseInt($(data).attr("step").sp_level);
        pcdata.st_sp_round = parseInt($(data).attr("step").sp_round);
        pcdata.st_sp_mplay = parseInt($(data).attr("step").sp_mplay);
        
      } else {
        pcdata.st_dp_ach = parseInt($(data).attr("step").dp_ach);
        pcdata.st_dp_hdpt = parseInt($(data).attr("step").dp_hdpt);
        pcdata.st_dp_level = parseInt($(data).attr("step").dp_level);
        pcdata.st_dp_round = parseInt($(data).attr("step").dp_round);
        pcdata.st_dp_mplay = parseInt($(data).attr("step").dp_mplay);
      }
      pcdata.st_review = parseInt($(data).attr("step").review);
      pcdata.st_stamp = $(data).buffer("step").toString("base64"); // TODO:: verify //
      pcdata.st_help = $(data).element("step").buffer("help").toString("base64");
    }
    
    if (!_.isNil($(data).element("achievements"))) {
      // TODO:: achi_packflg, achi_packid, achi_playpack //
      pcdata.achi_lastweekly = parseInt($(data).attr("achievements").last_weekly);
      pcdata.achi_packcomp = parseInt($(data).attr("achievements").pack_comp);
      pcdata.achi_visitflg = parseInt($(data).attr("achievements").visit_flg);
      pcdata.achi_weeklynum = parseInt($(data).attr("achievements").weekly_num);
      pcdata.achi_trophy = $(data).element("achievements").bigints("trophy").map(String);
    }

    // TODO:: fix event saving, these event savings are broken. //
    if (!_.isNil($(data).element("link5"))) {
      let link5 = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "link5" });
      let event_data;

      if (_.isNil(link5)) {
        event_data = {
          qpro: parseInt($(data).attr("link5").qpro), // add
          glass: parseInt($(data).attr("link5").glass), // add
          beautiful: parseInt($(data).attr("link5").beautiful),
          quaver: parseInt($(data).attr("link5").quaver),
          castle: parseInt($(data).attr("link5").castle),
          flip: parseInt($(data).attr("link5").flip),
          titans: parseInt($(data).attr("link5").titans),
          exusia: parseInt($(data).attr("link5").exusia),
          waxing: parseInt($(data).attr("link5").waxing),
          sampling: parseInt($(data).attr("link5").sampling),
          beachside: parseInt($(data).attr("link5").beachside),
          cuvelia: parseInt($(data).attr("link5").cuvelia),
          reunion: parseInt($(data).attr("link5").reunion),
          bad: parseInt($(data).attr("link5").bad),
          turii: parseInt($(data).attr("link5").turii),
          anisakis: parseInt($(data).attr("link5").anisakis),
          second: parseInt($(data).attr("link5").second),
          whydidyou: parseInt($(data).attr("link5").whydidyou),
          china: parseInt($(data).attr("link5").china),
          fallen: parseInt($(data).attr("link5").fallen),
          broken: parseInt($(data).attr("link5").broken),
          summer: parseInt($(data).attr("link5").summer),
          sakura: parseInt($(data).attr("link5").sakura),
          wuv: parseInt($(data).attr("link5").wuv),
          survival: parseInt($(data).attr("link5").survival),
          thunder: parseInt($(data).attr("link5").thunder),
        }
      }
      else {
        event_data = link5;

        event_data.qpro += parseInt($(data).attr("link5").qpro);
        event_data.glass += parseInt($(data).attr("link5").glass);
        event_data.beautiful = parseInt($(data).attr("link5").beautiful);
        event_data.quaver = parseInt($(data).attr("link5").quaver);
        event_data.castle = parseInt($(data).attr("link5").castle);
        event_data.flip = parseInt($(data).attr("link5").flip);
        event_data.titans = parseInt($(data).attr("link5").titans);
        event_data.exusia = parseInt($(data).attr("link5").exusia);
        event_data.waxing = parseInt($(data).attr("link5").waxing);
        event_data.sampling = parseInt($(data).attr("link5").sampling);
        event_data.beachside = parseInt($(data).attr("link5").beachside);
        event_data.cuvelia = parseInt($(data).attr("link5").cuvelia);
        event_data.reunion = parseInt($(data).attr("link5").reunion);
        event_data.bad = parseInt($(data).attr("link5").bad);
        event_data.turii = parseInt($(data).attr("link5").turii);
        event_data.anisakis = parseInt($(data).attr("link5").anisakis);
        event_data.second = parseInt($(data).attr("link5").second);
        event_data.whydidyou = parseInt($(data).attr("link5").whydidyou);
        event_data.china = parseInt($(data).attr("link5").china);
        event_data.fallen = parseInt($(data).attr("link5").fallen);
        event_data.broken = parseInt($(data).attr("link5").broken);
        event_data.summer = parseInt($(data).attr("link5").summer);
        event_data.sakura = parseInt($(data).attr("link5").sakura);
        event_data.wuv = parseInt($(data).attr("link5").wuv);
        event_data.survival = parseInt($(data).attr("link5").survival);
        event_data.thunder = parseInt($(data).attr("link5").thunder);
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "link5",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("tricolettepark"))) {
      let tricolettepark = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "tricolettepark" });
      let event_data;

      if (_.isNil(tricolettepark)) {
        event_data = {
          open_music: parseInt($(data).attr("tricolettepark").open_music),
          boss0_damage: parseInt($(data).attr("tricolettepark").boss0_damage), // add
          boss1_damage: parseInt($(data).attr("tricolettepark").boss1_damage),
          boss2_damage: parseInt($(data).attr("tricolettepark").boss2_damage),
          boss3_damage: parseInt($(data).attr("tricolettepark").boss3_damage),
          boss0_stun: parseInt($(data).attr("tricolettepark").boss0_stun),
          boss1_stun: parseInt($(data).attr("tricolettepark").boss1_stun),
          boss2_stun: parseInt($(data).attr("tricolettepark").boss2_stun),
          boss3_stun: parseInt($(data).attr("tricolettepark").boss3_stun),
          union_magic_used: parseInt($(data).attr("tricolettepark").union_magic_used),
        }
      }
      else {
        event_data = tricolettepark;

        event_data.open_music = parseInt($(data).attr("tricolettepark").open_music),
          event_data.boss0_damage += parseInt($(data).attr("tricolettepark").boss0_damage);
        event_data.boss1_damage += parseInt($(data).attr("tricolettepark").boss1_damage);
        event_data.boss2_damage += parseInt($(data).attr("tricolettepark").boss2_damage);
        event_data.boss3_damage += parseInt($(data).attr("tricolettepark").boss3_damage);
        event_data.boss0_stun = parseInt($(data).attr("tricolettepark").boss0_stun);
        event_data.boss1_stun = parseInt($(data).attr("tricolettepark").boss1_stun);
        event_data.boss2_stun = parseInt($(data).attr("tricolettepark").boss2_stun);
        event_data.boss3_stun = parseInt($(data).attr("tricolettepark").boss3_stun);
        event_data.union_magic_used = parseInt($(data).attr("tricolettepark").union_magic_used);
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "tricolettepark",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("commonboss"))) {
      pcdata.deller += parseInt($(data).attr("commonboss").deller);
      pcdata.orb += parseInt($(data).attr("commonboss").orb);
    }

    if (!_.isNil($(data).element("yellowboss"))) {
      let yellowboss = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "yellowboss" });
      let event_data;

      if (_.isNil(yellowboss)) {
        event_data = {
          level: parseInt($(data).attr("yellowboss").level),
          heroic0: parseInt($(data).attr("yellowboss").heroic0),
          heroic1: parseInt($(data).attr("yellowboss").heroic1),
          critical: parseInt($(data).attr("yellowboss").critical),
          last_select: parseInt($(data).attr("yellowboss").last_select),
          p_attack: $(data).element("yellowboss").numbers("p_attack"),
          pbest_attack: $(data).element("yellowboss").numbers("pbest_attack"),
          defeat: $(data).element("yellowboss").numbers("defeat"), // <- bools //
          first_flg: 0, // <- bool //
        }
      } else {
        event_data = yellowboss;

        event_data.level = parseInt($(data).attr("yellowboss").level);
        event_data.heroic0 = parseInt($(data).attr("yellowboss").heroic0);
        event_data.heroic1 = parseInt($(data).attr("yellowboss").heroic1);
        event_data.critical = parseInt($(data).attr("yellowboss").critical);
        event_data.last_select = parseInt($(data).attr("yellowboss").last_select);

        let p_attack = $(data).element("yellowboss").numbers("p_attack");
        for (let a = 0; a < 7; a++) {
          event_data.p_attack[a] += p_attack[a];
          event_data.pbest_attack[a] = Math.max(event_data.pbest_attack[a], p_attack[a]);
        }
      }
      

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "yellowboss",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("redboss"))) {
      let event_data = {
        progress: parseInt($(data).attr("redboss").progress),
        crush: parseInt($(data).attr("redboss").crush),
        open: parseInt($(data).attr("redboss").open),
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "redboss",
        },
        {
          $set: event_data,
        }
      );
    }
  }
  else if (version == 21) {
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);

    if (!_.isNil($(data).attr().s_lift)) pcdata.s_liflen = parseInt($(data).attr().s_lift);
    if (!_.isNil($(data).attr().d_lift)) pcdata.s_liflen = parseInt($(data).attr().d_lift);

    if (!_.isNil($(data).element("secret"))) {
      pcdata.secret_flg1 = $(data).element("secret").bigints("flg1").map(String);
      pcdata.secret_flg2 = $(data).element("secret").bigints("flg2").map(String);
      pcdata.secret_flg3 = $(data).element("secret").bigints("flg3").map(String);
    }

    if (!_.isNil($(data).element("favorite"))) {
      pcdata.sp_mlist = $(data).element("favorite").buffer("sp_mlist").toString("base64");
      pcdata.sp_clist = $(data).element("favorite").buffer("sp_clist").toString("base64");
      pcdata.dp_mlist = $(data).element("favorite").buffer("dp_mlist").toString("base64");
      pcdata.dp_clist = $(data).element("favorite").buffer("dp_clist").toString("base64");
    }

    if (!_.isNil($(data).element("qpro_secret"))) {
      custom.qpro_secret_head = $(data).element("qpro_secret").bigints("head").map(String);
      custom.qpro_secret_hair = $(data).element("qpro_secret").bigints("hair").map(String);
      custom.qpro_secret_face = $(data).element("qpro_secret").bigints("face").map(String);
      custom.qpro_secret_body = $(data).element("qpro_secret").bigints("body").map(String);
      custom.qpro_secret_hand = $(data).element("qpro_secret").bigints("hand").map(String);
    }

    if (!_.isNil($(data).element("achievements"))) {
      // TODO:: achi_packflg, achi_packid, achi_playpack //
      pcdata.achi_lastweekly = parseInt($(data).attr("achievements").last_weekly);
      pcdata.achi_packcomp = parseInt($(data).attr("achievements").pack_comp);
      pcdata.achi_visitflg = parseInt($(data).attr("achievements").visit_flg);
      pcdata.achi_weeklynum = parseInt($(data).attr("achievements").weekly_num);
      pcdata.achi_trophy = $(data).element("achievements").bigints("trophy").map(String);
    }

    if (hasStepUpData) {
      pcdata.st_damage = parseInt($(data).attr("step").damage);
      pcdata.st_defeat = parseInt($(data).attr("step").defeat);
      pcdata.st_progress = parseInt($(data).attr("step").progress);
      pcdata.st_round = parseInt($(data).attr("step").round);
      pcdata.st_sp_mission = parseInt($(data).attr("step").sp_mission);
      pcdata.st_dp_mission = parseInt($(data).attr("step").dp_mission);
      pcdata.st_sp_level = parseInt($(data).attr("step").sp_level);
      pcdata.st_dp_level = parseInt($(data).attr("step").dp_level);
      pcdata.st_sp_mplay = parseInt($(data).attr("step").sp_mplay);
      pcdata.st_dp_mplay = parseInt($(data).attr("step").dp_mplay);
      pcdata.st_last_select = parseInt($(data).attr("step").last_select);
      pcdata.st_album = $(data).buffer("step").toString("base64"); // TODO:: verify //
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
    if (!_.isNil($(data).element("orb_data"))) pcdata.orb += parseInt($(data).attr("orb_data").add_orb);

    // TODO:: fix event saving, these event savings are broken. //
    if (!_.isNil($(data).element("boss1"))) {
      let event_data = {
        stamina: parseInt($(data).attr("boss1").stamina),
        attack: parseInt($(data).attr("boss1").attack),
        item_flg: parseInt($(data).attr("boss1").item_flg),
        item_flg2: parseInt($(data).attr("boss1").item_flg2),
        pick: parseInt($(data).attr("boss1").pick),
        row0: parseInt($(data).attr("boss1").row0),
        row1: parseInt($(data).attr("boss1").row1),
        row2: parseInt($(data).attr("boss1").row2),
        row3: parseInt($(data).attr("boss1").row3),
        column0: parseInt($(data).attr("boss1").column0),
        column1: parseInt($(data).attr("boss1").column1),
        column2: parseInt($(data).attr("boss1").column2),
        column3: parseInt($(data).attr("boss1").column3),
        map: parseInt($(data).attr("boss1").map),
        job: parseInt($(data).attr("boss1").job),
        general: parseInt($(data).attr("boss1").general),
        battle: parseInt($(data).attr("boss1").battle),
        boss0_n: parseInt($(data).attr("boss1").boss0_n),
        boss0_h: parseInt($(data).attr("boss1").boss0_h),
        boss0_a: parseInt($(data).attr("boss1").boss0_a),
        boss1_n: parseInt($(data).attr("boss1").boss1_n),
        boss1_h: parseInt($(data).attr("boss1").boss1_h),
        boss1_a: parseInt($(data).attr("boss1").boss1_a),
        boss2_n: parseInt($(data).attr("boss1").boss2_n),
        boss2_h: parseInt($(data).attr("boss1").boss2_h),
        boss2_a: parseInt($(data).attr("boss1").boss2_a),
        boss_scene: parseInt($(data).attr("boss1").boss_scene),
        boss0_damage: parseInt($(data).attr("boss1").boss0_damage),
        boss1_damage: parseInt($(data).attr("boss1").boss1_damage),
        boss2_damage: parseInt($(data).attr("boss1").boss2_damage),
        boss3_damage: parseInt($(data).attr("boss1").boss3_damage),
        boss4_damage: parseInt($(data).attr("boss1").boss4_damage),
        boss5_damage: parseInt($(data).attr("boss1").boss5_damage),
        boss6_damage: parseInt($(data).attr("boss1").boss6_damage),
        level: $(data).element("boss1").numbers("level"),
        durability: $(data).element("boss1").buffer("durability").toString("base64"),
      };

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "boss1",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("link5"))) {
      let link5 = await DB.FindOne(refid, { collection: "event_1", version: 20, event_name: "link5" });
      let event_data;

      if (_.isNil(link5)) {
        event_data = {
          qpro: parseInt($(data).attr("link5").qpro), // add
          glass: parseInt($(data).attr("link5").glass), // add
          beautiful: parseInt($(data).attr("link5").beautiful),
          quaver: parseInt($(data).attr("link5").quaver),
          castle: parseInt($(data).attr("link5").castle),
          flip: parseInt($(data).attr("link5").flip),
          titans: parseInt($(data).attr("link5").titans),
          exusia: parseInt($(data).attr("link5").exusia),
          waxing: parseInt($(data).attr("link5").waxing),
          sampling: parseInt($(data).attr("link5").sampling),
          beachside: parseInt($(data).attr("link5").beachside),
          cuvelia: parseInt($(data).attr("link5").cuvelia),
          reunion: parseInt($(data).attr("link5").reunion),
          bad: parseInt($(data).attr("link5").bad),
          turii: parseInt($(data).attr("link5").turii),
          anisakis: parseInt($(data).attr("link5").anisakis),
          second: parseInt($(data).attr("link5").second),
          whydidyou: parseInt($(data).attr("link5").whydidyou),
          china: parseInt($(data).attr("link5").china),
          fallen: parseInt($(data).attr("link5").fallen),
          broken: parseInt($(data).attr("link5").broken),
          summer: parseInt($(data).attr("link5").summer),
          sakura: parseInt($(data).attr("link5").sakura),
          wuv: parseInt($(data).attr("link5").wuv),
          survival: parseInt($(data).attr("link5").survival),
          thunder: parseInt($(data).attr("link5").thunder),
        }
      }
      else {
        event_data = link5;

        event_data.qpro += parseInt($(data).attr("link5").qpro);
        event_data.glass += parseInt($(data).attr("link5").glass);
        event_data.beautiful = parseInt($(data).attr("link5").beautiful);
        event_data.quaver = parseInt($(data).attr("link5").quaver);
        event_data.castle = parseInt($(data).attr("link5").castle);
        event_data.flip = parseInt($(data).attr("link5").flip);
        event_data.titans = parseInt($(data).attr("link5").titans);
        event_data.exusia = parseInt($(data).attr("link5").exusia);
        event_data.waxing = parseInt($(data).attr("link5").waxing);
        event_data.sampling = parseInt($(data).attr("link5").sampling);
        event_data.beachside = parseInt($(data).attr("link5").beachside);
        event_data.cuvelia = parseInt($(data).attr("link5").cuvelia);
        event_data.reunion = parseInt($(data).attr("link5").reunion);
        event_data.bad = parseInt($(data).attr("link5").bad);
        event_data.turii = parseInt($(data).attr("link5").turii);
        event_data.anisakis = parseInt($(data).attr("link5").anisakis);
        event_data.second = parseInt($(data).attr("link5").second);
        event_data.whydidyou = parseInt($(data).attr("link5").whydidyou);
        event_data.china = parseInt($(data).attr("link5").china);
        event_data.fallen = parseInt($(data).attr("link5").fallen);
        event_data.broken = parseInt($(data).attr("link5").broken);
        event_data.summer = parseInt($(data).attr("link5").summer);
        event_data.sakura = parseInt($(data).attr("link5").sakura);
        event_data.wuv = parseInt($(data).attr("link5").wuv);
        event_data.survival = parseInt($(data).attr("link5").survival);
        event_data.thunder = parseInt($(data).attr("link5").thunder);
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: 20,
          event_name: "link5",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("tricolettepark"))) {
      let tricolettepark = await DB.FindOne(refid, { collection: "event_1", version: 20, event_name: "tricolettepark" });
      let event_data;

      if (_.isNil(tricolettepark)) {
        event_data = {
          open_music: parseInt($(data).attr("tricolettepark").open_music),
          boss0_damage: parseInt($(data).attr("tricolettepark").boss0_damage), // add
          boss1_damage: parseInt($(data).attr("tricolettepark").boss1_damage),
          boss2_damage: parseInt($(data).attr("tricolettepark").boss2_damage),
          boss3_damage: parseInt($(data).attr("tricolettepark").boss3_damage),
          boss0_stun: parseInt($(data).attr("tricolettepark").boss0_stun),
          boss1_stun: parseInt($(data).attr("tricolettepark").boss1_stun),
          boss2_stun: parseInt($(data).attr("tricolettepark").boss2_stun),
          boss3_stun: parseInt($(data).attr("tricolettepark").boss3_stun),
          union_magic_used: parseInt($(data).attr("tricolettepark").union_magic_used),
        }
      }
      else {
        event_data = tricolettepark;

        event_data.open_music = parseInt($(data).attr("tricolettepark").open_music),
        event_data.boss0_damage += parseInt($(data).attr("tricolettepark").boss0_damage);
        event_data.boss1_damage += parseInt($(data).attr("tricolettepark").boss1_damage);
        event_data.boss2_damage += parseInt($(data).attr("tricolettepark").boss2_damage);
        event_data.boss3_damage += parseInt($(data).attr("tricolettepark").boss3_damage);
        event_data.boss0_stun = parseInt($(data).attr("tricolettepark").boss0_stun);
        event_data.boss1_stun = parseInt($(data).attr("tricolettepark").boss1_stun);
        event_data.boss2_stun = parseInt($(data).attr("tricolettepark").boss2_stun);
        event_data.boss3_stun = parseInt($(data).attr("tricolettepark").boss3_stun);
        event_data.union_magic_used = parseInt($(data).attr("tricolettepark").union_magic_used);
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: 20,
          event_name: "tricolettepark",
        },
        {
          $set: event_data,
        }
      );
    }
  }
  else if (version == 22) {
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.s_exscore = parseInt($(data).attr().s_exscore);
    pcdata.d_exscore = parseInt($(data).attr().d_exscore);
    pcdata.s_largejudge = parseInt($(data).attr().s_largejudge);
    pcdata.d_largejudge = parseInt($(data).attr().d_largejudge);

    if (!_.isNil($(data).attr().s_lift)) pcdata.s_liflen = parseInt($(data).attr().s_lift);
    if (!_.isNil($(data).attr().d_lift)) pcdata.s_liflen = parseInt($(data).attr().d_lift);

    if (!_.isNil($(data).element("secret"))) {
      pcdata.secret_flg1 = $(data).element("secret").bigints("flg1").map(String);
      pcdata.secret_flg2 = $(data).element("secret").bigints("flg2").map(String);
      pcdata.secret_flg3 = $(data).element("secret").bigints("flg3").map(String);
    }

    if (!_.isNil($(data).element("favorite"))) {
      pcdata.sp_mlist = $(data).element("favorite").buffer("sp_mlist").toString("base64");
      pcdata.sp_clist = $(data).element("favorite").buffer("sp_clist").toString("base64");
      pcdata.dp_mlist = $(data).element("favorite").buffer("dp_mlist").toString("base64");
      pcdata.dp_clist = $(data).element("favorite").buffer("dp_clist").toString("base64");
    }

    if (!_.isNil($(data).element("qpro_secret"))) {
      custom.qpro_secret_head = $(data).element("qpro_secret").bigints("head").map(String);
      custom.qpro_secret_hair = $(data).element("qpro_secret").bigints("hair").map(String);
      custom.qpro_secret_face = $(data).element("qpro_secret").bigints("face").map(String);
      custom.qpro_secret_body = $(data).element("qpro_secret").bigints("body").map(String);
      custom.qpro_secret_hand = $(data).element("qpro_secret").bigints("hand").map(String);
    }

    if (!_.isNil($(data).element("qpro_equip"))) {
      custom.qpro_head = parseInt($(data).attr("qpro_equip").head);
      custom.qpro_hair = parseInt($(data).attr("qpro_equip").hair);
      custom.qpro_face = parseInt($(data).attr("qpro_equip").face);
      custom.qpro_body = parseInt($(data).attr("qpro_equip").body);
      custom.qpro_hand = parseInt($(data).attr("qpro_equip").head);
    }

    if (!_.isNil($(data).element("achievements"))) {
      // TODO:: achi_packflg, achi_packid, achi_playpack //
      pcdata.achi_lastweekly = parseInt($(data).attr("achievements").last_weekly);
      pcdata.achi_packcomp = parseInt($(data).attr("achievements").pack_comp);
      pcdata.achi_visitflg = parseInt($(data).attr("achievements").visit_flg);
      pcdata.achi_weeklynum = parseInt($(data).attr("achievements").weekly_num);
      pcdata.achi_trophy = $(data).element("achievements").bigints("trophy").map(String);
    }

    if (hasStepUpData) {
      pcdata.st_damage = parseInt($(data).attr("step").damage);
      pcdata.st_defeat = parseInt($(data).attr("step").defeat);
      pcdata.st_progress = parseInt($(data).attr("step").progress);
      pcdata.st_is_secret = parseInt($(data).attr("step").is_secret);
      pcdata.st_sp_mission = parseInt($(data).attr("step").sp_mission);
      pcdata.st_dp_mission = parseInt($(data).attr("step").dp_mission);
      pcdata.st_sp_level = parseInt($(data).attr("step").sp_level);
      pcdata.st_dp_level = parseInt($(data).attr("step").dp_level);
      pcdata.st_sp_mplay = parseInt($(data).attr("step").sp_mplay);
      pcdata.st_dp_mplay = parseInt($(data).attr("step").dp_mplay);
      pcdata.st_age_list = parseInt($(data).attr("step").age_list);
      pcdata.st_album = $(data).buffer("step").toString("base64"); // TODO:: verify //
      pcdata.st_is_present = parseInt($(data).attr("step").is_present);
      pcdata.st_is_future = parseInt($(data).attr("step").is_future);
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
    if (!_.isNil($(data).element("orb_data"))) pcdata.orb += parseInt($(data).attr("orb_data").add_orb);

    // TODO:: fix event saving, these event savings are broken. //
    if (!_.isNil($(data).element("chrono_diver"))) {
      let event_data = {
        play_count: parseInt($(data).attr("chrono_diver").play_count),
        present_unlock: parseInt($(data).attr("chrono_diver").present_unlock),
        future_unlock: parseInt($(data).attr("chrono_diver").future_unlock),
        success_count_0_n: parseInt($(data).attr("chrono_diver").success_count_0_n),
        success_count_0_h: parseInt($(data).attr("chrono_diver").success_count_0_h),
        success_count_0_a: parseInt($(data).attr("chrono_diver").success_count_0_a),
        success_count_1_n: parseInt($(data).attr("chrono_diver").success_count_1_n),
        success_count_1_h: parseInt($(data).attr("chrono_diver").success_count_1_h),
        success_count_1_a: parseInt($(data).attr("chrono_diver").success_count_1_a),
        success_count_2_n: parseInt($(data).attr("chrono_diver").success_count_2_n),
        success_count_2_h: parseInt($(data).attr("chrono_diver").success_count_2_h),
        success_count_2_a: parseInt($(data).attr("chrono_diver").success_count_2_a),
        success_count_3_n: parseInt($(data).attr("chrono_diver").success_count_3_n),
        success_count_3_h: parseInt($(data).attr("chrono_diver").success_count_3_h),
        success_count_3_a: parseInt($(data).attr("chrono_diver").success_count_3_a),
        story_list: parseInt($(data).attr("chrono_diver").story_list)
      };

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "chrono_diver",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("qpronicle_chord"))) {
      let event_data = {
        is_first_select_map: parseInt($(data).attr("qpronicle_chord").is_first_select_map),
        last_select_map: parseInt($(data).attr("qpronicle_chord").last_select_map),
        story_view_list: parseInt($(data).attr("qpronicle_chord").story_view_list),
        is_use_login_bonus: parseInt($(data).attr("qpronicle_chord").is_use_login_bonus),
        patona_leader: parseInt($(data).attr("qpronicle_chord").patona_leader),
        patona_sub_1: parseInt($(data).attr("qpronicle_chord").patona_sub_1),
        patona_sub_2: parseInt($(data).attr("qpronicle_chord").patona_sub_2),
        rare_enemy_damage1: parseInt($(data).attr("qpronicle_chord").rare_enemy_damage1),
        rare_enemy_damage2: parseInt($(data).attr("qpronicle_chord").rare_enemy_damage2),
        rare_enemy_damage3: parseInt($(data).attr("qpronicle_chord").rare_enemy_damage3),
        rare_enemy_damage4: parseInt($(data).attr("qpronicle_chord").rare_enemy_damage4),
        rare_enemy_damage5: parseInt($(data).attr("qpronicle_chord").rare_enemy_damage5),
      };

      // TODO:: patona_data //

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "qpronicle_chord",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("qpronicle_phase3"))) {
      let event_data = {
        stairs_num: parseInt($(data).attr("qpronicle_phase3").stairs_num),
        flame_list: parseInt($(data).attr("qpronicle_phase3").flame_list),
        lane_list: parseInt($(data).attr("qpronicle_phase3").lane_list),
        map0_select: parseInt($(data).attr("qpronicle_phase3").map0_select),
        map1_select: parseInt($(data).attr("qpronicle_phase3").map1_select),
        map2_select: parseInt($(data).attr("qpronicle_phase3").map2_select),
        map3_select: parseInt($(data).attr("qpronicle_phase3").map3_select),
        map4_select: parseInt($(data).attr("qpronicle_phase3").map4_select),
        map5_select: parseInt($(data).attr("qpronicle_phase3").map5_select),
        map6_select: parseInt($(data).attr("qpronicle_phase3").map6_select),
      };

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "qpronicle_phase3",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("boss_event_3"))) {
      let boss_event_3 = await DB.FindOne(refid, { collection: "event_1", version: version, event_name: "boss_event_3" });
      let event_data;

      if (_.isNil(boss_event_3)) {
        event_data = {
          point: parseInt($(data).attr().add_bonus_point)
        }
      }
      else {
        event_data = boss_event_3;
        event_data.point += parseInt($(data).attr("boss_event_3").add_bonus_point);
      }

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "boss_event_3",
        },
        {
          $set: event_data,
        }
      );
    }
  }
  else if (version == 23) {
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.s_exscore = parseInt($(data).attr().s_exscore);
    pcdata.d_exscore = parseInt($(data).attr().d_exscore);
    pcdata.s_largejudge = parseInt($(data).attr().s_largejudge);
    pcdata.d_largejudge = parseInt($(data).attr().d_largejudge);

    if (!_.isNil($(data).attr().s_lift)) pcdata.s_liflen = parseInt($(data).attr().s_lift);
    if (!_.isNil($(data).attr().d_lift)) pcdata.s_liflen = parseInt($(data).attr().d_lift);

    if (!_.isNil($(data).element("secret"))) {
      pcdata.secret_flg1 = $(data).element("secret").bigints("flg1").map(String);
      pcdata.secret_flg2 = $(data).element("secret").bigints("flg2").map(String);
      pcdata.secret_flg3 = $(data).element("secret").bigints("flg3").map(String);
    }

    if (!_.isNil($(data).element("favorite"))) {
      pcdata.sp_mlist = $(data).element("favorite").buffer("sp_mlist").toString("base64");
      pcdata.sp_clist = $(data).element("favorite").buffer("sp_clist").toString("base64");
      pcdata.dp_mlist = $(data).element("favorite").buffer("dp_mlist").toString("base64");
      pcdata.dp_clist = $(data).element("favorite").buffer("dp_clist").toString("base64");
    }

    if (!_.isNil($(data).element("qpro_secret"))) {
      custom.qpro_secret_head = $(data).element("qpro_secret").bigints("head").map(String);
      custom.qpro_secret_hair = $(data).element("qpro_secret").bigints("hair").map(String);
      custom.qpro_secret_face = $(data).element("qpro_secret").bigints("face").map(String);
      custom.qpro_secret_body = $(data).element("qpro_secret").bigints("body").map(String);
      custom.qpro_secret_hand = $(data).element("qpro_secret").bigints("hand").map(String);
    }

    if (!_.isNil($(data).element("qpro_equip"))) {
      custom.qpro_head = parseInt($(data).attr("qpro_equip").head);
      custom.qpro_hair = parseInt($(data).attr("qpro_equip").hair);
      custom.qpro_face = parseInt($(data).attr("qpro_equip").face);
      custom.qpro_body = parseInt($(data).attr("qpro_equip").body);
      custom.qpro_hand = parseInt($(data).attr("qpro_equip").head);
    }

    if (!_.isNil($(data).element("achievements"))) {
      // TODO:: achi_packflg, achi_packid, achi_playpack //
      pcdata.achi_lastweekly = parseInt($(data).attr("achievements").last_weekly);
      pcdata.achi_packcomp = parseInt($(data).attr("achievements").pack_comp);
      pcdata.achi_visitflg = parseInt($(data).attr("achievements").visit_flg);
      pcdata.achi_weeklynum = parseInt($(data).attr("achievements").weekly_num);
      pcdata.achi_trophy = $(data).element("achievements").bigints("trophy").map(String);
    }

    if (hasStepUpData) {
      pcdata.st_friendship = parseInt($(data).attr("step").friendship);
      pcdata.st_progress = parseInt($(data).attr("step").progress);
      pcdata.st_station_clear = parseInt($(data).attr("step").station_clear);
      pcdata.st_station_play = parseInt($(data).attr("step").station_play);
      pcdata.st_sp_mission = parseInt($(data).attr("step").sp_mission);
      pcdata.st_dp_mission = parseInt($(data).attr("step").dp_mission);
      pcdata.st_sp_level = parseInt($(data).attr("step").sp_level);
      pcdata.st_dp_level = parseInt($(data).attr("step").dp_level);
      pcdata.st_sp_mplay = parseInt($(data).attr("step").sp_mplay);
      pcdata.st_dp_mplay = parseInt($(data).attr("step").dp_mplay);
      pcdata.st_mission_gauge = parseInt($(data).attr("step").mission_gauge);
      pcdata.st_tokimeki = $(data).buffer("step").toString("base64"); // TODO:: verify //
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
    if (!_.isNil($(data).element("orb_data"))) pcdata.orb += parseInt($(data).attr("orb_data").add_orb);

    // TODO:: fix event saving, these event savings are broken. //
    if (!_.isNil($(data).element("event1_data"))) {
      let event_data = {
        point_map_0: parseInt($(data).attr("event1_data").point_map_0),
        point_map_1: parseInt($(data).attr("event1_data").point_map_1),
        point_map_2: parseInt($(data).attr("event1_data").point_map_2),
        point_map_3: parseInt($(data).attr("event1_data").point_map_3),
        point_map_4: parseInt($(data).attr("event1_data").point_map_4),
        last_map: parseInt($(data).attr("event1_data").last_map),
        hold_point: parseInt($(data).attr("event1_data").hold_point),
        rank_point: parseInt($(data).attr("event1_data").rank_point),
        tips_list: parseInt($(data).attr("event1_data").tips_list),
        use_gift_point: $(data).element("event1_data").bool("use_gift_point"),
      };

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "event1_data",
        },
        {
          $set: event_data,
        }
      );
    }

    if (!_.isNil($(data).element("event2_data"))) {
      let event_data = {
        now_stay_area: parseInt($(data).attr("event2_data").now_stay_area),
        now_stay_note_grade: parseInt($(data).attr("event2_data").now_stay_note_grade),
        play_num: parseInt($(data).attr("event2_data").play_num),
        stop_area_time: parseInt($(data).attr("event2_data").stop_area_time),
      };

      // TODO:: event2_area_data //

      await DB.Upsert(refid,
        {
          collection: "event_1",
          version: version,
          event_name: "event2_data",
        },
        {
          $set: event_data,
        }
      );
    }
  }
  else if (version == 24) {
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);

    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.d_exscore = parseInt($(data).attr().d_exscore);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.d_graph_score = parseInt($(data).attr().d_graph_score);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.d_timing = parseInt($(data).attr().d_timing);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.mode = parseInt($(data).attr().mode);
    pcdata.pmode = parseInt($(data).attr().pmode);
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.s_exscore = parseInt($(data).attr().s_exscore);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.s_graph_score = parseInt($(data).attr().s_graph_score);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.s_timing = parseInt($(data).attr().s_timing);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);

    if (cltype == 0) {
      pcdata.s_liflen = parseInt($(data).attr().s_lift);
    } else {
      pcdata.d_liflen = parseInt($(data).attr().d_lift);
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
  }
  else if (version == 25) {
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);

    pcdata.d_auto_scrach = parseInt($(data).attr().d_auto_scrach);
    pcdata.d_camera_layout = parseInt($(data).attr().d_camera_layout);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.d_exscore = parseInt($(data).attr().d_exscore);
    pcdata.d_gauge_disp = parseInt($(data).attr().d_gauge_disp);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.d_graph_score = parseInt($(data).attr().d_graph_score);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.d_lane_brignt = parseInt($(data).attr().d_lane_brignt);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.d_timing = parseInt($(data).attr().d_timing);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.mode = parseInt($(data).attr().mode);
    pcdata.pmode = parseInt($(data).attr().pmode);
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.s_auto_scrach = parseInt($(data).attr().s_auto_scrach);
    pcdata.s_camera_layout = parseInt($(data).attr().s_camera_layout);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.s_exscore = parseInt($(data).attr().s_exscore);
    pcdata.s_gauge_disp = parseInt($(data).attr().s_gauge_disp);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.s_graph_score = parseInt($(data).attr().s_graph_score);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.s_lane_brignt = parseInt($(data).attr().s_lane_brignt);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.s_timing = parseInt($(data).attr().s_timing);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);

    if (cltype == 0) {
      pcdata.s_liflen = parseInt($(data).attr().s_lift);
    } else {
      pcdata.d_liflen = parseInt($(data).attr().d_lift);
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
  }
  else if (version == 26) {
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.s_sub_gno = parseInt($(data).attr().s_sub_gno);
    pcdata.d_sub_gno = parseInt($(data).attr().d_sub_gno);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.s_graph_score = parseInt($(data).attr().s_graph_score);
    pcdata.d_graph_score = parseInt($(data).attr().d_graph_score);
    pcdata.s_auto_scrach = parseInt($(data).attr().s_auto_scrach);
    pcdata.d_auto_scrach = parseInt($(data).attr().d_auto_scrach);
    pcdata.s_gauge_disp = parseInt($(data).attr().s_gauge_disp);
    pcdata.d_gauge_disp = parseInt($(data).attr().d_gauge_disp);
    pcdata.s_lane_brignt = parseInt($(data).attr().s_lane_brignt);
    pcdata.d_lane_brignt = parseInt($(data).attr().d_lane_brignt);
    pcdata.s_camera_layout = parseInt($(data).attr().s_camera_layout);
    pcdata.d_camera_layout = parseInt($(data).attr().d_camera_layout);
    pcdata.s_ghost_score = parseInt($(data).attr().s_ghost_score);
    pcdata.d_ghost_score = parseInt($(data).attr().d_ghost_score);
    pcdata.s_tsujigiri_disp = parseInt($(data).attr().s_tsujigiri_disp);
    pcdata.d_tsujigiri_disp = parseInt($(data).attr().d_tsujigiri_disp);

    if (cltype == 0) {
      pcdata.s_liflen = parseInt($(data).attr().s_lift);
    } else {
      pcdata.d_liflen = parseInt($(data).attr().d_lift);
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
  }
  else if (version >= 27) {
    // lid bookkeep cid ctype ccode
    pcdata.rtype = parseInt($(data).attr().rtype);
    pcdata.sach = parseInt($(data).attr().s_achi);
    pcdata.dach = parseInt($(data).attr().d_achi);
    pcdata.sp_opt = parseInt($(data).attr().sp_opt);
    pcdata.dp_opt = parseInt($(data).attr().dp_opt);
    pcdata.dp_opt2 = parseInt($(data).attr().dp_opt2);
    pcdata.gpos = parseInt($(data).attr().gpos);
    pcdata.s_sorttype = parseInt($(data).attr().s_sorttype);
    pcdata.d_sorttype = parseInt($(data).attr().d_sorttype);
    pcdata.s_disp_judge = parseInt($(data).attr().s_disp_judge);
    pcdata.d_disp_judge = parseInt($(data).attr().d_disp_judge);
    pcdata.s_pace = parseInt($(data).attr().s_pace);
    pcdata.d_pace = parseInt($(data).attr().d_pace);
    pcdata.s_gno = parseInt($(data).attr().s_gno);
    pcdata.d_gno = parseInt($(data).attr().d_gno);
    pcdata.s_sub_gno = parseInt($(data).attr().s_sub_gno);
    pcdata.d_sub_gno = parseInt($(data).attr().d_sub_gno);
    pcdata.s_gtype = parseInt($(data).attr().s_gtype);
    pcdata.d_gtype = parseInt($(data).attr().d_gtype);
    pcdata.s_sdlen = parseInt($(data).attr().s_sdlen);
    pcdata.d_sdlen = parseInt($(data).attr().d_sdlen);
    pcdata.s_sdtype = parseInt($(data).attr().s_sdtype);
    pcdata.d_sdtype = parseInt($(data).attr().d_sdtype);
    pcdata.s_notes = parseFloat($(data).attr().s_notes);
    pcdata.d_notes = parseFloat($(data).attr().d_notes);
    pcdata.s_judge = parseInt($(data).attr().s_judge);
    pcdata.d_judge = parseInt($(data).attr().d_judge);
    pcdata.s_judgeAdj = parseInt($(data).attr().s_judgeAdj);
    pcdata.d_judgeAdj = parseInt($(data).attr().d_judgeAdj);
    pcdata.s_hispeed = parseFloat($(data).attr().s_hispeed);
    pcdata.d_hispeed = parseFloat($(data).attr().d_hispeed);
    pcdata.s_opstyle = parseInt($(data).attr().s_opstyle);
    pcdata.d_opstyle = parseInt($(data).attr().d_opstyle);
    pcdata.s_graph_score = parseInt($(data).attr().s_graph_score);
    pcdata.d_graph_score = parseInt($(data).attr().d_graph_score);
    pcdata.s_auto_scrach = parseInt($(data).attr().s_auto_scrach);
    pcdata.d_auto_scrach = parseInt($(data).attr().d_auto_scrach);
    pcdata.s_gauge_disp = parseInt($(data).attr().s_gauge_disp);
    pcdata.d_gauge_disp = parseInt($(data).attr().d_gauge_disp);
    pcdata.s_lane_brignt = parseInt($(data).attr().s_lane_brignt);
    pcdata.d_lane_brignt = parseInt($(data).attr().d_lane_brignt);
    pcdata.s_camera_layout = parseInt($(data).attr().s_camera_layout);
    pcdata.d_camera_layout = parseInt($(data).attr().d_camera_layout);
    pcdata.s_ghost_score = parseInt($(data).attr().s_ghost_score);
    pcdata.d_ghost_score = parseInt($(data).attr().d_ghost_score);
    pcdata.s_tsujigiri_disp = parseInt($(data).attr().s_tsujigiri_disp);
    pcdata.d_tsujigiri_disp = parseInt($(data).attr().d_tsujigiri_disp);

    if (version >= 28) {
      pcdata.ngrade = parseInt($(data).attr().ngrade);
    }
    if (version >= 29) {
      pcdata.s_auto_adjust = parseInt($(data).attr().s_auto_adjust);
      pcdata.d_auto_adjust = parseInt($(data).attr().d_auto_adjust);
    }
    if (version >= 30) {
      pcdata.s_timing_split = parseInt($(data).attr().s_timing_split);
      pcdata.d_timing_split = parseInt($(data).attr().d_timing_split);
      pcdata.s_visualization = parseInt($(data).attr().s_visualization);
      pcdata.d_visualization = parseInt($(data).attr().d_visualization);
    }

    if (cltype == 0) {
      pcdata.s_liflen = parseInt($(data).attr().s_lift);
    } else {
      pcdata.d_liflen = parseInt($(data).attr().d_lift);
    }

    if (!_.isNil($(data).element("secret"))) {
      pcdata.secret_flg1 = $(data).element("secret").bigints("flg1").map(String);
      pcdata.secret_flg2 = $(data).element("secret").bigints("flg2").map(String);
      pcdata.secret_flg3 = $(data).element("secret").bigints("flg3").map(String);
      pcdata.secret_flg4 = $(data).element("secret").bigints("flg4").map(String);
    }

    // use bigint if type is "s64", number may seems to work //
    // but element will be removed when saving into DB once type is exceeded //
    // however, bigint is returning convert error on sendPug so mapping as string //
    if (!_.isNil($(data).element("qpro_secret"))) {
      custom.qpro_secret_head = $(data).element("qpro_secret").bigints("head").map(String);
      custom.qpro_secret_hair = $(data).element("qpro_secret").bigints("hair").map(String);
      custom.qpro_secret_face = $(data).element("qpro_secret").bigints("face").map(String);
      custom.qpro_secret_body = $(data).element("qpro_secret").bigints("body").map(String);
      custom.qpro_secret_hand = $(data).element("qpro_secret").bigints("hand").map(String);
    }

    if (!_.isNil($(data).element("qpro_equip"))) {
      custom.qpro_head = parseInt($(data).attr("qpro_equip").head);
      custom.qpro_hair = parseInt($(data).attr("qpro_equip").hair);
      custom.qpro_face = parseInt($(data).attr("qpro_equip").face);
      custom.qpro_body = parseInt($(data).attr("qpro_equip").body);
      custom.qpro_hand = parseInt($(data).attr("qpro_equip").head);
    }

    if (hasStepUpData) {
      pcdata.st_enemy_damage = parseInt($(data).attr("step").enemy_damage);
      pcdata.st_progress = parseInt($(data).attr("step").progress);
      pcdata.st_is_track_ticket = $(data).element("step").bool("is_track_ticket");
      pcdata.st_sp_level = parseInt($(data).attr("step").sp_level);
      pcdata.st_dp_level = parseInt($(data).attr("step").dp_level);
      pcdata.st_sp_mplay = parseInt($(data).attr("step").sp_mplay);
      pcdata.st_dp_mplay = parseInt($(data).attr("step").dp_mplay);
      pcdata.st_tips_read_list = parseInt($(data).attr("step").tips_read_list);

      if (version >= 29) {
        pcdata.st_total_point = parseInt($(data).attr("step").total_point);
        pcdata.st_enemy_defeat_flg = parseInt($(data).attr("step").enemy_defeat_flg);
        pcdata.st_mission_clear_num = parseInt($(data).attr("step").mission_clear_num);

        if (version >= 30) {
          pcdata.st_sp_fluctuation = parseInt($(data).attr("step").sp_fluctuation);
          pcdata.st_dp_fluctuation = parseInt($(data).attr("step").dp_fluctuation);
        }
      } else {
        pcdata.st_dp_clear_mission_clear = parseInt($(data).attr("step").dp_clear_mission_clear);
        pcdata.st_dp_clear_mission_level = parseInt($(data).attr("step").dp_clear_mission_level);
        pcdata.st_dp_dj_mission_clear = parseInt($(data).attr("step").dp_dj_mission_clear);
        pcdata.st_dp_dj_mission_level = parseInt($(data).attr("step").dp_dj_mission_level);
        pcdata.st_dp_mission_point = parseInt($(data).attr("step").dp_mission_point);

        pcdata.st_sp_clear_mission_clear = parseInt($(data).attr("step").sp_clear_mission_clear);
        pcdata.st_sp_clear_mission_level = parseInt($(data).attr("step").sp_clear_mission_level);
        pcdata.st_sp_dj_mission_clear = parseInt($(data).attr("step").sp_dj_mission_clear);
        pcdata.st_sp_dj_mission_level = parseInt($(data).attr("step").sp_dj_mission_level);
        pcdata.st_sp_mission_point = parseInt($(data).attr("step").sp_mission_point);
      }
    }

    if (!_.isNil($(data).element("achievements"))) {
      // TODO:: achi_pack, achi_rivalcrush //
      pcdata.achi_lastweekly = parseInt($(data).attr("achievements").last_weekly);
      pcdata.achi_packcomp = parseInt($(data).attr("achievements").pack_comp);
      pcdata.achi_visitflg = parseInt($(data).attr("achievements").visit_flg);
      pcdata.achi_weeklynum = parseInt($(data).attr("achievements").weekly_num);
      pcdata.achi_trophy = $(data).element("achievements").bigints("trophy").map(String);
    }

    if ($(data).attr("dj_rank.1").style == "1") {
      pcdata.dr_sprank = $(data).element("dj_rank").numbers("rank");
      pcdata.dr_sppoint = $(data).element("dj_rank").numbers("point");
      pcdata.dr_dprank = $(data).element("dj_rank.1").numbers("rank");
      pcdata.dr_dppoint = $(data).element("dj_rank.1").numbers("point");
    } else if ($(data).attr("dj_rank").style == "0") {
      pcdata.dr_sprank = $(data).element("dj_rank").numbers("rank");
      pcdata.dr_sppoint = $(data).element("dj_rank").numbers("point");
    } else if ($(data).attr("dj_rank").style == "1") {
      pcdata.dr_dprank = $(data).element("dj_rank").numbers("rank");
      pcdata.dr_dppoint = $(data).element("dj_rank").numbers("point");
    }

    if ($(data).attr("notes_radar.1").style == "1") {
      pcdata.nr_spradar = $(data).element("notes_radar").numbers("radar_score");
      pcdata.nr_dpradar = $(data).element("notes_radar.1").numbers("radar_score");
    } else if ($(data).attr("notes_radar").style == "0") {
      pcdata.nr_spradar = $(data).element("notes_radar").numbers("radar_score");
    } else if ($(data).attr("notes_radar").style == "1") {
      pcdata.nr_dpradar = $(data).element("notes_radar").numbers("radar_score");
    }

    if (!_.isNil($(data).element("deller"))) pcdata.deller += parseInt($(data).attr("deller").deller);
    if (!_.isNil($(data).element("orb_data"))) {
      pcdata.present_orb += parseInt($(data).attr("orb_data").present_orb);
      pcdata.orb += parseInt($(data).attr("orb_data").add_orb);
      pcdata.orb += parseInt($(data).attr("orb_data").reward_orb);
    }

    if (hasLanguageData) profile.language = parseInt($(data).attr("language_setting").language);

    if (!_.isNil($(data).element("extra_boss_event"))) {
      pcdata.eb_keyorb = parseInt($(data).attr("extra_boss_event").key_orb);
      pcdata.eb_bossorb0 = parseInt($(data).attr("extra_boss_event").boss_orb_0);
      pcdata.eb_bossorb1 = parseInt($(data).attr("extra_boss_event").boss_orb_1);
      pcdata.eb_bossorb2 = parseInt($(data).attr("extra_boss_event").boss_orb_2);
      pcdata.eb_bossorb3 = parseInt($(data).attr("extra_boss_event").boss_orb_3);
      pcdata.eb_bossorb4 = parseInt($(data).attr("extra_boss_event").boss_orb_4);
      pcdata.eb_bossorb5 = parseInt($(data).attr("extra_boss_event").boss_orb_5);
      pcdata.eb_bossorb6 = parseInt($(data).attr("extra_boss_event").boss_orb_6);
      pcdata.eb_bossorb7 = parseInt($(data).attr("extra_boss_event").boss_orb_7);
    }

    if (hasEventData) {
      if (version == 27) {
        pcdata.event_play_num += 1;
        pcdata.event_last_select_id = parseInt($(data).attr("event1").last_select_gym_id);

        $(data).element("event1").elements("gym_data").forEach((res) => {
          let event_data = {
            gym_id: res.attr().gym_id,
            play_num: res.attr().play_num,
            gauge_spirit: res.attr().gauge_spirit,
            gauge_technique: res.attr().gauge_technique,
            gauge_body: res.attr().gauge_body,
            boss_attack_num: res.attr().boss_attack_num,
            boss_damage: res.attr().boss_damage,
            disp_lounge_list: res.attr().disp_lounge_list,
            stb_type: res.attr().stb_type,
            is_complete: res.number("is_complete"),
            is_gauge_max: res.number("is_gauge_max"),
          }

          DB.Upsert(
            refid,
            {
              collection: "event_1",
              version: version,
              gym_id: event_data.gym_id
            },
            {
              $set: event_data,
            });
        });
      } else if (version == 28) {
        pcdata.event_play_num += 1;
        pcdata.event_story_prog = parseInt($(data).attr("event_1").story_prog);
        pcdata.event_last_select_id = parseInt($(data).attr("event_1").last_select_area_id);
        pcdata.event_failed_num = parseInt($(data).attr("event_1").failed_num);

        $(data).element("event_1").elements("area_data").forEach((res) => {
          let event_data = {
            area_id: res.attr().area_id,
            play_num: res.attr().play_num,
            recipe_prog0: res.attr().recipe_prog0,
            recipe_prog1: res.attr().recipe_prog1,
            recipe_prog2: res.attr().recipe_prog2,
            recipe_prog3: res.attr().recipe_prog3,
            recipe_prog4: res.attr().recipe_prog4,
            operation_num: res.attr().operation_num,
            operation_prog: res.attr().operation_prog,
            last_select_recipe: res.attr().last_select_recipe,
            area_prog: res.attr().area_prog,
            is_complete: res.number("is_complete"),
          }

          DB.Upsert(
            refid,
            {
              collection: "event_1",
              version: version,
              area_id: event_data.area_id
            },
            {
              $set: event_data,
            });
        });
      } else if (version == 29) {
        pcdata.event_play_num += 1;
        pcdata.event_last_select_id = parseInt($(data).attr("event_1").last_select_platform_id);
        pcdata.event_last_select_type = parseInt($(data).attr("event_1").last_select_platform_type);

        let event_data, event_sub_data;
        $(data).element("event_1").elements("watch_data").forEach((res) => {
          if (!(_.isNil(res.element("channel")))) {
            event_data = {
              last_select_channel: res.attr().last_select_channel,
              platform_id: res.attr().platform_id,
              platform_prog: res.attr().platform_prog,
              play_num: res.attr().play_num,
            };

            event_sub_data = {
              platform_id: res.attr().platform_id,
              channel_id: res.attr("channel").channel_id,
              gauge: res.attr("channel").gauge,
              channel_play_num: res.attr("channel").play_num,
              is_complete: res.element("channel").number("is_complete"),
            }
          } else {
            event_data = {
              last_select_channel: res.attr().last_select_channel,
              platform_id: res.attr().platform_id,
              platform_prog: res.attr().platform_prog,
              play_num: res.attr().play_num,
            }

            event_sub_data = {
              platform_id: res.attr().platform_id,
              channel_id: 0,
              gauge: 0,
              channel_play_num: 0,
              is_complete: 0,
            }
          }

          DB.Upsert(refid,
            {
              collection: "event_1",
              version: version,
              platform_id: event_data.platform_id
            },
            {
              $set: event_data,
            }
          );

          DB.Upsert(refid,
            {
              collection: "event_1_sub",
              version: version,
              platform_id: event_sub_data.platform_id,
              channel_id: event_sub_data.channel_id,
            },
            {
              $set: event_sub_data,
            }
          );
        });
      } else if (version == 30) {
        pcdata.event_play_num += 1;
        pcdata.event_last_select_id = parseInt($(data).attr("event_1").last_select_flyer_id);

        let event_data, event_sub_data;
        $(data).element("event_1").elements("flyer_data").forEach((res) => {
          if (!(_.isNil(res.element("genre_data")))) {
            event_data = {
              last_select_genre: res.attr().last_select_genre,
              flyer_id: res.attr().flyer_id,
              flyer_prog: res.attr().flyer_prog,
              play_num: res.attr().play_num,
              skill_param: res.attr().skill_param,
            };

            event_sub_data = {
              flyer_id: res.attr().flyer_id,
              genre_id: res.element("genre_data").attr().genre_id,
              gauge: res.element("genre_data").attr().gauge,
              genre_playnum: res.element("genre_data").attr().play_num,
              is_complete: res.element("genre_data").number("is_complete"),
            }
          } else {
            event_data = {
              last_select_genre: res.attr().last_select_genre,
              flyer_id: res.attr().flyer_id,
              flyer_prog: res.attr().flyer_prog,
              play_num: res.attr().play_num,
              skill_param: res.attr().skill_param,
            };

            event_sub_data = {
              flyer_id: res.attr().flyer_id,
              genre_id: 0,
              gauge: 0,
              genre_playnum: 0,
              is_complete: 0,
            }
          }

          DB.Upsert(refid,
            {
              collection: "event_1",
              version: version,
              flyer_id: event_data.flyer_id
            },
            {
              $set: event_data,
            }
          );

          DB.Upsert(refid,
            {
              collection: "event_1_sub",
              version: version,
              flyer_id: event_sub_data.flyer_id,
              genre_id: event_sub_data.genre_id,
            },
            {
              $set: event_sub_data,
            }
          );
        });
      }
    }

    if (hasWorldTourism) {
      if (version >= 28) {
        $(data).elements("world_tourism_data").forEach((res) => {
          let tourInfo = {
            tour_id: parseInt(res.attr().tour_id),
            progress: parseInt(res.attr().progress),
          }

          DB.Upsert<world_tourism>(
            refid,
            {
              collection: "world_tourism",
              version: version,
              tour_id: tourInfo.tour_id
            },
            {
              $set: {
                progress: tourInfo.progress,
              }
            }
          );
        });
      }
    }

    if (hasMusicMemo) {
      if (version >= 30) {
        $(data).element("music_memo").elements("folder").forEach((res) => {
          DB.Upsert<lightning_musicmemo_new>(
            refid,
            {
              collection: "lightning_musicmemo_new",
              version: version,
              folder_idx: parseInt(res.attr().folder_id),
              play_style: parseInt(res.attr().play_style),
            },
            {
              $set: {
                folder_name: res.attr().name,
                music_ids: res.numbers("music_id"),
              },
            });
        });
      } else if (version >= 27) {
        $(data).element("music_memo").elements("music").forEach((res) => {
          DB.Upsert<lightning_musicmemo>(
            refid,
            {
              collection: "lightning_musicmemo",
              version: version,
              music_idx: parseInt(res.attr().index),
              play_style: parseInt(res.attr().play_style),
            },
            {
              $set: {
                music_id: parseInt(res.attr().music_id),
              },
            });
        });
      }
    }

    if (hasTowerData) {
      profile.total_kbd += parseInt($(data).attr("tower_data").keyboard);
      profile.total_scr += parseInt($(data).attr("tower_data").scratch);
    }
  }

  await DB.Upsert<profile>(
    refid,
    {
      collection: "profile",
    },
    {
      $set: profile
    }
  );

  await DB.Upsert<pcdata>(
    refid,
    {
      collection: "pcdata",
      version: version,
    },
    {
      $set: pcdata
    }
  );

  await DB.Upsert<custom>(
    refid,
    {
      collection: "custom",
      version: version,
    },
    {
      $set: custom
    }
  );

  return send.success();
};

export const pcgetlanegacha: EPR = async (info, data, send) => {
  let tArray = [];
  for (let i = 0; i < 100; i++) {
    let random = _.random(0, 5040);

    tArray.push(
      K.ATTR({
        ticket_id: String(i),
        arrange_id: String(random),
        expire_date: String(4102326000),
      })
    );
  }

  return send.object({
    ticket: tArray,
    settings: K.ATTR({
      sp: String(-1),
      dp_left: String(-1),
      dp_right: String(-1),
    }),
    free: K.ATTR({
      num: String(10),
    }),
    info: K.ATTR({
      last_page: String(0),
    }),
  });
};

export const pcshopregister: EPR = async (info, data, send) => {
  let refid = IDtoRef(parseInt($(data).str("iidx_id")));
  let lid = $(data).str("location_id");

  // TODO //

  return send.success();
};

export const pcdrawlanegacha: EPR = async (info, data, send) => {
  let drawNum = parseInt($(data).attr().draw_num);
  let tArray = [];

  for (let i = 0; i < drawNum; i++) {
    let random = _.random(0, 5040);

    tArray.push(
      K.ATTR({
        ticket_id: String(i),
        arrange_id: String(random),
        expire_date: String(4102326000),
      })
    );
  }

  return send.object({
    ticket: tArray,
    session: K.ATTR({
      session_id: String(0),
    }),
  });
};
