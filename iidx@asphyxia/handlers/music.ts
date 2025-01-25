import { IDtoRef, Base64toNumArray, GetVersion, OldMidToNewMid, NewMidToOldMid, ReftoProfile, ReftoPcdata, ClidToPlaySide, ReftoQPRO, NumArrayToString, OldMidToVerMid, HextoBase64, NumArraytoBase64, NumArraytoHex } from "../util";
import { score, score_top } from "../models/score";
import { profile } from "../models/profile";
import { shop_data } from "../models/shop";
import { tutorial } from "../models/tutorial";
import { badge } from "../models/badge";

export const musicgetrank: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));
  const cltype = parseInt($(data).attr().cltype); // 0 -> SP, 1 -> DP //
  const music_data: any = (
    await DB.Find(refid, {
      collection: "score",
    })
  );

  const rival_refids = [
    [parseInt($(data).attr().iidxid0), await IDtoRef(parseInt($(data).attr().iidxid0))],
    [parseInt($(data).attr().iidxid1), await IDtoRef(parseInt($(data).attr().iidxid1))],
    [parseInt($(data).attr().iidxid2), await IDtoRef(parseInt($(data).attr().iidxid2))],
    [parseInt($(data).attr().iidxid3), await IDtoRef(parseInt($(data).attr().iidxid3))],
    [parseInt($(data).attr().iidxid4), await IDtoRef(parseInt($(data).attr().iidxid4))],
  ];

  let m = [], top = [], b = [], t = [];
  let score_data: number[];
  let indices, temp_mid = 0;
  if (version == 14 || version == 15) {
    let result = {
      r: [], // v - (-1, beginner/-2, tutorial) //
    };
    indices = cltype === 0 ? [1, 2, 3] : [6, 7, 8];
    music_data.forEach((res: score) => {
      temp_mid = NewMidToOldMid(res.mid);
      let verMid = OldMidToVerMid(temp_mid);

      // TODO:: determine whether use rid,dj_level from music.reg or make a database that has max exscore of all songs for rid //
      if (verMid[0] > version) return;
      for (let a = 0; a < 3; a++) {
        if (res.esArray[indices[a]] == 0) continue;
        let rank_id = _.isNil(res.rArray) ? -1 : res.rArray[indices[a]];

        result.r.push(
          K.ITEM("str", NumArrayToString(
            [7, 4, 13, 3, 3],
            [verMid[1], a, res.esArray[indices[a]], rank_id, res.cArray[indices[a]]] // 4th element is rid (rank_id) //
          ), { v: String(verMid[0]) } )
        );
      }

      // BEGINNER //
      if (res.cArray[0] == 0) return;
      result.r.push(
        K.ITEM("str", NumArrayToString(
          [12, 6],
          [temp_mid, res.cArray[0]]
        ), { v: String("-1") })
      );
    });

    // TUTORIAL //
    const tutorial = await DB.Find<tutorial>(refid, {
      collection: "tutorial",
      version: version
    });
    tutorial.sort((a: tutorial, b: tutorial) => a.tid - b.tid);
    tutorial.forEach((res) => {
      result.r.push(
        K.ITEM("str", NumArrayToString(
          [5, 1],
          [res.tid, res.clr]
        ), { v: String("-2") })
      );
    });

    return send.object(result);
  }
  else if (version < 20) {
    indices = cltype === 0 ? [1, 2, 3] : [6, 7, 8];
    music_data.forEach((res: score) => {
      temp_mid = NewMidToOldMid(res.mid);
      let mVersion = Math.floor(temp_mid / 100);
      if (mVersion > version) return;

      if (version == 16) score_data = [-1, temp_mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i])];
      else score_data = [-1, temp_mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i]), ...indices.map(i => res.mArray[i])];

      m.push(K.ARRAY("s16", score_data));
      if (res.cArray[0] != 0) b.push(K.ARRAY("u16", [temp_mid, res.cArray[0]]));
    });

    for (let i = 0; i < rival_refids.length; i++) {
      if (_.isNaN(rival_refids[i][0])) continue;

      const rival_score = await DB.Find<score>(String(rival_refids[i][1]),
        { collection: "score", }
      );

      rival_score.forEach((res: score) => {
        temp_mid = NewMidToOldMid(res.mid);
        let mVersion = Math.floor(temp_mid / 100);
        if (mVersion > version) return;

        if (version == 16) score_data = [i, temp_mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i])];
        else score_data = [i, temp_mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i]), ...indices.map(i => res.mArray[i])];

        m.push(K.ARRAY("s16", score_data));
      });
    }

    // tutorial //
    const tutorial = await DB.Find<tutorial>(refid, {
      collection: "tutorial",
      version: version
    });
    tutorial.sort((a: tutorial, b: tutorial) => a.tid - b.tid);
    tutorial.forEach((res) => {
      t.push(K.ARRAY("u16", [res.tid, res.clr]));
    });
  }
  else if (version >= 20) {
    if (version >= 27) indices = cltype === 0 ? [0, 1, 2, 3, 4] : [5, 6, 7, 8, 9];
    else indices = cltype === 0 ? [1, 2, 3] : [6, 7, 8];

    music_data.forEach((res: score) => {
      let mVersion = Math.floor(res.mid / 1000);
      if (mVersion > version) return;

      score_data = [-1, res.mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i]), ...indices.map(i => res.mArray[i])];

      m.push(K.ARRAY("s16", score_data));
      if (res.cArray[0] != 0) b.push(K.ARRAY("u16", [res.mid, res.cArray[0]]));
    });

    for (let i = 0; i < rival_refids.length; i++) {
      if (_.isNaN(rival_refids[i][0])) continue;

      const rival_score = await DB.Find<score>(String(rival_refids[i][1]),
        { collection: "score", }
      );

      rival_score.forEach((res: score) => { // rival score //
        let mVersion = Math.floor(res.mid / 1000);
        if (mVersion > version) return;

        score_data = [i, res.mid, ...indices.map(i => res.cArray[i]), ...indices.map(i => res.esArray[i]), ...indices.map(i => res.mArray[i])];

        m.push(K.ARRAY("s16", score_data));
      });
    }

    const score_top = await DB.Find<score_top>({
      collection: "score_top",
      play_style: cltype,
    });

    if (score_top.length > 0) {
      if (version >= 27) {
        score_top.forEach((res) => {
          let mVersion = Math.floor(res.mid / 1000);
          if (mVersion > version) return;

          top.push({
            "@attr": ({
              name0: res.names[0],
              name1: res.names[1],
              name2: res.names[2],
              name3: res.names[3],
              name4: res.names[4],
            }),
            detail: K.ARRAY("s16", [res.mid, ...res.clflgs, ...res.scores])
          });
        });
      } else {
        score_top.forEach((res) => {
          let mVersion = Math.floor(res.mid / 1000);
          if (mVersion > version) return;

          top.push({
            "@attr": ({
              name0: res.names[1],
              name1: res.names[2],
              name2: res.names[3],
            }),
            detail: K.ARRAY("s16", [res.mid, ...indices.map(i => res.clflgs[i]), ...indices.map(i => res.scores[i])])
          });
        });
      }
    }

    return send.object({
      style: K.ATTR({type: String(cltype)}),
      m,
      b,
      top,
    });
  }
  else {
    return send.success();
  }

  return send.object({
    m,
    b,
    t
  });
}

