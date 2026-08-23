import { pcdata } from "../models/pcdata";
import { grade } from "../models/grade";
import { IDtoRef, GetVersion, GetModel, GetCommand } from "../util";
import { eisei_grade } from "../models/lightning";
import { badge } from "../models/badge";

export const grademethod: EPR = async (info, data, send) => {
  const command = GetCommand(data);
  switch (command[0]) {
    case "raised":
      return await graderaised(info, data, send);

    default:
      break;
  }

  return send.deny();
}

export const graderaised: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const command = GetCommand(data);

  let refid = null;
  if (version < 11) refid = command[1].split('|')[0];
  else if (version < 13) refid = await IDtoRef(Number(command[1]));
  else refid = await IDtoRef(Number($(data).attr().iidxid));

  const gid = version < 13 ? Number(command[3]) : Number($(data).attr().gid);
  const gtype = version < 13 ? Number(command[2]) : Number($(data).attr().gtype);

  let cflg = version < 13 ? Number(command[4]) : Number($(data).attr().cflg);
  if (version >= 23) cflg = Number($(data).attr().cstage);
  let achi = version < 13 ? Number(command[5]) : Number($(data).attr().achi);

  let pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata", version: version });
  let grade = await DB.FindOne<grade>(refid, {
    collection: "grade",
    version: version,
    style: gtype,
    gradeId: gid,
  });

  const isTDJ = !_.isNil($(data).element("lightning_play_data")); // lightning model //
  const hasEiseiData = (!_.isNil($(data).element("eisei_data")) || !_.isNil($(data).element("eisei_grade_data")) || !_.isNil($(data).element("kiwami_data")));
  if (isTDJ && hasEiseiData) {
    let eisei_clear_type: number;
    let eisei_grade_id: number;
    let eisei_grade_type: number;
    let eisei_stage_num: number;
    let eisei_option: number;

    let eisei_past_achievement: number[];
    let eisei_past_selected_course: number[];
    let eisei_max_past_achievement: number[];
    let eisei_max_past_selected_course: number[];

    switch (version) {
      case 27:
        eisei_clear_type = Number($(data).attr("eisei_data").clear_type);
        eisei_grade_id = Number($(data).attr("eisei_data").grade_id);
        eisei_grade_type = Number($(data).attr("eisei_data").grade_type);
        eisei_stage_num = Number($(data).attr("eisei_data").stage_num);

        eisei_past_achievement = $(data).element("eisei_data").numbers("past_achievement");
        eisei_max_past_achievement = $(data).element("eisei_data").numbers("max_past_achievement");
        break;
      case 30:
        eisei_clear_type = Number($(data).element("eisei_data").attr().clear_type);
        eisei_grade_id = Number($(data).element("eisei_data").attr().grade_id);
        eisei_grade_type = Number($(data).element("eisei_data").attr().grade_type);
        eisei_stage_num = Number($(data).element("eisei_data").attr().stage_num);
        eisei_option = Number($(data).element("eisei_data").attr().option);

        eisei_past_achievement = $(data).element("eisei_data").numbers("past_achievement");
        eisei_past_selected_course = $(data).element("eisei_data").numbers("past_selected_course");
        eisei_max_past_achievement = $(data).element("eisei_data").numbers("max_past_achievement");
        eisei_max_past_selected_course = $(data).element("eisei_data").numbers("max_past_selected_course");
        break;
      case 31:
      case 32:
      case 33:
        eisei_clear_type = Number($(data).attr("kiwami_data").clear_type);
        eisei_grade_id = Number($(data).attr("kiwami_data").grade_id);
        eisei_grade_type = Number($(data).attr("kiwami_data").grade_type);
        eisei_stage_num = Number($(data).attr("kiwami_data").stage_num);
        eisei_option = Number($(data).attr("kiwami_data").option);

        eisei_past_achievement = $(data).element("kiwami_data").numbers("past_achievement");
        eisei_past_selected_course = $(data).element("kiwami_data").numbers("past_selected_course");
        eisei_max_past_achievement = $(data).element("kiwami_data").numbers("max_past_achievement");
        eisei_max_past_selected_course = $(data).element("kiwami_data").numbers("max_past_selected_course");
        break;

      default:
        eisei_clear_type = Number($(data).attr("eisei_grade_data").clear_type);
        eisei_grade_id = Number($(data).attr("eisei_grade_data").grade_id);
        eisei_grade_type = Number($(data).attr("eisei_grade_data").grade_type);
        eisei_stage_num = Number($(data).attr("eisei_grade_data").stage_num);

        eisei_past_achievement = $(data).element("eisei_grade_data").numbers("past_achievement");
        eisei_past_selected_course = $(data).element("eisei_grade_data").numbers("past_selected_course");
        eisei_max_past_achievement = $(data).element("eisei_grade_data").numbers("max_past_achievement");
        eisei_max_past_selected_course = $(data).element("eisei_grade_data").numbers("max_past_selected_course");
        break;
    }

    await DB.Upsert<eisei_grade>(
      refid,
      {
        collection: "eisei_grade",
        version: version,
        grade_type: eisei_grade_type,
        grade_id: eisei_grade_id,
      },
      {
        $set: {
          clear_type: eisei_clear_type,
          stage_num: eisei_stage_num,
          option: eisei_option,

          past_achievement: eisei_past_achievement,
          past_selected_course: eisei_past_selected_course,
          max_past_achievement: eisei_max_past_achievement,
          max_past_selected_course: eisei_max_past_selected_course,
        },
      }
    );

    return send.object(
      K.ATTR({
        pnum: "1", // This isn't visible to user and seems leftover //
      })
    );
  }

  let updatePcdata = false;
  let updateGrade = false;
  if (version < 23) {
    if (gtype == 0 && cflg == 4) updatePcdata = true;
    else if (gtype == 1 && cflg == 3) updatePcdata = true;
  } else {
    if (cflg == 4) updatePcdata = true;
  }

  if (_.isNil(pcdata)) return send.deny();
  if (_.isNil(grade)) {
    if (updatePcdata) {
      if (gtype == 0) pcdata.sgid = Math.max(gid, pcdata.sgid);
      else pcdata.dgid = Math.max(gid, pcdata.dgid);
    }

    updateGrade = true;
  } else {
    if (cflg >= grade.maxStage || achi >= grade.archive) {
      cflg = Math.max(cflg, grade.maxStage);
      achi = Math.max(achi, grade.archive);

      updateGrade = true;
    }

    if (updatePcdata) {
      if (gtype == 0) pcdata.sgid = Math.max(gid, pcdata.sgid);
      else pcdata.dgid = Math.max(gid, pcdata.dgid);
    }
  }

  if (updatePcdata) {
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
  }

  if (updateGrade) {
    await DB.Upsert<grade>(
      refid,
      {
        collection: "grade",
        version: version,
        style: gtype,
        gradeId: gid,
      },
      {
        $set: {
          maxStage: cflg,
          archive: achi,
        }
      }
    );
  }

  if (!_.isNil($(data).element("badge"))) {
    await DB.Upsert<badge>(
      refid,
      {
        collection: "badge",
        version: version,
        category_name: "grade",
        flg_id: Number($(data).attr("badge").badge_flg_id),
      },
      {
        $set: {
          flg: Number($(data).attr("badge").badge_flg),
        }
      }
    );
  }

  const maxStage = version < 23 ? (gtype == 0 ? 4 : 3) : 4;
  let gradeUser = await DB.Find<grade>(null, {
    collection: "grade",
    version: version,
    style: gtype,
    gradeId: gid,
    maxStage,
  });

  let result = {
    "@attr": {
      pnum: String(gradeUser.length),
    }
  }

  let sendOption: EamuseSendOption = {};
  if (version < 14) {
    result["@attr"]["method"] = "graderaised";
    sendOption = {
      rootName: GetModel(info),
      status: version < 13 ? "SOK" : 0,
    }
  }

  return send.object(result, sendOption);
};
