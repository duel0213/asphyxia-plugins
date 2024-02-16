﻿import { pccommon, pcreg, pcget, pcgetname, pctakeover, pcvisit, pcsave, pcoldget, pcgetlanegacha, pcdrawlanegacha, pcshopregister } from "./handlers/pc";
import { shopgetname, shopsavename, shopgetconvention, shopsetconvention } from "./handlers/shop";
import { musicreg, musicgetrank, musicappoint, musicarenacpu } from "./handlers/music";
import { graderaised } from "./handlers/grade";
import { gssysteminfo } from "./handlers/gamesystem";
import { updateRivalSettings, updateCustomSettings } from "./handlers/webui";
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

  // common //
  R.Config("BeatPhase", {
    name: "Beat #",
    type: "integer",
    default: 3,
  });

  // Resort Anthem //
  R.Config("ra_cmd_gmbl", {
    name: "G.JUDGE",
    desc: "Enable G.JUDGE Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_cmd_gmbla", {
    name: "G.JUDGE-A",
    desc: "Enable G.JUDGE-A Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_cmd_regl", {
    name: "REGUL-SPEED",
    desc: "Enable REGUL-SPEED Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_cmd_rndp", {
    name: "RANDOM+",
    desc: "Enable RANDOM+ Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_cmd_hrnd", {
    name: "H-RANDOM",
    desc: "Enable H-RANDOM Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_cmd_alls", {
    name: "ALL-SCRATCH",
    desc: "Enable ALL-SCRATCH Command (Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("ra_league", {
    name: "League Phase (RA)",
    type: "integer",
    default: 0,
  });
  R.Config("ra_story", {
    name: "Story Phase (RA)",
    type: "integer",
    default: 0,
  });
  R.Config("ra_event", {
    name: "Tour Phase (RA)",
    type: "integer",
    default: 3,
  });
  R.Config("ra_lincle", {
    name: "Lincle LINK Phase (RA)",
    type: "integer",
    default: 1,
  });

  // Lincle //
  R.Config("lc_lincle", {
    name: "Lincle LINK Phase (LC)",
    type: "integer",
    default: 2,
  });
  R.Config("lc_boss", {
    name: "Lincle Kingdom Phase",
    type: "integer",
    default: 2,
  });

  // tricoro //
  R.Config("tr_limit", {
    name: "Limit Burst Phase",
    type: "integer",
    default: 4,
  });
  R.Config("tr_boss", {
    name: "Event Phase (TR)",
    desc: "RED/BLUE/YELLOW",
    type: "integer",
    default: 3,
  });
  R.Config("tr_red", {
    name: "RED Phase",
    desc: "LEGEND CROSS Phase",
    type: "integer",
    default: 3,
  });
  R.Config("tr_yellow", {
    name: "YELLOW Phase",
    desc: "ぼくらの宇宙戦争 Phase",
    type: "integer",
    default: 3,
  });
  R.Config("tr_medal", {
    name: "Medal Phase (TR)",
    type: "integer",
    default: 3,
  });
  R.Config("tr_cafe", {
    name: "Café de Tran",
    desc: "Enable Café de Tran Event (tricoro)",
    type: "boolean",
    default: true,
  });
  R.Config("tr_tripark", {
    name: "Everyone's SPACEWAR!!",
    desc: "Enable クプロ・ミミニャミ・パステルくんのみんなで宇宙戦争!! Event (tricoro)",
    type: "boolean",
    default: true,
  });

  // BISTROVER ~ (common) //
  R.Config("bo_movieupload", {
    name: "Movie Upload URL",
    type: "string",
    default: "http://localhost/"
  });

  // TODO:: Reflect data when version dropdown menu has been changed
  R.WebUIEvent("updateIIDXRival", updateRivalSettings);
  R.WebUIEvent("updateIIDXCustom", updateCustomSettings);

  const MultiRoute = (method: string, handler: EPR | boolean) => {
    R.Route(`${method}`, handler);
    R.Route(`IIDX21${method}`, handler);
    R.Route(`IIDX22${method}`, handler);
    R.Route(`IIDX23${method}`, handler);
    R.Route(`IIDX24${method}`, handler);
    R.Route(`IIDX25${method}`, handler);
    R.Route(`IIDX26${method}`, handler);
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
  MultiRoute("pc.consumeLaneGachaTicket", true);

  MultiRoute("shop.getname", shopgetname);
  MultiRoute("shop.savename", shopsavename);
  MultiRoute("shop.getconvention", shopgetconvention);
  MultiRoute("shop.setconvention", shopsetconvention);

  MultiRoute("music.getrank", musicgetrank);
  MultiRoute("music.appoint", musicappoint);
  MultiRoute("music.reg", musicreg);
  MultiRoute("music.arenaCPU", musicarenacpu);

  MultiRoute("grade.raised", graderaised);

  MultiRoute("gameSystem.systemInfo", gssysteminfo);

  R.Unhandled((req: EamuseInfo, data: any, send: EamuseSend) => {
    console.warn(`Unhandled Request : [${GetVersion(req)}], ${req.module}.${req.method}, ${JSON.stringify(data)}`);
    return send.success();
  });
}