export const musicgetralive: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));
  const cltype = parseInt($(data).attr().cltype); // 0 -> SP, 1 -> DP //
  const music_data: any = (
    await DB.Find(refid, {
      collection: "score",
    })
  );
  const rival_refids = [
    [parseInt($(data).attr().iidxid0), await IDtoRef(parseInt($(data).attr().iidxid0))],
    [parseInt($(data).attr().iidxid1), await IDtoRef(parseInt($(data).attr().iidxid1))],
    [parseInt($(data).attr().iidxid2), await IDtoRef(parseInt($(data).attr().iidxid2))],
    [parseInt($(data).attr().iidxid3), await IDtoRef(parseInt($(data).attr().iidxid3))],
    [parseInt($(data).attr().iidxid4), await IDtoRef(parseInt($(data).attr().iidxid4))],
  ];

  let result = {
    d: []
  };
  let myRecord: Record<number, number[]> = {};
  let rRecord: Record<number, string> = {};
  let indices = cltype === 0 ? [1, 2, 3] : [6, 7, 8];

  music_data.forEach((res: score) => {
    myRecord[NewMidToOldMid(res.mid)] = [...res.esArray, ...res.cArray];
  });

  for (let i = 0; i < rival_refids.length; i++) {
    if (_.isNaN(rival_refids[i][0])) continue;

    const rival_score = await DB.Find<score>(String(rival_refids[i][1]),
      { collection: "score", }
    );

    // [0~2] - NOPLAY/WIN/LOSE (ANOTHER/HYPER/NORMAL), //
    // consider same score as LOSE, tho theres seems DRAW state but game render as LOSE //
    // TODO:: figure out what other elements does //
    rival_score.forEach((res: score) => {
      let mid = NewMidToOldMid(res.mid);
      let verMid = OldMidToVerMid(mid);
      if (verMid[0] > version) return;

      let scoreArray = Array<number>(15).fill(0);
      if (!_.isNil(myRecord[mid])) {
        for (let a = 0; a < 3; a++) {
          let myExscore = myRecord[mid][indices[a]];
          let rvExscore = res.esArray[indices[a]];
          let mycFlg = myRecord[mid][indices[a] + 10];
          let rvcFlg = res.cArray[indices[a]];

          if (mycFlg == 0 || rvcFlg == 0) continue;
          scoreArray[2 - a] = myExscore > rvExscore ? 1 : 2;
        }
      }

      let strResult = NumArrayToString([6], [verMid[1]]);
      strResult += NumArrayToString(Array<number>(15).fill(2), scoreArray);

      if (verMid[0] in rRecord) {
        rRecord[verMid[0]] += strResult;
      } else {
        rRecord[verMid[0]] = strResult;
      }
    });
  }

  for (const key in rRecord) {
    result.d.push(
      K.ITEM("str", rRecord[key], { v: key })
    );
  }

  return send.object(result);
}

