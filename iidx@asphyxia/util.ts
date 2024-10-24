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

export function OldMidToVerMid(mid: number) {
  return [Math.floor(mid / 100), mid % 100];
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
  return clid < 5 ? 0 : 1;
}

export function NumArraytoBase64(buff: number[]) {
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let result = "";

  for (let i = 0; i < buff.length; i += 3) {
    const chunk = (buff[i] << 16) | (buff[i + 1] << 8) | buff[i + 2];
    result += base64Chars[(chunk >> 18) & 63] +
      base64Chars[(chunk >> 12) & 63] +
      base64Chars[(chunk >> 6) & 63] +
      base64Chars[chunk & 63];
  }

  const padding = buff.length % 3;
  if (padding === 1) {
    result = result.slice(0, -2) + "==";
  } else if (padding === 2) {
    result = result.slice(0, -1) + "=";
  }

  return result;
}

export function Base64toNumArray(s: string) {
  const base64Chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let p = -8,
    a = 0,
    c: number,
    d: number,
    buffer: number[] = [];

  if (_.isNil(s)) return buffer;

  for (let i = 0; i < s.length; i++) {
    if ((c = base64Chars.indexOf(s.charAt(i))) < 0) continue;
    a = (a << 6) | (c & 63);
    if ((p += 6) >= 0) {
      d = (a >> p) & 255;
      if (c !== 64) buffer.push(d);
      a &= 63;
      p -= 8;
    }
  }

  return buffer;
}

export function NumArraytoHex(buff: number[]) {
  let hexStr = "";
  for (let i = 0; i < buff.length; i++) {
    const hex = buff[i].toString(16);
    const paddedHex = hex.length % 2 ? "0" + hex : hex;

    hexStr += paddedHex;
  }

  return hexStr;
}

export function HextoBase64(hex: string) {
  const buffer = [];
  const base64Chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
  let base64String = "";
  let i = 0;

  for (let i = 0; i < hex.length; i += 2) {
    const hexByte = hex.slice(i, i + 2);
    const byteValue = parseInt(hexByte, 16);
    buffer.push(byteValue);
  }

  while (i < buffer.length) {
    const byte1 = buffer[i++] || 0;
    const byte2 = buffer[i++] || 0;
    const byte3 = buffer[i++] || 0;

    const enc1 = byte1 >> 2;
    const enc2 = ((byte1 & 3) << 4) | (byte2 >> 4);
    const enc3 = ((byte2 & 15) << 2) | (byte3 >> 6);
    const enc4 = byte3 & 63;

    base64String +=
      base64Chars.charAt(enc1) +
      base64Chars.charAt(enc2) +
      (i <= buffer.length + 2 ? base64Chars.charAt(enc3) : "=") +
      (i <= buffer.length + 1 ? base64Chars.charAt(enc4) : "=");
  }

  return base64String;
}

export function NumArrayToString(bits: number[], numArray: number[]): string {
  const characters = "0123456789:;abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let byteSum = 0;
  let byteIndex = 0;
  if (bits.length > 0) {
    do {
      byteSum = bits[byteIndex] + byteSum;
      byteIndex++;
    } while (byteIndex < bits.length);
  }

  let result = "";
  let numIdx = 0;
  if (!_.isNil(numArray) && !_.isNaN(numArray[0])) {
    let numArrayIdx = 0;
    if (numArray.length > 0) {
      let combined = 0;
      do {
        if (numIdx == 0) combined = 0;

        const b = bits[numArrayIdx];
        combined = ((numArray[numIdx] & (1 << b) - 1) | combined << b);
        numArrayIdx++;
        if (numArrayIdx == bits.length) {
          combined <<= 32 - byteSum;

          const characterCount = Math.floor((byteSum + 5) / 6);
          if (characterCount > 0) {
            let charaIdx = 26;
            let charaLoopCnt = characterCount;
            do {
              const character = (combined >> charaIdx) & 63;
              result += characters.charAt(character);

              charaIdx -= 6;
              charaLoopCnt--;
            } while (charaLoopCnt > 0);
          }
          numArrayIdx = 0;
        }
        numIdx++;
      } while (numIdx < numArray.length);
    }
  }

  return result;
}

export function GetVersion(info: EamuseInfo) {
  let version = -1;
  switch (info.model.slice(0, 3)) {
    case "GLD": return 14;
    case "HDD": return 15;
    case "I00": return 16;
    case "JDJ": return 17;
    case "JDZ": return 18;
    case "KDZ": return 19;
    case "LDJ":
      version = parseInt(info.module.slice(4, 6));
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
  dbo: boolean,
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
    Number(hii) << 12 |
    Number(dbo) << 14;

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
    switch (version) {
      case 20:
      case 21:
      case 22:
      case 23:
      case 24:
      case 25:
      case 26:
        p_data = [
          pcdata.sgid,
          pcdata.dgid,
          pcdata.sach,
          pcdata.dach,
          pcdata.st_sp_ach,
          pcdata.st_dp_ach,
        ];
        break;
      default:
        p_data = [
          pcdata.sgid,
          pcdata.dgid,
          pcdata.sach,
          pcdata.dach,
        ];
        break;
    }

    // this seems leftover from tricoro but still being referenced until HEROIC VERSE [st_sp_ach/st_dp_ach] //
    for (let a = 0; a < p_data.length; a++) {
      if (_.isNil(p_data[a])) p_data[a] = 0;
    }
    
  } catch {
    p_data = [0, 0, 0, 0, 0, 0];
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
    switch (version) {
      case 31:
        qpro_data = [
          custom.qpro_hair,
          custom.qpro_head,
          custom.qpro_face,
          custom.qpro_body,
          custom.qpro_hand,
          custom.qpro_back,
        ];
        break;
      default:
        qpro_data = [
          custom.qpro_hair,
          custom.qpro_head,
          custom.qpro_face,
          custom.qpro_body,
          custom.qpro_hand,
        ];
        break;
    }
  } catch {
    qpro_data = [0, 0, 0, 0, 0, 0];
  }

  return qpro_data;
}
