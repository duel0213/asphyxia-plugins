import { expert, ranking } from "../models/ranking";
import { profile } from "../models/profile";
import { GetVersion, IDtoRef } from "../util";

export const rankingentry: EPR = async (info, data, send) => {
  // pside //
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));

  const coid = parseInt($(data).attr().coid);
  const clid = parseInt($(data).attr().clid);

  const opname = $(data).attr().opname;
  const oppid = parseInt($(data).attr().oppid);
  const pgnum = parseInt($(data).attr().pgnum);
  const gnum = parseInt($(data).attr().gnum);
  const opt = parseInt($(data).attr().opt);
  const opt2 = parseInt($(data).attr().opt2);
  const clr = parseInt($(data).attr().clr);

  const exscore = (pgnum * 2 + gnum);
  const cstage = parseInt($(data).attr().cstage);

  const expert_data = await DB.FindOne<expert>(refid, {
    collection: "expert",
    version: version,
    coid: coid,
  });

  let pgArray = Array<number>(6).fill(0); // PGREAT //
  let gArray = Array<number>(6).fill(0); // GREAT //
  let cArray = Array<number>(6).fill(0); // CLEAR FLAGS //
  let optArray = Array<number>(6).fill(0); // USED OPTION (SP/DP) //
  let opt2Array = Array<number>(6).fill(0); // USED OPTION (DP) //
  let esArray = Array<number>(6).fill(0); // EXSCORE //
  if (_.isNil(expert_data)) {
    cArray[clid] = clr;
    pgArray[clid] = pgnum;
    gArray[clid] = gnum;
    optArray[clid] = opt;
    opt2Array[clid] = opt2;
    esArray[clid] = exscore;
  }
  else {
    cArray = expert_data.cArray;
    pgArray = expert_data.pgArray;
    gArray = expert_data.gArray;
    optArray = expert_data.optArray;
    opt2Array = expert_data.opt2Array;
    esArray = expert_data.esArray;

    const pExscore = esArray[clid];
    if (exscore > pExscore) {
      pgArray[clid] = pgnum;
      gArray[clid] = gnum;
      optArray[clid] = opt;
      opt2Array[clid] = opt2;
      esArray[clid] = exscore;
    }

    cArray[clid] = Math.max(cArray[clid], clr);
  }

  await DB.Upsert<expert>(
    refid,
    {
      collection: "expert",
      version: version,
      coid: coid,
    },
    {
      $set: {
        cArray,
        pgArray,
        gArray,
        optArray,
        opt2Array,
        esArray,
      }
    }
  );

  const profile = await DB.FindOne<profile>(refid, {
    collection: "profile",
  });
  const name = profile.name;
  await DB.Upsert<ranking>(
    {
      collection: "ranking",
      version: version,
      coid: coid,
      clid: clid,
    },
    {
      $set: {
        pgnum: pgnum,
        gnum: gnum,
        name: name,
        opname: opname,
        pid: oppid,
        udate: 0,

        exscore: exscore,
        maxStage: cstage,
      }
    }
  );

  let expertUser = await DB.Find<expert>(null, {
    collection: "expert",
    version: version,
    coid: coid,
    clid: clid,
    maxStage: 5,
  });

  return send.object(K.ATTR({
    anum: String(expertUser.length),
    jun: "1",
  }));
};

export const rankingoentry: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(parseInt($(data).attr().iidxid));

  const coid = parseInt($(data).attr().coid);
  const clid = parseInt($(data).attr().clid);

  const pgnum = parseInt($(data).attr().pgnum);
  const gnum = parseInt($(data).attr().gnum);
  const opt = parseInt($(data).attr().opt);
  const opt2 = parseInt($(data).attr().opt2);
  const clr = parseInt($(data).attr().clr);

  const exscore = (pgnum * 2 + gnum);

  // TODO:: figure out what this does //

  return send.success();
};

export const rankinggetranker: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const ranking = await DB.Find<ranking>(null, {
    collection: "ranking",
    version: version,
    coid: parseInt($(data).attr().coid),
    clid: parseInt($(data).attr().clid),
  });
  let result = {
    ranker: [],
  }

  if (_.isNil(ranking)) return send.success();

  ranking.sort((a: ranking, b: ranking) => b.exscore - a.exscore);
  ranking.forEach((res) => {
    result.ranker.push(
      K.ATTR({
        gnum: String(res.gnum),
        pgnum: String(res.pgnum),
        name: res.name,
        opname: res.opname,
        pid: String(res.pid),
        udate: String(res.udate),
      })
    );
  });

  return send.object(result);
};