export const musicappoint: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  // clid, ctype, grd, iidxid, lv, mid, subtype //
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));
  const ctype = parseInt($(data).attr().ctype);
  const subtype = parseInt($(data).attr().subtype);
  let mid = parseInt($(data).attr().mid);
  let clid = parseInt($(data).attr().clid);
  
  const mapping = [1, 2, 3, 6, 7, 8];
  if (version < 20) {
    mid = OldMidToNewMid(mid);
    clid = mapping[clid];
  }
  else if (version < 27) {
    clid = mapping[clid];
  }

  let result: any = {};

  // MINE //
  const music_data: score | null = await DB.FindOne<score>(refid, {
    collection: "score",
    mid: mid,
    [clid]: { $exists: true },
  });

  let mydata, option = 0, option2 = 0;
  if (!_.isNil(music_data)) {
    if (version >= 27) {
      if (!_.isNil(music_data.optArray) && version > 27) {
        option = music_data.optArray[clid];
        option2 = music_data.opt2Array[clid];
      }
    }

    if (version < 16) mydata = K.ITEM("str", NumArraytoHex(Base64toNumArray(music_data[clid])));
    else mydata = K.ITEM("bin", Base64toNumArray(music_data[clid]));
  }

  /*** ctype
    [-1] - DEFAULT
     [1] - RIVAL
     [2] - ALL TOP
     [3] - ALL AVG.
     [4] - LOCATION TOP
     [5] - LOCATION AVG.
     [6] - SAME DAN TOP
     [7] - SAME DAN AVG.
     [8] - RIVAL TOP
     [9] - RIVAL AVG.
     [10] - STORE TOP
     [13] - RIVAL NEXT
     [14] - STORE ROTATE
     [15] - RIVAL ROTATE
   ***/

  // OTHERS //
  let other_refid, other_musicdata: score | null, other_pcdata, other_profile, sdata = null;
  if (!_.isNaN(subtype)) {
    switch (ctype) {
      case 1:
        other_refid = await IDtoRef(subtype);
        other_profile = await ReftoProfile(other_refid);
        other_pcdata = await ReftoPcdata(other_refid, version);
        other_musicdata = await DB.FindOne<score>(other_refid, {
          collection: "score",
          mid: mid,
          [clid]: { $exists: true },
        });
        if (_.isNaN(other_pcdata) || _.isNil(other_musicdata)) break;

        if (version < 16) {
          sdata = K.ITEM("str", NumArraytoHex(Base64toNumArray(other_musicdata[clid])), {
            score: String(other_musicdata.esArray[clid]),
            pid: String(other_profile[1]),
            name: String(other_profile[0]),
            riidxid: String(other_profile[2])
          });
        }
        else {
          sdata = K.ITEM("bin", Base64toNumArray(other_musicdata[clid]), {
            score: String(other_musicdata.esArray[clid]),
            pid: String(other_profile[1]),
            name: String(other_profile[0]),
            riidxid: String(other_profile[2])
          });
        }
        
        break;

      default:
        break;
    }
  }

  if (_.isNil(mydata) && _.isNil(sdata)) return send.success();

  if (version >= 27) {
    let my_gauge_data = null;
    if (!_.isNil(music_data)) my_gauge_data = Base64toNumArray(music_data[clid + 10]);

    if (!_.isNil(sdata)) {
      if (_.isNil(other_musicdata.optArray)) { // migration //
        other_musicdata.optArray = Array<number>(10).fill(0);
        other_musicdata.opt2Array = Array<number>(10).fill(0);
      }

      let other_data = K.ITEM("bin", Base64toNumArray(other_musicdata[clid]), {
        score: String(other_musicdata.esArray[clid]),
        achieve: String(other_pcdata[ClidToPlaySide(clid) + 2]),
        pid: String(other_profile[1]),
        name: String(other_profile[0]),
        riidxid: String(other_profile[2]),
        option: String(other_musicdata.optArray[clid]), // CastHour //
        option2: String(other_musicdata.opt2Array[clid]),
      });

      sdata = {
        ...other_data,
        gauge_data: K.ITEM("bin", Base64toNumArray(other_musicdata[clid + 10]))
      };
    }

    if (_.isNil(sdata) && !_.isNil(mydata)) {
      result = {
        "@attr": { my_option: option, my_option2: option2 },
        mydata,
        my_gauge_data: K.ITEM("bin", my_gauge_data),
      };
    }
    if (_.isNil(mydata) && !_.isNil(sdata)) result = { sdata };
    if (!_.isNil(mydata) && !_.isNil(sdata)) {
      result = {
        "@attr": { my_option: option, my_option2: option2 }, // CastHour //
        mydata,
        my_gauge_data: K.ITEM("bin", my_gauge_data),
        sdata,
      };
    }
  }
  else {
    if (_.isNil(sdata) && !_.isNil(mydata)) result = { mydata };
    if (_.isNil(mydata) && !_.isNil(sdata)) result = { sdata };
    if (!_.isNil(mydata) && !_.isNil(sdata)) result = { mydata, sdata };
  }

  return send.object(result);
}

