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

    default:
      break;
  }

  return send.object(result);
};
