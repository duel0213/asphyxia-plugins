import { expert, ranking } from "../models/ranking";
import { profile } from "../models/profile";
import { GetCommand, GetModel, GetVersion, IDtoRef } from "../util";

export const rankingmethod: EPR = async (info, data, send) => {
  const command = GetCommand(data);
  switch (command[0]) {
    case "entry":
      return await rankingentry(info, data, send);
    case "getranker":
      return await rankinggetranker(info, data, send);

    default:
      break;
  }

  return send.deny();
}

export const rankingentry: EPR = async (info, data, send) => {
  // pside //
  const version = GetVersion(info);
  const command = GetCommand(data);

  let refid = null;
  if (version < 11) refid = command[1].split('|')[0];
  else if (version < 13) refid = await IDtoRef(Number(command[1]));
  else refid = await IDtoRef(Number($(data).attr().iidxid));

  const coid = version < 13 ? Number(command[3]) : Number($(data).attr().coid);
  const clid = version < 13 ? Number(command[2]) : Number($(data).attr().clid);

  let opname = null;
  if (version < 11) opname = command[10];
  else if (version < 13) opname = command[9];
  else opname = $(data).attr().opname;

  let oppid = null;
  if (version < 11) oppid = Number(command[11]);
  else if (version < 13) oppid = Number(command[10]);
  else oppid = Number($(data).attr().oppid);

  const pgnum = version < 13 ? Number(command[4]) : Number($(data).attr().pgnum);
  const gnum = version < 13 ? Number(command[5]) : Number($(data).attr().gnum);
  const opt = version < 13 ? Number(command[6]) : Number($(data).attr().opt);
  const opt2 = version < 13 ? Number(command[7]) : Number($(data).attr().opt2); // unk #2 //
  
  const exscore = (pgnum * 2 + gnum);

  let cstage = null;
  if (version < 11) cstage = Number(command[12]);
  else if (version < 12) cstage = Number(command[10]);
  else if (version < 13) cstage = Number(command[11]);
  else cstage = Number($(data).attr().cstage);

  const clr = version < 13 ? (cstage == 5 ? 1 : 0) : Number($(data).attr().clr);

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

  let expertUser = await DB.Find<ranking>({
    collection: "ranking",
    version: version,
    coid: coid,
    clid: clid,
  });
  expertUser.sort((a: ranking, b: ranking) => b.exscore - a.exscore);
  let rankPos = expertUser.findIndex((a: ranking) => a.name == name);

  let result = {
    "@attr": {
      anum: String(expertUser.length),
      jun: String(rankPos + 1),
    }
  }

  let sendOption: EamuseSendOption = {};
  if (version < 14) {
    result["@attr"]["method"] = "rankingentry"
    sendOption = {
      rootName: GetModel(info),
      status: version < 13 ? "SOK" : 0,
    };
  }

  return send.object(result, sendOption);
};

export const rankingoentry: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const refid = await IDtoRef(Number($(data).attr().iidxid));

  const coid = Number($(data).attr().coid);
  const clid = Number($(data).attr().clid);

  const pgnum = Number($(data).attr().pgnum);
  const gnum = Number($(data).attr().gnum);
  const opt = Number($(data).attr().opt);
  const opt2 = Number($(data).attr().opt2);
  const clr = Number($(data).attr().clr);

  const exscore = (pgnum * 2 + gnum);

  // TODO:: figure out what this does //

  return send.success();
};

export const rankinggetranker: EPR = async (info, data, send) => {
  const version = GetVersion(info);
  const command = GetCommand(data);

  const coid = version < 13 ? Number(command[1]) : Number($(data).attr().coid);
  const clid = version < 13 ? Number(command[2]) : Number($(data).attr().clid);
  const ranking = await DB.Find<ranking>({
    collection: "ranking",
    version: version,
    coid,
    clid,
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

  let sendOption: EamuseSendOption = {};
  if (version < 14) {
    result = Object.assign(result, {
      "@attr": { method: "rankinggetranker" },
    });
    sendOption = {
      rootName: GetModel(info),
      status: version < 13 ? "SOK" : 0,
    };
  }

  return send.object(result, sendOption);
};
