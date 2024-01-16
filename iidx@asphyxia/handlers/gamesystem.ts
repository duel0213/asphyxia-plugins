import { GetVersion } from "../util";

export const gssysteminfo: EPR = async (info, data, send) => {
  const version = GetVersion(info);

  if (version >= 27) {
    return send.pugFile(`pug/LDJ/${version}systeminfo.pug`);
  }

  return send.success();
};