export const musicreg: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));

  const shop_data = await DB.FindOne<shop_data>({
    collection: "shop_data",
  });
  const profile = await DB.FindOne<profile>(refid, {
    collection: "profile",
  });

  // wid, oppid, opname, opt, opt2, pside, nocnt, anum //
  const pgnum = parseInt($(data).attr().pgnum);
  const gnum = parseInt($(data).attr().gnum);
  const mnum = parseInt($(data).attr().mnum);
  const cflg = parseInt($(data).attr().cflg);
  let mid = parseInt($(data).attr().mid);
  let clid = parseInt($(data).attr().clid);
  let exscore = (pgnum * 2 + gnum);
  let ghost = null, ghost_gauge = null; // Heroic Verse //
  let style = 0, option = 0, option_2 = 0, rid = -1;

  // TODO:: Leggendaria until HEROIC VERSE has seperate music_id //
  // TODO:: SUPER FUTURE 2323 has seperate music_id //
  const mapping = [1, 2, 3, 6, 7, 8];
  if (version == -1) return send.deny();
  else if (version < 20) {
    mid = OldMidToNewMid(mid);
    if (mid == -1) return send.deny();

    clid = mapping[clid];
  }
  else if (version < 27) {
    clid = mapping[clid];
  }

  const music_data: score | null = await DB.FindOne<score>(refid, {
    collection: "score",
    mid: mid,
  });

  // SPN -> DPA [0~5] -> LINCLE //
  // SPB -> DPL [0~9] -> Heroic Verse //
  let pgArray = Array<number>(10).fill(0); // PGREAT //
  let gArray = Array<number>(10).fill(0); // GREAT //
  let mArray = Array<number>(10).fill(-1); // MISS //
  let cArray = Array<number>(10).fill(0); // CLEAR FLAGS //
  let rArray = Array<number>(10).fill(-1); // RANK ID //
  let esArray = Array<number>(10).fill(0); // EXSCORE //
  let optArray = Array<number>(10).fill(0); // USED OPTION (CastHour) //
  let opt2Array = Array<number>(10).fill(0); // USED OPTION (CastHour) //
  let update = 0;

  if (!_.isNil($(data).attr().rid)) rid = parseInt($(data).attr().rid);
  else if (!_.isNil($(data).attr().dj_level)) rid = parseInt($(data).attr().dj_level);
  if (rid > -1) console.log(`[music.reg] rank_id : ${rid}`);

  if (version == 14 || version == 15) ghost = HextoBase64($(data).str("ghost"));
  else ghost = NumArraytoBase64($(data).buffer("ghost"));
  
  if (version >= 27) {
    ghost_gauge = NumArraytoBase64($(data).buffer("ghost_gauge"));
    style = parseInt($(data).element("music_play_log").attr().play_style);

    if (version >= 29) {
      option = parseInt($(data).element("music_play_log").attr().option1);
      option_2 = parseInt($(data).element("music_play_log").attr().option2);
    }
  }

  if (_.isNil(music_data)) {
    pgArray[clid] = pgnum;
    gArray[clid] = gnum;
    mArray[clid] = mnum;
    cArray[clid] = cflg;
    rArray[clid] = rid;
    esArray[clid] = exscore;
    optArray[clid] = option;
    opt2Array[clid] = option_2;
  } else {
    pgArray = music_data.pgArray;
    gArray = music_data.gArray;
    mArray = music_data.mArray;
    cArray = music_data.cArray;
    esArray = music_data.esArray;
    if (!_.isNil(music_data.optArray)) { // migration //
      optArray = music_data.optArray;
      opt2Array = music_data.opt2Array;
    }
    if (!_.isNil(music_data.rArray)) {
      rArray = music_data.rArray;
    }

    const pExscore = esArray[clid];
    if (exscore > pExscore) {
      pgArray[clid] = pgnum;
      gArray[clid] = gnum;
      rArray[clid] = rid;
      esArray[clid] = exscore;
      optArray[clid] = option;
      opt2Array[clid] = option_2;
      update = 1;
    } else {
      ghost = music_data[clid];
      if (version >= 27) ghost_gauge = music_data[clid + 10];
    }

    if (mnum != -1) mArray[clid] = mArray[clid] == -1 ? mnum : Math.min(mArray[clid], mnum);
    cArray[clid] = Math.max(cArray[clid], cflg);
  }

  // migration for invalid miss count //
  // if EXSCORE/MISS COUNT is 0 and CLEAR FLAG is NO PLAY then set MISS COUNT to -1 //
  for (let a = 0; a < mArray.length; a++) {
    if (esArray[a] == 0 && cArray[a] == 0 && mArray[a] == 0) mArray[a] = -1;
  }

  if (version >= 27) { // TODO:: support old version //
    const score_top: score_top | null = await DB.FindOne<score_top>(null, {
      collection: "score_top",
      play_style: style,
      mid: mid,
    });

    let names = Array<string>(5).fill("");
    let scores = Array<number>(5).fill(-1);
    let clflgs = Array<number>(5).fill(-1);
    let tmp_clid = clid;
    if (style == 1) tmp_clid -= 5;

    if (_.isNil(score_top)) {
      if (esArray[clid] > exscore) {
        names[tmp_clid] = profile.name;
        scores[tmp_clid] = esArray[clid];
        clflgs[tmp_clid] = cArray[clid];
      } else {
        names[tmp_clid] = profile.name;
        scores[tmp_clid] = exscore;
        clflgs[tmp_clid] = cflg;
      }
    }
    else {
      names = score_top.names;
      scores = score_top.scores;
      clflgs = score_top.clflgs;

      if (exscore > scores[tmp_clid]) {
        names[tmp_clid] = profile.name;
        scores[tmp_clid] = exscore;
        clflgs[tmp_clid] = cflg;
      }
    }

    await DB.Upsert<score_top>(
      {
        collection: "score_top",
        play_style: style,
        mid: mid,
      },
      {
        $set: {
          names,
          scores,
          clflgs,
        }
      }
    );
  }

  await DB.Upsert<score>(
    refid,
    {
      collection: "score",
      mid: mid,
    },
    {
      $set: {
        pgArray,
        gArray,
        mArray,
        cArray,
        rArray,
        esArray,
        optArray,
        opt2Array,

        [clid]: ghost,
        [clid + 10]: ghost_gauge,
      }
    }
  );

  if (!_.isNil($(data).element("badge"))) {
    if (!_.isNil($(data).attr("badge").djLevel_badge_flg_id)) {
      await DB.Upsert<badge>(
        refid,
        {
          collection: "badge",
          version: version,
          category_name: "djLevel",
          flg_id: parseInt($(data).attr("badge").djLevel_badge_flg_id),
        },
        {
          $set: {
            flg: parseInt($(data).attr("badge").djLevel_badge_flg),
          }
        }
      );
    }

    if (!_.isNil($(data).attr("badge").clear_badge_flg_id)) {
      await DB.Upsert<badge>(
        refid,
        {
          collection: "badge",
          version: version,
          category_name: "clear",
          flg_id: parseInt($(data).attr("badge").clear_badge_flg_id),
        },
        {
          $set: {
            flg: parseInt($(data).attr("badge").clear_badge_flg),
          }
        }
      );
    }

    if (!_.isNil($(data).attr("badge").rivalChallenge_badge_flg)) {
      await DB.Upsert<badge>(
        refid,
        {
          collection: "badge",
          version: version,
          category_name: "rivalChallenge",
          flg_id: 0,
        },
        {
          $set: {
            flg: parseInt($(data).attr("badge").rivalChallenge_badge_flg),
          }
        }
      );
    }
  }

  let shop_rank = -1, shop_rank_data = [];
  let scores: any[][];
  scores = (
    await DB.Find(null, {
      collection: "score",
      mid: mid,
      cArray: { $exists: true },
      esArray: { $exists: true },
    })
  ).map((r) => [r.esArray[clid], r.cArray[clid], r.__refid]);
  scores.sort((a, b) => b[0] - a[0]);
  shop_rank = scores.findIndex((a) => a[2] == refid);

  scores = await Promise.all(
    scores.map(async (r) => [
      r[0],
      r[1],
      await ReftoProfile(r[2]),
      await ReftoQPRO(r[2], version),
      await ReftoPcdata(r[2], version),
    ])
  );

  let crate = 0, frate = 0, cflgs = 0, fcflgs = 0;
  scores.forEach((rankscore, index) => {
    if (rankscore[1] != 1) cflgs += 1;
    if (rankscore[1] == 7) fcflgs += 1;

    if (index == shop_rank) {
      shop_rank_data.push(
        K.ATTR({
          iidx_id: String(rankscore[2][2]),
          name: String(rankscore[2][0]),
          opname: shop_data.opname,
          rnum: String(index + 1),
          score: String(rankscore[0]),
          clflg: String(rankscore[1]),
          pid: String(rankscore[2][1]),
          sgrade: String(rankscore[4][0]),
          dgrade: String(rankscore[4][1]),
          head: String(rankscore[3][1]),
          hair: String(rankscore[3][0]),
          face: String(rankscore[3][2]),
          body: String(rankscore[3][3]),
          hand: String(rankscore[3][4]),
          myFlg: String(1),
          s_baron: String(0),
          p_baron: String(0),
          achieve: String(0),
          update: String(update),
        })
      );
    }
    else if (rankscore[0] != 0 || rankscore[1] != 0) {
      shop_rank_data.push(
        K.ATTR({
          iidx_id: String(rankscore[2][2]),
          name: String(rankscore[2][0]),
          opname: shop_data.opname,
          rnum: String(index + 1),
          score: String(rankscore[0]),
          clflg: String(rankscore[1]),
          pid: String(rankscore[2][1]),
          sgrade: String(rankscore[4][0]),
          dgrade: String(rankscore[4][1]),
          head: String(rankscore[3][1]),
          hair: String(rankscore[3][0]),
          face: String(rankscore[3][2]),
          body: String(rankscore[3][3]),
          hand: String(rankscore[3][4]),
          myFlg: String(0),
          s_baron: String(0),
          p_baron: String(0),
          achieve: String(0),
          update: String(0),
        })
      );
    }
  });

  if (version > 23) {
    crate = Math.round((cflgs / shop_rank_data.length) * 1000);
    frate = Math.round((fcflgs / shop_rank_data.length) * 1000);
  }
  else {
    crate = Math.round((cflgs / shop_rank_data.length) * 100);
    frate = Math.round((fcflgs / shop_rank_data.length) * 100);
  }

  let result: any = {
    "@attr": {
      mid: String(mid),
      clid: String(clid),
      crate: String(crate),
      frate: String(frate),
      rankside: String(style),
    },
    ranklist: {
      "@attr": { total_user_num: String(shop_rank_data.length) },
      data: shop_rank_data,
    },
    shopdata: K.ATTR({ rank: String(shop_rank) }),
  }

  return send.object(result);
}

