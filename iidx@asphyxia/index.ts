import { pccommon, pcreg, pcget, pcgetname, pctakeover, pcvisit, pcsave, pcoldget, pcgetlanegacha, pcdrawlanegacha, pcshopregister } from "./handlers/pc";
import { shopgetname, shopsavename, shopgetconvention, shopsetconvention } from "./handlers/shop";
import { musicreg, musicgetrank, musicappoint, musicarenacpu, musiccrate, musicbreg, musicgetralive } from "./handlers/music";
import { graderaised } from "./handlers/grade";
import { gssysteminfo } from "./handlers/gamesystem";
import { updateRivalSettings, updateCustomSettings, importScoreData, exportScoreData } from "./handlers/webui";
import { GetVersion } from "./util";
import { rankingentry, rankinggetranker, rankingoentry } from "./handlers/ranking";

export function register() {
  if (CORE_VERSION_MAJOR <= 1 && CORE_VERSION_MINOR < 31) {
    console.error("The current version of Asphyxia Core is not supported. Requires version '1.31' or later.");
    return;
  }

  R.Contributor("duel0213");

  R.GameCode("GLD");
  R.GameCode("HDD");
  R.GameCode("I00");
  R.GameCode("JDJ");
  R.GameCode("JDZ");
  R.GameCode("KDZ");
  R.GameCode("LDJ");

  // common //
  R.Config("BeatPhase", {
    name: "Beat #",
    desc: "1 / 2 / 3 / FREE", // This can be event phase on old versions //
    type: "integer",
    default: 3, // BEAT FREE //
  });
  // ~ Resort Anthem (common) / /
  R.Config("cmd_gmbl", {
    name: "G.JUDGE",
    desc: "Enable G.JUDGE Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("cmd_gmbla", {
    name: "G.JUDGE-A",
    desc: "Enable G.JUDGE-A Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("cmd_regl", {
    name: "REGUL-SPEED",
    desc: "Enable REGUL-SPEED Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("cmd_rndp", {
    name: "RANDOM+",
    desc: "Enable RANDOM+ Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("cmd_hrnd", {
    name: "H-RANDOM",
    desc: "Enable H-RANDOM Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  R.Config("cmd_alls", {
    name: "ALL-SCRATCH",
    desc: "Enable ALL-SCRATCH Command (~ Resort Anthem)",
    type: "boolean",
    default: true,
  });
  // SPADA ~ (common) //
  R.Config("NewSongAnother12", {
    name: "New Song Another",
    desc: "Enables ANOTHER difficulty of current version's new songs that has Level 12",
    type: "boolean",
    default: true,
  });
  // PENDUAL ~ (common) //
  R.Config("ExpertPhase", {
    name: "Expert Phase",
    type: "integer",
    default: 2,
  });
  R.Config("ExpertRandomPhase", {
    name: "Expert Random Phase",
    type: "integer",
    default: 2,
  });
  // HEROIC VERSE ~ (common) //
  R.Config("ArenaPhase", {
    name: "ARENA Phase",
    type: "integer",
    default: 2, // ADVERTISE //
  });
  // BISTROVER ~ (common) //
  R.Config("MovieUpload", {
    name: "Movie Upload URL",
    type: "string",
    desc: "API address for play video uploading feature (JSON)",
    default: "http://localhost/"
  });
  R.Config("Eisei", {
    name: "Eisei Dan Courses",
    desc: "Enable EISEI DAN Courses",
    type: "boolean",
    default: true,
  });
  // CastHour ~ RESIDENT (common) //
  R.Config("Grade", {
    name: "Grade Open Phase",
    desc: "RED / KAIDEN",
    type: "integer",
    default: 2,
  })

  // SIRIUS //
  R.Config("sr_league", {
    name: "League Phase (SR)",
    type: "integer",
    default: 0,
  });

  // Resort Anthem //
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
    name: "Limit Burst Phase (TR)",
    type: "integer",
    default: 24, // TODO:: verify //
  });
  R.Config("tr_boss", {
    name: "Event Phase (TR)",
    desc: "RED / BLUE / YELLOW",
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

  // SPADA //
  R.Config("sp_limit", {
    name: "Limit Burst Phase (SP)",
    type: "integer",
    default: 24,
  });
  R.Config("sp_boss", {
    name: "Event Phase (SP)",
    desc: "Spada†leggendaria Phase",
    type: "integer",
    default: 3,
  });
  R.Config("sp_boss1", {
    name: "Qprogue Phase (SP)",
    type: "integer",
    default: 4,
  });
  R.Config("sp_cafe", {
    name: "Café de Tran",
    desc: "Enable Café de Tran Event (SPADA)",
    type: "boolean",
    default: true,
  });
  R.Config("sp_tripark", {
    name: "Everyone's SPACEWAR!!",
    desc: "Enable クプロ・ミミニャミ・パステルくんのみんなで宇宙戦争!! Event (SPADA)",
    type: "boolean",
    default: true,
  });
  R.Config("sp_triparkskip", {
    name: "Everyone's SPACEWAR!! Skip",
    desc: "Skips クプロ・ミミニャミ・パステルくんのみんなで宇宙戦争!! Event Scenes", 
    type: "integer",
    default: 2,
  });
  R.Config("sp_superstar", {
    name: "SUPER STAR -MITSURU-",
    desc: "SUPER STAR 満 -MITSURU- 完全復活祭 Phase",
    type: "integer",
    default: 2,
  });

  // PENDUAL //
  R.Config("pd_preplay", {
    name: "SUPER FUTURE 2323 Phase",
    type: "integer",
    default: 2,
  });
  R.Config("pd_tohoremix", {
    name: "BEMANI X TOHO",
    desc: "BEMANI×TOHO REITAISAI 2015 project Phase",
    type: "integer",
    default: 2,
  });
  R.Config("pd_limit", {
    name: "Chrono Chaser Phase",
    type: "integer",
    default: 9,
  });
  R.Config("pd_boss", {
    name: "Event Phase (SP)",
    desc: "Chrono Seeker / Qpronicle Chord / PENDUAL TALISMAN",
    type: "integer",
    default: 3,
  });
  R.Config("pd_chronodiver", {
    name: "Chrono Seeker",
    type: "integer",
    default: 3,
  });
  R.Config("pd_qproniclechord", {
    name: "Qpronicle Chord",
    type: "integer",
    default: 2,
  });
  R.Config("pd_cccollabo", {
    name: "Coca-Cola×BEMANI",
    desc: "Coca-Cola×BEMANI 店舗限定ロケテスト Phase",
    type: "integer",
    default: 3,
  });
  R.Config("pd_timephase", {
    name: "Time Phase",
    type: "integer",
    desc: "Default / Present / Future",
    default: 0,
  });

  // copula //
  R.Config("cp_boss", {
    name: "Event Phase (CP)",
    desc: "開通！とことこライン / Mystery Line",
    type: "integer",
    default: 2,
  });
  R.Config("cp_event1", {
    name: "開通！とことこライン",
    desc: "開通！とことこライン Phase",
    type: "integer",
    default: 1,
  });
  R.Config("cp_event2", {
    name: "Mystery Line",
    desc: "Mystery Line Phase",
    type: "integer",
    default: 2,
  });
  R.Config("cp_extraboss",
  {
    name: "Extra Boss Phase (CP)",
    desc: "Extra Boss Phase",
    type: "integer",
    default: 30,
  });
  R.Config("cp_bemanisummer", {
    name: "BEMANI Summer 2016",
    desc: "NEW Generation 夏の流星フェスタ2016 Phase",
    type: "integer",
    default: 2,
  });

  // SINOBUZ //
  R.Config("sb_boss", {
    name: "Event Phase (SB)",
    desc: "攻城シノバズ伝 / 忍々七鍵伝",
    type: "integer",
    default: 2,
  });
  R.Config("sb_event1", {
    name: "攻城シノバズ伝",
    desc: "攻城シノバズ伝 Phase",
    type: "integer",
    default: 2,
  });
  R.Config("sb_event2", {
    name: "忍々七鍵伝",
    desc: "忍々七鍵伝 Phase",
    type: "integer",
    default: 2,
  });
  R.Config("sb_extraboss",
  {
    name: "BUZRA ARTS",
    desc: "BUZRA ARTS Phase",
    type: "integer",
    default: 35,
  });

  // CANNON BALLERS //
  R.Config("cb_boss", {
    name: "Event Phase (SB)",
    desc: "激走！キャノンレーサー",
    type: "integer",
    default: 1,
  });
  R.Config("cb_event1", {
    name: "激走！キャノンレーサー",
    desc: "激走！キャノンレーサー Phase",
    type: "integer",
    default: 3,
  });
  R.Config("cb_extraboss",
  {
    name: "IIDX AIR RACE",
    desc: "IIDX AIR RACE Phase",
    type: "integer",
    default: 35,
  });

  // Rootage //
  R.Config("rt_boss", {
    name: "Event Phase (RT)",
    desc: "蜃気楼の図書館 / DELABITY LABORATORY",
    type: "integer",
    default: 2,
  });
  R.Config("rt_event1", {
    name: "蜃気楼の図書館",
    desc: "蜃気楼の図書館 Phase",
    type: "integer",
    default: 3,
  });
  R.Config("rt_event2", {
    name: "DELABITY LABORATORY",
    desc: "DELABITY LABORATORY Phase",
    type: "integer",
    default: 2,
  });
  R.Config("rt_extraboss",
  {
    name: "ARC SCORE",
    desc: "ARC SCORE Phase",
    type: "integer",
    default: 3,
  });

  // HEROIC VERSE //
  R.Config("hv_boss", {
    name: "Event Phase (HV)",
    desc: "HEROIC WORKOUT!!",
    type: "integer",
    default: 1,
  });
  R.Config("hv_event", {
    name: "HEROIC WORKOUT!!",
    desc: "HEROIC WORKOUT!! Phase",
    type: "integer",
    default: 4,
  });
  R.Config("hv_extraboss",
  {
    name: "SHADOW REBELLION",
    desc: "SHADOW REBELLION Phase",
    type: "integer",
    default: 1,
  });

  // BISTROVER //
  R.Config("bo_boss", {
    name: "Event Phase (BO)",
    desc: "召しませ！BISTROVER",
    type: "integer",
    default: 1,
  });
  R.Config("bo_extraboss", {
    name: "BISTRO LANDING",
    desc: "BISTRO LANDING Phase",
    type: "integer",
    default: 1,
  });
  R.Config("bo_event", {
    name: "召しませ！BISTROVER",
    desc: "召しませ！BISTROVER Phase",
    type: "integer",
    default: 1,
  });

  // CastHour //
  R.Config("ch_event", {
    name: "CastHour Space",
    desc: "CastHour Space Phase",
    type: "integer",
    default: 5,
  });
  R.Config("ch_extraboss", {
    name: "Extra Boss Phase (CH)",
    type: "integer",
    default: 3,
  });

  // RESIDENT //
  R.Config("rs_event", {
    name: "RESIDENT PARTY",
    desc: "RESIDENT PARTY Phase",
    type: "integer",
    default: 5,
  });
  R.Config("rs_extraboss", {
    name: "Extra Boss Phase (RS)",
    type: "integer",
    default: 3,
  });

  // TODO:: Reflect data when version dropdown menu has been changed //
  R.WebUIEvent("updateIIDXRival", updateRivalSettings);
  R.WebUIEvent("updateIIDXCustom", updateCustomSettings);
  R.WebUIEvent("importScoreData", importScoreData);
  R.WebUIEvent("exportScoreData", exportScoreData);

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

  MultiRoute("music.crate", musiccrate);
  MultiRoute("music.getrank", musicgetrank);
  MultiRoute("music.getralive", musicgetralive);
  MultiRoute("music.appoint", musicappoint);
  MultiRoute("music.reg", musicreg);
  MultiRoute("music.breg", musicbreg);
  MultiRoute("music.arenaCPU", musicarenacpu);

  MultiRoute("grade.raised", graderaised);

  MultiRoute("ranking.entry", rankingentry);
  MultiRoute("ranking.oentry", rankingoentry);
  MultiRoute("ranking.getranker", rankinggetranker);

  MultiRoute("gameSystem.systemInfo", gssysteminfo);

  R.Unhandled((req: EamuseInfo, data: any, send: EamuseSend) => {
    console.warn(`Unhandled Request : [${GetVersion(req)}], ${req.module}.${req.method}, ${JSON.stringify(data)}`);
    return send.success();
  });
}
