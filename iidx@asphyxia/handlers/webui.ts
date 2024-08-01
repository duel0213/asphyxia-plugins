import { profile } from "../models/profile";
import { rival } from "../models/rival";
import { custom } from "../models/custom";
import { score, old_score } from "../models/score";

export const updateRivalSettings = async (data) => {
  let update_array = [];

  if (!(_.isEmpty(data.sp_rival1))) {
    let update_data = {
      play_style: 1,
      index: 0,
      rival_refid: data.sp_rival1,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 1,
        index: 0,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival2))) {
    let update_data = {
      play_style: 1,
      index: 1,
      rival_refid: data.sp_rival2,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 1,
        index: 1,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival3))) {
    let update_data = {
      play_style: 1,
      index: 2,
      rival_refid: data.sp_rival3,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 1,
        index: 2,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival4))) {
    let update_data = {
      play_style: 1,
      index: 3,
      rival_refid: data.sp_rival4,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 1,
        index: 3,
      }
    )
  }

  if (!(_.isEmpty(data.sp_rival5))) {
    let update_data = {
      play_style: 1,
      index: 4,
      rival_refid: data.sp_rival5,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 1,
        index: 4,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival1))) {
    let update_data = {
      play_style: 2,
      index: 0,
      rival_refid: data.dp_rival1,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 2,
        index: 0,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival2))) {
    let update_data = {
      play_style: 2,
      index: 1,
      rival_refid: data.dp_rival2,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 2,
        index: 1,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival3))) {
    let update_data = {
      play_style: 2,
      index: 2,
      rival_refid: data.dp_rival3,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 2,
        index: 2,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival4))) {
    let update_data = {
      play_style: 2,
      index: 3,
      rival_refid: data.dp_rival4,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 2,
        index: 3,
      }
    )
  }

  if (!(_.isEmpty(data.dp_rival5))) {
    let update_data = {
      play_style: 2,
      index: 4,
      rival_refid: data.dp_rival5,
    };

    update_array.push(update_data);
  } else {
    await DB.Remove<rival>(data.refid,
      {
        collection: "rival",
        play_style: 2,
        index: 4,
      }
    )
  }

  for (let i = 0; i < update_array.length; i++) {
    await DB.Upsert<rival>(data.refid, {
      collection: "rival",
      play_style: update_array[i].play_style,
      index: update_array[i].index,
    }, {
      $set: {
        rival_refid: update_array[i].rival_refid,
        }
      }
    )
  }
};

export const updateCustomSettings = async (data) => {
  const profile = await DB.FindOne<profile>(data.refid, {
    collection: "profile",
  });

  let customize = {
    frame: parseInt(data.frame),
    turntable: parseInt(data.turntable),
    note_burst: parseInt(data.note_burst),
    menu_music: parseInt(data.menu_music),
    lane_cover: parseInt(data.lane_cover),
    category_vox: parseInt(data.category_vox),
    note_skin: parseInt(data.note_skin),
    full_combo_splash: parseInt(data.full_combo_splash),
    disable_musicpreview: StoB(data.disable_musicpreview),

    note_beam: parseInt(data.note_beam),
    judge_font: parseInt(data.judge_font),
    pacemaker_cover: parseInt(data.pacemaker_cover),
    vefx_lock: StoB(data.vefx_lock),
    effect: parseInt(data.effect),
    bomb_size: parseInt(data.bomb_size),
    disable_hcn_color: StoB(data.disable_hcn_color),
    first_note_preview: parseInt(data.first_note_preview),

    rank_folder: StoB(data.rank_folder),
    clear_folder: StoB(data.clear_folder),
    diff_folder: StoB(data.diff_folder),
    alpha_folder: StoB(data.alpha_folder),
    rival_folder: StoB(data.rival_folder),
    rival_battle_folder: StoB(data.rival_battle_folder),
    rival_info: StoB(data.rival_info),
    hide_playcount: StoB(data.hide_playcount),
    disable_graph_cutin: StoB(data.disable_graph_cutin),
    classic_hispeed: StoB(data.classic_hispeed),
    rival_played_folder: StoB(data.rival_played_folder),
    hide_iidxid: StoB(data.hide_iidxid),
    disable_beginner_option: StoB(data.disable_beginner_option),
	
    qpro_head: parseInt(data.qpro_head),
    qpro_hair: parseInt(data.qpro_hair),
    qpro_face: parseInt(data.qpro_face),
    qpro_hand: parseInt(data.qpro_hand),
    qpro_body: parseInt(data.qpro_body),
  }

  await DB.Upsert<custom>(data.refid, {
    collection: "custom",
    version: parseInt(data.version)
  }, {
    $set: customize
  });

  if (!_.isEmpty(data.name) && data.name != profile.name) {
    // TODO:: check name is in valid format //
    await DB.Upsert<profile>(data.refid, {
      collection: "profile",
    }, {
      $set: {
        name: data.name
      }
    });
  }
};

