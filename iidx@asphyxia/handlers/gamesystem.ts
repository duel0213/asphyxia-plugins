import { IIDX_CPUS } from "../models/arena";
import { GetVersion } from "../util";

export const gssysteminfo: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  if (version < 24) return send.success();

  let result: any = {
    arena_schedule: {
      phase: K.ITEM("u8", U.GetConfig("ArenaPhase")),
      start: K.ITEM("u32", 1605784800),
      end: K.ITEM("u32", 4102326000)
    },
    arena_music_difficult: [],
    maching_class_range: [],
    arena_cpu_define: [],
  }

  // following datas are made up needs to figure out correct way to do it //
  let music_open = JSON.parse(await IO.ReadFile("data/music_open.json"));
  if (!_.isNil(music_open[version])) {
    result = {
      ...result,
      music_open: [],
    }

    Object.keys(music_open).forEach(v => {
      Object.keys(music_open[v]).forEach(m => {
        if (parseInt(v) > version) return;

        result.music_open.push({
          music_id: K.ITEM("s32", parseInt(m)),
          kind: K.ITEM("s32", music_open[v][m].kind),
        });
      });
    });
  }

  if (version >= 31) {
    result.arena_schedule = {
      ...result.arena_schedule,
      rule_type: K.ITEM("u8", 0),
    }

    result = {
      ...result,
      grade_course: [],
    }

    // following datas are made up needs to figure out correct way to do it //
    let grade = JSON.parse(await IO.ReadFile("data/grade.json"));
    if (!_.isNil(grade[version])) {
      Object.keys(grade[version]).forEach(s => {
        Object.keys(grade[version][s]).forEach(c => {
          result.grade_course.push({
            play_style: K.ITEM("s32", parseInt(s)),
            grade_id: K.ITEM("s32", parseInt(c)),
            is_valid: K.ITEM("bool", true),
            music_id_0: K.ITEM("s32", grade[version][s][c].music_id[0]),
            class_id_0: K.ITEM("s32", grade[version][s][c].class_id[0]),
            music_id_1: K.ITEM("s32", grade[version][s][c].music_id[1]),
            class_id_1: K.ITEM("s32", grade[version][s][c].class_id[1]),
            music_id_2: K.ITEM("s32", grade[version][s][c].music_id[2]),
            class_id_2: K.ITEM("s32", grade[version][s][c].class_id[2]),
            music_id_3: K.ITEM("s32", grade[version][s][c].music_id[3]),
            class_id_3: K.ITEM("s32", grade[version][s][c].class_id[3]),
            index: K.ITEM("s32", result.grade_course.length),
            cube_num: K.ITEM("s32", 0),
            kind: K.ITEM("s32", 0),
          });
        });
      });
    }
  }

  // arena_music_difficult //
  for (let s = 0; s < 2; ++s) {
    for (let c = 0; c < 20; ++c) {
      result.arena_music_difficult.push({
        play_style: K.ITEM("s32", s),
        arena_class: K.ITEM("s32", c),
        low_difficult: K.ITEM("s32", 1),
        high_difficult: K.ITEM("s32", 12),
        is_leggendaria: K.ITEM("bool", 1),
        force_music_list_id: K.ITEM("s32", 0),
      });

      result.maching_class_range.push({
        play_style: K.ITEM("s32", s),
        matching_class: K.ITEM("s32", c),
        low_arena_class: K.ITEM("s32", 1),
        high_arena_class: K.ITEM("s32", 20),
      });

      result.arena_cpu_define.push({
        play_style: K.ITEM("s32", s),
        arena_class: K.ITEM("s32", c),
        grade_id: K.ITEM("s32", IIDX_CPUS[s][c][0]),
        low_music_difficult: K.ITEM("s32", IIDX_CPUS[s][c][1]),
        high_music_difficult: K.ITEM("s32", IIDX_CPUS[s][c][2]),
        is_leggendaria: K.ITEM("bool", IIDX_CPUS[s][c][3]),
      });
    }
  }

  switch (version) {
    case 29:
      result = {
        ...result,
        CommonBossPhase: K.ATTR({ val: String(3) }),
        Event1InternalPhase: K.ATTR({ val: String(U.GetConfig("ch_event")) }),
        ExtraBossEventPhase: K.ATTR({ val: String(U.GetConfig("ch_extraboss")) }),
        isNewSongAnother12OpenFlg: K.ATTR({ val: String(Number(U.GetConfig("NewSongAnother12"))) }),
        gradeOpenPhase: K.ATTR({ val: String(U.GetConfig("Grade")) }),
        isEiseiOpenFlg: K.ATTR({ val: String(Number(U.GetConfig("Eisei"))) }),
        WorldTourismOpenList: K.ATTR({ val: String(-1) }),
        BPLBattleOpenPhase: K.ATTR({ val: String(2) }),
      }
      break;
    case 30:
      result = {
        ...result,
        CommonBossPhase: K.ATTR({ val: String(3) }),
        Event1InternalPhase: K.ATTR({ val: String(U.GetConfig("rs_event")) }),
        ExtraBossEventPhase: K.ATTR({ val: String(U.GetConfig("rs_extraboss")) }),
        isNewSongAnother12OpenFlg: K.ATTR({ val: String(Number(U.GetConfig("NewSongAnother12"))) }),
        gradeOpenPhase: K.ATTR({ val: String(U.GetConfig("Grade")) }),
        isEiseiOpenFlg: K.ATTR({ val: String(Number(U.GetConfig("Eisei"))) }),
        WorldTourismOpenList: K.ATTR({ val: String(-1) }),
        BPLBattleOpenPhase: K.ATTR({ val: String(2) }),
      }
      break;
    case 31:
      let totalMetron = 0;
      let eventData = await DB.Find(null, {
        collection: "event_1",
        version: version,
        event_data: "myepo_map",
      });

      if (!_.isNil(eventData)) {
        eventData.forEach((res: any) => {
          totalMetron += Number(res.metron_total_get);
        });
      }

      result = {
        ...result,
        CommonBossPhase: K.ATTR({ val: String(3) }),
        Event1Value: K.ATTR({ val: String(U.GetConfig("ep_event")) }),
        Event1Phase: K.ATTR({ val: String(U.GetConfig("ep_event1")) }),
        Event2Phase: K.ATTR({ val: String(U.GetConfig("ep_event2")) }),
        ExtraBossEventPhase: K.ATTR({ val: String(U.GetConfig("ep_extraboss")) }),
        isNewSongAnother12OpenFlg: K.ATTR({ val: String(Number(U.GetConfig("NewSongAnother12"))) }),
        isKiwamiOpenFlg: K.ATTR({ val: String(Number(U.GetConfig("Eisei"))) }),
        WorldTourismOpenList: K.ATTR({ val: String(-1) }),
        BPLBattleOpenPhase: K.ATTR({ val: String(2) }),
        UnlockLeggendaria: K.ATTR({ val: String(1) }),
        BPLSerialCodePhase: K.ATTR({ val: String(0) }),
        Event1AllPlayerTotalGetMetron: K.ATTR({ val: String(totalMetron) }), // total amount of all users metron //
      }
      break;

    default:
      break;
  }

  return send.object(result);
};