export const musicbreg: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  // mid pgnum gnum cflg //
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));
  const pgnum = parseInt($(data).attr().pgnum);
  const gnum = parseInt($(data).attr().gnum);
  const cflg = parseInt($(data).attr().cflg);
  let mid = parseInt($(data).attr().mid);
  let clid = 0; // SP BEGINNER //
  let exscore = (pgnum * 2 + gnum);

  if (version < 20) mid = OldMidToNewMid(mid);

  const music_data: score | null = await DB.FindOne<score>(refid, {
    collection: "score",
    mid: mid,
  });

  let pgArray = Array<number>(10).fill(0); // PGREAT //
  let gArray = Array<number>(10).fill(0); // GREAT //
  let mArray = Array<number>(10).fill(-1); // MISS //
  let cArray = Array<number>(10).fill(0); // CLEAR FLAGS //
  let rArray = Array<number>(10).fill(-1); // RANK ID //
  let esArray = Array<number>(10).fill(0); // EXSCORE //
  let optArray = Array<number>(10).fill(0); // USED OPTION (CastHour) //
  let opt2Array = Array<number>(10).fill(0); // USED OPTION (CastHour) //

  if (_.isNil(music_data)) {
    pgArray[clid] = pgnum;
    gArray[clid] = gnum;
    mArray[clid] = -1; // this is not being sent //
    cArray[clid] = cflg;
    rArray[clid] = -1; // this is not being sent //
    esArray[clid] = exscore;
    optArray[clid] = 0; // this is not being sent //
    opt2Array[clid] = 0; // this is not being sent //
  } else {
    pgArray = music_data.pgArray;
    gArray = music_data.gArray;
    mArray = music_data.mArray;
    cArray = music_data.cArray;
    esArray = music_data.esArray;
    if (!_.isNil(music_data.optArray)) { // migration //
      optArray = music_data.optArray;
      opt2Array = music_data.opt2Array;
    }
    if (!_.isNil(music_data.rArray)) {
      rArray = music_data.rArray;
    }

    const pExscore = esArray[clid];
    if (exscore > pExscore) {
      pgArray[clid] = Math.max(pgArray[clid], pgnum);
      gArray[clid] = Math.max(gArray[clid], gnum);
      esArray[clid] = Math.max(esArray[clid], exscore);
    }

    cArray[clid] = Math.max(cArray[clid], cflg);
  }

  await DB.Upsert<score>(
    refid,
    {
      collection: "score",
      mid: mid,
    },
    {
      $set: {
        pgArray,
        gArray,
        mArray,
        cArray,
        rArray,
        esArray,
        optArray,
        opt2Array,

        [clid]: null,
        [clid + 10]: null,
      }
    }
  );

  return send.success();
};

