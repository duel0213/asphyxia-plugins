import { pcdata, KDZ_pcdata, IIDX27_pcdata, IIDX28_pcdata, IIDX29_pcdata, IIDX30_pcdata, JDZ_pcdata } from "../models/pcdata";
import { grade } from "../models/grade";
import { custom, default_custom } from "../models/custom";
import { IDtoCode, IDtoRef, Base64toBuffer, GetVersion, ReftoProfile, ReftoPcdata, ReftoQPRO, appendSettingConverter } from "../util";
import { eisei_grade, eisei_grade_data, lightning_musicmemo, lightning_musicmemo_new, lightning_playdata, lightning_settings, lm_playdata, lm_settings, lm_settings_new, musicmemo_data, musicmemo_data_new } from "../models/lightning";
import { profile, default_profile } from "../models/profile";
import { rival, rival_data } from "../models/rival";
import { world_tourism } from "../models/worldtourism";

export const pccommon: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  if (version == 18) {
    return send.object({
      "@attr": {
        expire: 600,
      },
      ir: K.ATTR({
        beat: String(U.GetConfig("BeatPhase")),
      }),
      cmd: K.ATTR({
        gmbl: "1",
        gmbla: "1",
        regl: "1",
        rndp: "1",
        hrnd: "1",
        alls: "1",
      }),
      lg: K.ATTR({
        lea: "0",
      }),
      lf: K.ATTR({
        life: "0",
      }),
      ev: K.ATTR({
        pha: "3",
      }),
      lincle: K.ATTR({
        phase: "1",
      })
    });
  }
  else if (version == 19) {
    return send.object({
      "@attr": {
        expire: 600,
      },
      ir: K.ATTR({
        beat: String(U.GetConfig("BeatPhase")),
      }),
      lincle: K.ATTR({
        phase: String(2),
      }),
      boss: K.ATTR({
        phase: String(2),
      }),
      mr_secret: K.ATTR({
        flg: String(-1),
      }),
      travel: K.ATTR({
        flg: String(-1),
      }),
    });
  }
  else if (version >= 27) {
    return send.pugFile(`pug/LDJ/${version}pccommon.pug`, {
      beat: U.GetConfig("BeatPhase"),
    });
  }
  else {
    return send.deny();
  }
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
    case 18:
      pcdata = JDZ_pcdata;
      break;
    case 19:
      pcdata = KDZ_pcdata;
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
      let qprodata = await ReftoQPRO(rivals[a].rival_refid);

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

  let event, event_1, event_1s, evtArray = [], evtArray2 = [];
  if (version == 18) {
    event = await DB.FindOne(refid, { collection: "event_1", version: version });

    if (!_.isNil(event)) {
      event.cf = Base64toBuffer(event.cf);
      event.pf = Base64toBuffer(event.pf);
      event.mf = Base64toBuffer(event.mf);
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
      event.cf = Base64toBuffer(event.cf);
      event.qcf = Base64toBuffer(event.qcf);
      event.piece = Base64toBuffer(event.piece);
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
  } else if (version >= 27) {
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

    if (lm_music_memo_new.length > 0 && version >= 30) {
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
    } else if (lm_music_memo.length > 0 && version >= 27) {
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

    /* TODO:: figure out how badges works
       [save] - elements are below but get checks for id 0~12
       today_recommend (flg)
       weekly_ranking (flg)
       visitor (flg_id, flg)
       notes_radar (flg_id, flg) [2]
       world_tourism (flg)
       event1 (flg_id, flg) [10]
       arena (flg_id, flg) [2]
       iidx_exam (flg)
    */

    /* [get]
       category_id - up to 12
       badge_flg_id
        - This can be up to 23
          - category_id: 0, 1 -> 23
          - category_id: 9 -> 9
          - category_id: 7, 10 -> 2
       badge_flg
    */
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
      wArray,
      bArray,
    });
  } else {
    return send.deny();
  }
};

// TODO:: migration (oldget/getname/takeover) //
export const pcoldget: EPR = async (info, data, send) => {
  const version = GetVersion(info) - 1;
  const refid = $(data).attr().rid;
  const pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata", version: version });

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
    case 18:
      pcdata = JDZ_pcdata;
      break;
    case 19:
      pcdata = KDZ_pcdata;
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
      anum: "0",
      snum: "0",
      pnum: "0",
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

  if (version == 18) {
    if (cltype == 0) {
      pcdata.sach = parseInt($(data).attr().achi);
      pcdata.sp_opt = parseInt($(data).attr().opt);
    } else {
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

      DB.Upsert(refid,
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
    } else {
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

      DB.Upsert(refid,
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
  else if (version >= 27) {
    // lid bookkeep cid ctype ccode
    pcdata.rtype = parseInt($(data).attr().d_sdtype);
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

export const pcconsumelanegacha: EPR = async (info, data, send) => {
  return send.success();
};
