import { custom } from "./models/custom";
import { pcdata } from "./models/pcdata";
import { profile } from "./models/profile";

export function IDtoCode(id: number) {
  const padded = _.padStart(String(id), 8);
  return `${padded.slice(0, 4)}-${padded.slice(4)}`;
}

export async function IDtoRef(iidxid: number) {
  const profile = await DB.FindOne<profile>(null, {
    collection: "profile",
    id: iidxid,
  });

  if (_.isNil(profile)) return null;

  return profile.__refid;
}

export function OldMidToNewMid(mid: number) {
  const numberString = String(mid);
  
  return Number(`${numberString.slice(0, -2)}0${numberString.slice(-2)}`);
}

export function NewMidToOldMid(mid: number) {
  const numberString = String(mid);
  if (numberString.length == 4) return Number(`${numberString.slice(0, 1)}${numberString.slice(-2)}`);

  return Number(`${numberString.slice(0, 2)}${numberString.slice(3)}`);
}

export function ClidToPlaySide(clid: number) {
  switch (clid) {
    case 0: // SPB //
    case 1:
    case 2:
    case 3:
    case 4:
      return 0; // SPA //

    default:
      break;
  }

  return 1;
}

export function Base64toBuffer(s: string) {
  const base64list =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let t = "",
    p = -8,
    a = 0,
    c: number,
    d: number;

  if (s == null) return Buffer.from([0x00]);

  for (let i = 0; i < s.length; i++) {
    if ((c = base64list.indexOf(s.charAt(i))) < 0) continue;
    a = (a << 6) | (c & 63);
    if ((p += 6) >= 0) {
      d = (a >> p) & 255;
      if (c != 64) t += String.fromCharCode(d);
      a &= 63;
      p -= 8;
    }
  }

  return Buffer.from(t);
}

export function GetVersion(info: EamuseInfo) {
  let version = -1;
  switch (info.model.substring(0, 3)) {
    case "JDZ": return 18;
    case "KDZ": return 19;
    case "LDJ":
      version = parseInt(info.module.substring(4, 6));
      if (_.isNaN(version)) version = 20;
      break;
  }

  return version;
}

export function appendSettingConverter(
  rf: boolean,
  cf: boolean,
  df: boolean,
  af: boolean,
  rsf: boolean,
  rbf: boolean,
  ri: boolean,
  hpc: boolean,
  dgc: boolean,
  chs: boolean,
  rpf: boolean,
  hii: boolean,
) {
  const result =
    Number(rf) << 0 |
    Number(cf) << 1 |
    Number(df) << 2 |
    Number(af) << 3 |
    Number(rsf) << 4 |
    Number(rbf) << 6 |
    Number(ri) << 7 |
    Number(hpc) << 8 |
    Number(dgc) << 9 |
    Number(chs) << 10 |
    Number(rpf) << 11 |
    Number(hii) << 12;

  return result;
}

export async function ReftoProfile(refid: string) {
  const profile = await DB.FindOne<profile>(refid, {
    collection: "profile",
  });

  let profile_data = [];

  try {
    profile_data = [
      profile.name,
      profile.pid,
      profile.id,
      profile.idstr,
    ];
  } catch {
    profile_data = ["", 0, 0, ""];
  }

  return profile_data;
}

export async function ReftoPcdata(refid: string, version: number) {
  const pcdata = await DB.FindOne<pcdata>(refid, {
    collection: "pcdata",
    version: version,
  });

  let p_data = [];

  try {
    p_data = [
      pcdata.sgid,
      pcdata.dgid,
      pcdata.sach,
      pcdata.dach,
    ];
  } catch {
    p_data = [0, 0, 0, 0];
  }

  return p_data;
}
export async function ReftoQPRO(refid: string, version: number) {
  const custom = await DB.FindOne<custom>(refid, {
    collection: "custom",
    version: version,
  });

  let qpro_data = [];

  try {
    qpro_data = [
      custom.qpro_hair,
      custom.qpro_head,
      custom.qpro_face,
      custom.qpro_body,
      custom.qpro_hand,
    ];
  } catch {
    qpro_data = [0, 0, 0, 0, 0];
  }

  return qpro_data;
}
