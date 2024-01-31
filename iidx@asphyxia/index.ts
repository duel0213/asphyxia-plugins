import { pccommon, pcreg, pcget, pcgetname, pctakeover, pcvisit, pcsave, pcoldget, pcgetlanegacha, pcconsumelanegacha, pcdrawlanegacha, pcshopregister } from "./handlers/pc";
import { shopgetname, shopgetconvention, shopsetconvention } from "./handlers/shop";
import { musicreg, musicgetrank, musicappoint, musicarenacpu } from "./handlers/music";
import { graderaised } from "./handlers/grade";
import { gssysteminfo } from "./handlers/gamesystem";
import { updateRivalSettings } from "./handlers/webui";
import { GetVersion } from "./util";

export function register() {
  if (CORE_VERSION_MAJOR <= 1 && CORE_VERSION_MINOR < 31) {
    console.error("The current version of Asphyxia Core is not supported. Requires version '1.31' or later.");
    return;
  }

  R.Contributor("duel0213");

  R.GameCode("JDZ");
  R.GameCode("KDZ");
  R.GameCode("LDJ");

  R.Config("BeatPhase", {
    name: "Beat #",
    type: "integer",
    default: 3,
  });

  R.Config("MovieUpload", {
    name: "Movie Upload URL",
    type: "string",
    default: "http://localhost/"
  });

  R.WebUIEvent("updateIIDXRivalSettings", updateRivalSettings);

  const MultiRoute = (method: string, handler: EPR | boolean) => {
    R.Route(`${method}`, handler);
    R.Route(`IIDX27${method}`, handler);
    R.Route(`IIDX28${method}`, handler);
    R.Route(`IIDX29${method}`, handler);
    R.Route(`IIDX30${method}`, handler);
  };

  MultiRoute("pc.common", pccommon);
  MultiRoute("pc.reg", pcreg);
  MultiRoute("pc.get", pcget);
  MultiRoute("pc.getname", pcgetname);
  MultiRoute("pc.oldget", pcoldget);
  MultiRoute("pc.takeover", pctakeover);
  MultiRoute("pc.visit", pcvisit);
  MultiRoute("pc.save", pcsave);
  MultiRoute("pc.shopregister", pcshopregister);
  MultiRoute("pc.getLaneGachaTicket", pcgetlanegacha);
  MultiRoute("pc.drawLaneGacha", pcdrawlanegacha);
  MultiRoute("pc.consumeLaneGachaTicket", pcconsumelanegacha);

  MultiRoute("shop.getname", shopgetname);
  MultiRoute("shop.getconvention", shopgetconvention);
  MultiRoute("shop.setconvention", shopsetconvention);

  MultiRoute("music.getrank", musicgetrank);
  MultiRoute("music.appoint", musicappoint);
  MultiRoute("music.reg", musicreg);
  MultiRoute("music.arenaCPU", musicarenacpu);

  MultiRoute("grade.raised", graderaised);

  MultiRoute("gameSystem.systemInfo", gssysteminfo);

  R.Unhandled((req: EamuseInfo, data: any, send: EamuseSend) => {
    console.warn(`Unhandled Request : ${req.module}.${req.method} , [${GetVersion(req)}]`);
    return send.success();
  });
}