export const importScoreData = async (data) => {
  if (_.isEmpty(data.data)) return;

  let content = JSON.parse(data.data);
  let version = content.version;
  let count = content.count;

  switch (version) {
    case 1:
      let sd_ver1: old_score[] = content.data;
      for (let a = 0; a < count; a++) {
        let result = {
          pgArray: Array<number>(10).fill(0),
          gArray: Array<number>(10).fill(0),
          mArray: Array<number>(10).fill(0),
          cArray: Array<number>(10).fill(0),
          rArray: Array<number>(10).fill(-1),
          esArray: Array<number>(10).fill(0),

          optArray: Array<number>(10).fill(0),
          opt2Array: Array<number>(10).fill(0),
        }

        if (!_.isNil(sd_ver1[a].spmArray)) {
          for (let b = 0; b < 5; b++) {
            result.cArray[b] = sd_ver1[a].spmArray[2 + b];
            result.esArray[b] = sd_ver1[a].spmArray[7 + b];
            if (sd_ver1[a].spmArray[12 + b] != -1) result.mArray[b] = sd_ver1[a].spmArray[12 + b];
          }
        }

        if (!_.isNil(sd_ver1[a].dpmArray)) {
          for (let b = 5; b < 10; b++) {
            result.cArray[b] = sd_ver1[a].dpmArray[2 + b];
            result.esArray[b] = sd_ver1[a].dpmArray[7 + b];
            if (sd_ver1[a].dpmArray[12 + b] != -1) result.mArray[b] = sd_ver1[a].dpmArray[12 + b];
          }
        }

        if (!_.isNil(sd_ver1[a].optArray)) {
          result.optArray = sd_ver1[a].optArray;
        }

        if (!_.isNil(sd_ver1[a].opt2Array)) {
          result.opt2Array = sd_ver1[a].opt2Array;
        }

        for (let b = 0; b < 10; b++) {
          if (_.isNil(sd_ver1[a][b])) continue;
          result[b] = sd_ver1[a][b];

          if (!_.isNil(sd_ver1[a][b + 10])) {
            result[b + 10] = sd_ver1[a][b + 10];
          }
        }

        await DB.Upsert<score>(data.refid,
          {
            collection: "score",
            mid: sd_ver1[a].music_id
          },
          {
            $set: {
              ...result
            }
          }
        );
      }
      break;
    case 2:
      let sd_ver2: score[] = content.data;
      for (let a = 0; a < count; a++) {
        await DB.Upsert<score>(data.refid,
          {
            collection: "score",
            mid: sd_ver2[a].mid
          },
          {
            $set: {
              ...sd_ver2[a]
            }
          }
        );
      }
      break;

    default:
      break;
  }
}

export const exportScoreData = async (data, send: WebUISend) => {
  const score = await DB.Find<score>(data.refid, {
    collection: "score"
  });

  let result = {
    version: 2,
    count: score.length,
    data: {
      ...score,
    }
  }

  send.json(result);
}

function StoB(value: string) {
  return value == "on" ? true : false;
};
