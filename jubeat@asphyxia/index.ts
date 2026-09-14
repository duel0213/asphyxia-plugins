import ShopInfo from "./routes/shopinfo";
import {getProfile, Getinfo, loadScore, Meeting} from "./routes/gametop";
import {saveProfile} from "./routes/gameend";
import {Check, Entry, Refresh, Report} from "./routes/lobby";
import * as Q from "./qubell/qubell";

// Version split: the original handlers target festo (2018-09 onward). Older builds
// (prop / Qubell / clan) are answered by the Qubell handlers in ./qubell, which follow the
// Qubell request/response layout. The model string looks like "L44:J:B:A:2017062001".
const isPreFesto = (info: EamuseInfo): boolean => {
  const parts = (info.model || "").split(":");
  const date = parseInt(parts[4]);
  return !isNaN(date) && date < 2018090000;
};

// Never let a handler exception surface as an HTTP error: log it and deny instead.
const guard = (name: string, fn: EamusePluginRoute): EamusePluginRoute =>
  async (info, data, send) => {
    try {
      return await fn(info, data, send);
    } catch (e) {
      console.error(`[jubeat/qubell] ${name} failed: ${e && e.stack ? e.stack : e}`);
      return send.deny();
    }
  };

const split = (qubell: EamusePluginRoute, festo: EamusePluginRoute | boolean): EamusePluginRoute =>
  (info, data, send) => {
    if (isPreFesto(info)) return guard(`${info.module}.${info.method}`, qubell)(info, data, send);
    if (festo === true) return send.success();
    if (festo === false) return send.deny();
    return (festo as EamusePluginRoute)(info, data, send);
  };

export async function register() {
    if (CORE_VERSION_MAJOR <= 1 && CORE_VERSION_MINOR < 31) {
      console.error("The current version of Asphyxia Core is not supported. Requires version '1.31' or later.");
      return;
    }
    R.GameCode("L44");
    R.Contributor("yuanqiuye", "https://github.com/yuanqiuye")

    R.Route("gametop.regist", split(Q.gametopRegist, getProfile));
    R.Route("gametop.get_info", split(Q.gametopGetInfo, Getinfo));
    R.Route("gametop.get_pdata", split(Q.gametopGetPdata, getProfile));
    R.Route("gametop.get_mdata", split(Q.gametopGetMdata, loadScore));
    R.Route("gametop.get_meeting", split(Q.gametopGetMeeting, Meeting));

    R.Route("gameend.final", split(Q.gameendFinal, true));
    R.Route("gameend.regist", split(Q.gameendRegist, saveProfile));

    R.Route("shopinfo.regist", split(Q.shopinfoRegist, ShopInfo));
    R.Route("lobby.check", split(Q.lobbyCheck, Check));
    R.Route("lobby.entry", Entry);
    R.Route("lobby.refresh", Refresh);
    R.Route("lobby.report", Report);

    R.Route("demodata.get_news", split(Q.demodataGetNews, true));
    R.Route("demodata.get_hitchart", split(Q.demodataGetHitchart, true));
    R.Route("recommend.get_recommend", split(Q.recommendGetRecommend, true));

    R.Route("netlog.send", true);
    R.Route("logger.report", true);
    R.Unhandled();
  }
