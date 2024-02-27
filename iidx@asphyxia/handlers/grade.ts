import { pcdata } from "../models/pcdata";
import { grade } from "../models/grade";
import { IDtoRef, GetVersion } from "../util";
import { eisei_grade } from "../models/lightning";

export const graderaised: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const iidxid = parseInt($(data).attr().iidxid);
  const refid = await IDtoRef(iidxid);
  const gid = parseInt($(data).attr().gid);
  const gtype = parseInt($(data).attr().gtype);

  let cflg = parseInt($(data).attr().cflg);
  let achi = parseInt($(data).attr().achi);

  let pcdata = await DB.FindOne<pcdata>(refid, { collection: "pcdata", version: version });
  let grade = await DB.FindOne<grade>(refid, {
    collection: "grade",
    version: version,
    style: gtype,
    gradeId: gid,
  });

  if (version >= 23) cflg = parseInt($(data).attr().cstage);

  const isTDJ = !(_.isNil($(data).element("lightning_play_data"))); // lightning model //
  const hasEiseiData = (!(_.isNil($(data).element("eisei_data"))) || !(_.isNil($(data).element("eisei_grade_data"))));;
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

    if (version == 27) {
      eisei_clear_type = parseInt($(data).attr("eisei_data").clear_type);
      eisei_grade_id = parseInt($(data).attr("eisei_data").grade_id);
      eisei_grade_type = parseInt($(data).attr("eisei_data").grade_type);
      eisei_stage_num = parseInt($(data).attr("eisei_data").stage_num);

      eisei_past_achievement = $(data).element("eisei_data").numbers("past_achievement");
      eisei_max_past_achievement = $(data).element("eisei_data").numbers("max_past_achievement");
    } if (version >= 30) {
      eisei_clear_type = parseInt($(data).element("eisei_data").attr().clear_type);
      eisei_grade_id = parseInt($(data).element("eisei_data").attr().grade_id);
      eisei_grade_type = parseInt($(data).element("eisei_data").attr().grade_type);
      eisei_stage_num = parseInt($(data).element("eisei_data").attr().stage_num);
      eisei_option = parseInt($(data).element("eisei_data").attr().option);

      eisei_past_achievement = $(data).element("eisei_data").numbers("past_achievement");
      eisei_past_selected_course = $(data).element("eisei_data").numbers("past_selected_course");
      eisei_max_past_achievement = $(data).element("eisei_data").numbers("max_past_achievement");
      eisei_max_past_selected_course = $(data).element("eisei_data").numbers("max_past_selected_course");
    } else {
      eisei_clear_type = parseInt($(data).attr("eisei_grade_data").clear_type);
      eisei_grade_id = parseInt($(data).attr("eisei_grade_data").grade_id);
      eisei_grade_type = parseInt($(data).attr("eisei_grade_data").grade_type);
      eisei_stage_num = parseInt($(data).attr("eisei_grade_data").stage_num);

      eisei_past_achievement = $(data).element("eisei_grade_data").numbers("past_achievement");
      eisei_past_selected_course = $(data).element("eisei_grade_data").numbers("past_selected_course");
      eisei_max_past_achievement = $(data).element("eisei_grade_data").numbers("max_past_achievement");
      eisei_max_past_selected_course = $(data).element("eisei_grade_data").numbers("max_past_selected_course");
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
  if (_.isNil(pcdata)) return send.deny();
  if (_.isNil(grade)) {
    if (cflg == 4) {
      if (gtype == 0)
        pcdata.sgid = Math.max(gid, pcdata.sgid);
      else
        pcdata.dgid = Math.max(gid, pcdata.dgid);

      updatePcdata = true;
    }

    updateGrade = true;
  } else {
    if (cflg >= grade.maxStage || achi >= grade.archive) {
      cflg = Math.max(cflg, grade.maxStage);
      achi = Math.max(achi, grade.archive);

      updateGrade = true;
    }

    if (cflg == 4) updatePcdata = true;
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

  let gradeUser = await DB.Find<grade>(null, {
    collection: "grade",
    version: version,
    style: gtype,
    gradeId: gid,
    maxStage: 4,
  });

  return send.object(
    K.ATTR({
      pnum: String(gradeUser.length),
    })
  );
};