export const musiccrate: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const scores = await DB.Find<score>(null, {
    collection: "score",
  });
  const cltype = parseInt($(data).attr().cltype);

  let cFlgs: Record<number, number[]> = {},
    fcFlgs: Record<number, number[]> = {},
    totalFlgs: Record<number, number[]> = {};

  scores.forEach((res) => {
    let mVersion = Math.floor(res.mid / 1000);
    if (mVersion > version) return;

    let totalArray = Array<number>(10).fill(0);
    let cFlgArray = Array<number>(10).fill(0);
    let fcFlgArray = Array<number>(10).fill(0);

    for (let a = 0; a < 10; a++) {
      if (res.cArray[a] != 0) totalArray[a] += 1;
      if (res.cArray[a] != 1) cFlgArray[a] += 1;
      if (res.cArray[a] == 7) fcFlgArray[a] += 1;
    }

    let temp_mid = version < 20 ? NewMidToOldMid(res.mid) : res.mid;
    totalFlgs[temp_mid] = totalArray;
    cFlgs[temp_mid] = cFlgArray;
    fcFlgs[temp_mid] = fcFlgArray;
  });

  let result = {}, c = [], cdata = [];
  for (const key in totalFlgs) {
    let cRate = Array<number>(10).fill(0);
    let fcRate = Array<number>(10).fill(0);

    for (let a = 0; a < 10; a++) {
      if (totalFlgs[key][a] == 0) continue;

      if (version > 23) {
        cRate[a] = Math.round((cFlgs[key][a] / totalFlgs[key][a]) * 1000);
        fcRate[a] = Math.round((fcFlgs[key][a] / totalFlgs[key][a]) * 1000);
      } else {
        cRate[a] = Math.round((cFlgs[key][a] / totalFlgs[key][a]) * 100);
        fcRate[a] = Math.round((fcFlgs[key][a] / totalFlgs[key][a]) * 100);
      }
    }

    let indices = [1, 2, 3, 6, 7, 8];
    if (version == 14 || version == 15) {
      let verMid = OldMidToVerMid(parseInt(key));

      let str = cltype == 0 ?
        `${NumArrayToString([7, 7, 7, 7], [verMid[1], cRate[1], cRate[2], cRate[3]])}ZZZZ`:
        `${NumArrayToString([7, 7, 7, 7], [verMid[1], cRate[6], cRate[7], cRate[8]])}ZZZZ`;

      cdata.push(
        K.ITEM("str", str, { ver: String(verMid[0]) })
      );
    }
    else if (version < 27) {
      c.push(
        K.ARRAY("u8", [...indices.map(i => cRate[i]), ...indices.map(i => fcRate[i])], { mid: key }),
      );
    }
    else {
      c.push(
        K.ARRAY("s32", [...cRate, ...fcRate], { mid: key }),
      );
    }
  }

  if (version == 14 || version == 15) result = { cdata };
  else result = { c };

  return send.object(result);
}

// this is not valid response //
export const musicarenacpu: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  if (version == -1) return send.deny();

  let cpu_score_list = [], total_notes = [];
  $(data).elements("music_list").forEach((res) => {
    total_notes.push(res.number("total_notes"));
  });

  for (let a = 0; a < $(data).elements("cpu_list").length; a++) {
    let score_list = [];

    total_notes.forEach((res) => {
      score_list.push({
        score: K.ITEM("s32", _.random(res, res * 2)),
        ghost: version > 30 ? K.ITEM("s8", 0) : K.ITEM("u8", 0),
        enable_score: K.ITEM("bool", 1),
        enable_ghost: K.ITEM("bool", 0),
      });
    })

    cpu_score_list.push({
      index: K.ITEM("s32", a),
      score_list,
    });
  }

  return send.object({
    cpu_score_list,
  })
}
