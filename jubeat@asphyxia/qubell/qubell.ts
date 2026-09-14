declare const BigInt: any; // CORE typecheck targets es2017
// jubeat Qubell (L44 2016-2017) handlers for Asphyxia CORE.
// Response layout follows bemaniutils' bemani/backend/jubeat/qubell.py (format_profile,
// format_scores, unformat_profile, __get_global_info) so the game accepts it.
// Profiles live in collection "qubell_profile", scores in "qubell_score" (separate from the
// festo collections used by the original plugin code).

// ---------------------------------------------------------------------------------------------
// helpers
// ---------------------------------------------------------------------------------------------
const fill = (n: number, v: number): number[] => new Array(n).fill(v);
const s32a = (v: number[]) => K.ARRAY("s32", v);
const fix = (v: any, n: number, def: number): number[] => {
  const a = Array.isArray(v) ? v.slice(0, n) : [];
  while (a.length < n) a.push(def);
  return a;
};

const FLAG_PLAYED = 0x1, FLAG_CLEARED = 0x2, FLAG_FC = 0x4, FLAG_EX = 0x8;

export interface QProfile {
  collection: "qubell_profile";
  jid: number;
  name: string;
  saved: boolean;
  jubility: number; jubility_yday: number;
  tune_cnt: number; save_cnt: number; saved_cnt: number; fc_cnt: number; ex_cnt: number;
  clear_cnt: number; match_cnt: number; beat_cnt: number; mynews_cnt: number;
  bonus_tune_points: number; is_bonus_tune_played: boolean;
  last: {
    play_time: number; shopname: string; areaname: string;
    music_id: number; seq_id: number; sort: number; category: number;
    expert_option: number; dig_select: number;
    marker: number; theme: number; title: number; parts: number;
    rank_sort: number; combo_disp: number; matching: number; hazard: number; hard: number;
    emblem: number[];
  };
  music_list: number[]; theme_list: number[]; marker_list: number[];
  title_list: number[]; parts_list: number[]; emblem_list: number[]; secret_list: number[];
  theme_list_new: number[]; marker_list_new: number[]; secret_list_new: number[];
  jbox_point: number; jbox_normal_index: number; jbox_premium_index: number;
  navi_flag: number;
  born_status: number; born_year: number;
  events: { [type: string]: boolean };
  digdig: any;
  stages: { [num: string]: number };
}

export interface QScore {
  collection: "qubell_score";
  musicId: number; seq: number;
  score: number; clear: number;
  playCnt: number; clearCnt: number; fcCnt: number; exCnt: number;
  bar: number[];
}

const newProfile = (name: string, jid: number): QProfile => ({
  collection: "qubell_profile",
  jid, name, saved: false,
  jubility: 0, jubility_yday: 0,
  tune_cnt: 0, save_cnt: 0, saved_cnt: 0, fc_cnt: 0, ex_cnt: 0,
  clear_cnt: 0, match_cnt: 0, beat_cnt: 0, mynews_cnt: 0,
  bonus_tune_points: 0, is_bonus_tune_played: false,
  last: {
    play_time: 0, shopname: "", areaname: "",
    music_id: 0, seq_id: 0, sort: 0, category: 0, expert_option: 0, dig_select: 0,
    marker: 0, theme: 0, title: 0, parts: 0, rank_sort: 0, combo_disp: 0,
    matching: 0, hazard: 0, hard: 0, emblem: [0, 0, 0, 0, 0],
  },
  music_list: fill(64, -1), theme_list: fill(16, -1), marker_list: fill(16, -1),
  title_list: fill(160, -1), parts_list: fill(160, -1), emblem_list: fill(96, -1),
  secret_list: fill(64, -1),
  theme_list_new: fill(16, -1), marker_list_new: fill(16, -1), secret_list_new: fill(64, -1),
  jbox_point: 0, jbox_normal_index: 2, jbox_premium_index: 1,
  navi_flag: 0, born_status: 0, born_year: 0,
  events: {}, digdig: {}, stages: {},
});

// ---------------------------------------------------------------------------------------------
// global "info" node (shopinfo.regist, gametop.get_info, and inside every profile)
// ---------------------------------------------------------------------------------------------
const EVENTS = [5, 6, 15, 19];

export const qubellInfo = () => ({
  event_info: {
    event: EVENTS.map(e => K.ATTR({ type: String(e) }, { state: K.ITEM("u8", 0) })),
  },
  share_music: {},
  bonus_music: {},
  white_music_list: s32a(fill(64, -1)),
  white_marker_list: s32a(fill(16, -1)),
  white_theme_list: s32a(fill(16, -1)),
  open_music_list: s32a(fill(64, -1)),
  shareable_music_list: s32a(fill(64, -1)),
  jbox: {
    point: K.ITEM("s32", 0),
    emblem: {
      normal: { index: K.ITEM("s16", 2) },
      premium: { index: K.ITEM("s16", 1) },
    },
  },
  born: { status: K.ITEM("s8", 0), year: K.ITEM("s16", 0) },
  digdig: {
    stage_list: {
      stage: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(n =>
        K.ATTR({ number: String(n) }, { state: K.ITEM("u8", 1) })),
    },
  },
  collection: { rating_s: {} },
  generic_dig: { map_list: {} },
  expert_option: { is_available: K.ITEM("bool", true) },
  tsumtsum: { is_available: K.ITEM("bool", true) },
  nagatanien: { is_available: K.ITEM("bool", true) },
  all_music_matching: { is_available: K.ITEM("bool", true) },
  question_list: {},
});

// ---------------------------------------------------------------------------------------------
// profile -> response
// ---------------------------------------------------------------------------------------------
const formatProfile = (p: QProfile) => {
  const l = p.last;
  const emblem = fix(l.emblem, 5, 0);
  if (emblem[1] === 0) emblem[1] = 2; // default main part, as bemaniutils does
  const dd = p.digdig || {};
  const et = dd.eternal || {};
  return {
    data: {
      info: qubellInfo(),
      player: {
        server: {},
        name: K.ITEM("str", p.name),
        jid: K.ITEM("s32", p.jid),
        session_id: K.ITEM("s32", 1),
        event_flag: K.ITEM("u64", BigInt(0)),
        info: {
          jubility: K.ITEM("s16", p.jubility | 0),
          jubility_yday: K.ITEM("s16", p.jubility_yday | 0),
          tune_cnt: K.ITEM("s32", p.tune_cnt | 0),
          save_cnt: K.ITEM("s32", p.save_cnt | 0),
          saved_cnt: K.ITEM("s32", p.saved_cnt | 0),
          fc_cnt: K.ITEM("s32", p.fc_cnt | 0),
          ex_cnt: K.ITEM("s32", p.ex_cnt | 0),
          clear_cnt: K.ITEM("s32", p.clear_cnt | 0),
          match_cnt: K.ITEM("s32", p.match_cnt | 0),
          beat_cnt: K.ITEM("s32", p.beat_cnt | 0),
          mynews_cnt: K.ITEM("s32", p.mynews_cnt | 0),
          bonus_tune_points: K.ITEM("s32", p.bonus_tune_points | 0),
          is_bonus_tune_played: K.ITEM("bool", !!p.is_bonus_tune_played),
          // "inherit" true = treat as returning player (no tutorial) on the first save
          inherit: K.ITEM("bool", !p.saved),
          mtg_entry_cnt: K.ITEM("s32", 123),
          mtg_hold_cnt: K.ITEM("s32", 456),
          mtg_result: K.ITEM("u8", 10),
        },
        last: {
          play_time: K.ITEM("s64", BigInt(l.play_time | 0)),
          shopname: K.ITEM("str", l.shopname || ""),
          areaname: K.ITEM("str", l.areaname || ""),
          music_id: K.ITEM("s32", l.music_id | 0),
          seq_id: K.ITEM("s8", l.seq_id | 0),
          sort: K.ITEM("s8", l.sort | 0),
          category: K.ITEM("s8", l.category | 0),
          expert_option: K.ITEM("s8", l.expert_option | 0),
          dig_select: K.ITEM("s32", l.dig_select | 0),
          settings: {
            marker: K.ITEM("s8", l.marker | 0),
            theme: K.ITEM("s8", l.theme | 0),
            title: K.ITEM("s16", l.title | 0),
            parts: K.ITEM("s16", l.parts | 0),
            rank_sort: K.ITEM("s8", l.rank_sort | 0),
            combo_disp: K.ITEM("s8", l.combo_disp | 0),
            matching: K.ITEM("s8", l.matching | 0),
            hazard: K.ITEM("s8", l.hazard | 0),
            hard: K.ITEM("s8", l.hard | 0),
            emblem: K.ARRAY("s16", emblem),
          },
        },
        item: {
          music_list: s32a(fix(p.music_list, 64, -1)),
          secret_list: s32a(fill(64, -1)),          // force-unlock everything
          theme_list: s32a(fix(p.theme_list, 16, -1)),
          marker_list: s32a(fix(p.marker_list, 16, -1)),
          title_list: s32a(fix(p.title_list, 160, -1)),
          parts_list: s32a(fix(p.parts_list, 160, -1)),
          emblem_list: s32a(fix(p.emblem_list, 96, -1)),
          new: {
            secret_list: s32a(fill(64, -1)),
            theme_list: s32a(fix(p.theme_list_new, 16, -1)),
            marker_list: s32a(fix(p.marker_list_new, 16, -1)),
          },
        },
        rivallist: K.ATTR({ count: "0" }),
        lab_edit_seq: K.ATTR({ count: "0" }),
        fc_challenge: {
          today: { music_id: K.ITEM("s32", -1), state: K.ITEM("u8", 0) },
          whim: { music_id: K.ITEM("s32", -1), state: K.ITEM("u8", 0) },
        },
        news: { checked: K.ITEM("s16", 0), checked_flag: K.ITEM("u32", 0) },
        history: K.ATTR({ count: "0" }),
        free_first_play: { is_available: K.ITEM("bool", false) },
        navi: { flag: K.ITEM("u64", BigInt(p.navi_flag | 0)) },
        event_info: {
          event: Object.keys(p.events || {}).map(t =>
            K.ATTR({ type: t }, { state: K.ITEM("u8", p.events[t] ? 2 : 0) })),
        },
        jbox: {
          point: K.ITEM("s32", p.jbox_point | 0),
          emblem: {
            normal: { index: K.ITEM("s16", p.jbox_normal_index || 2) },
            premium: { index: K.ITEM("s16", p.jbox_premium_index || 1) },
          },
        },
        digdig: {
          flag: K.ITEM("u64", BigInt(dd.flag | 0)),
          main: {
            stage: K.ATTR({ number: String(dd.stage_number || 1) }, {
              point: K.ITEM("s32", dd.point | 0),
              param: s32a(fix(dd.param, 12, 0)),
            }),
          },
          eternal: {
            ratio: K.ITEM("s32", 1),
            used_point: K.ITEM("s64", BigInt(et.used_point | 0)),
            point: K.ITEM("s64", BigInt(et.point | 0)),
            excavated_point: K.ITEM("s64", BigInt(et.excavated_point | 0)),
            cube: {
              state: K.ARRAY("s8", fix(et.state, 12, 0)),
              item: {
                kind: s32a(fix(et.item_kind, 12, 0)),
                value: s32a(fix(et.item_value, 12, 0)),
              },
              norma: {
                till_time: K.ARRAY("s64", fill(12, 0).map(() => BigInt(0))),
                kind: s32a(fix(et.norma_kind, 12, 0)),
                value: s32a(fix(et.norma_value, 12, 0)),
                param: s32a(fix(et.norma_param, 12, 0)),
              },
            },
          },
        },
        unlock: {
          main: {
            stage_list: {
              stage: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].map(n =>
                K.ATTR({ number: String(n) }, { state: K.ITEM("u8", (p.stages && p.stages[String(n)]) | 0) })),
            },
          },
        },
        generic_dig: { map_list: {} },
        new_music: {},
        gift_list: {},
        born: { status: K.ITEM("s8", p.born_status | 0), year: K.ITEM("s16", p.born_year | 0) },
        question_list: {},
      },
    },
  };
};

// ---------------------------------------------------------------------------------------------
// DB access
// ---------------------------------------------------------------------------------------------
const findProfile = (refid: string) =>
  DB.FindOne<QProfile>(refid, { collection: "qubell_profile" });

const nextJid = async (): Promise<number> => {
  // 8-digit id, retried until unused
  for (let i = 0; i < 20; i++) {
    const jid = 10000000 + Math.floor(Math.random() * 89999999);
    const hit = await DB.FindOne<QProfile>(null, { collection: "qubell_profile", jid });
    if (!hit) return jid;
  }
  return 10000000 + Math.floor(Math.random() * 89999999);
};

// ---------------------------------------------------------------------------------------------
// routes
// ---------------------------------------------------------------------------------------------
export const shopinfoRegist = (info: EamuseInfo, data: any, send: EamuseSend) => {
  const locId = $(data).str("data.shop.locationid", "nowhere");
  return send.object({
    data: {
      cabid: K.ITEM("u32", 1),
      locationid: K.ITEM("str", locId || "nowhere"),
      tax_phase: K.ITEM("u8", 1),
      facility: { exist: K.ITEM("u32", 1) },
      info: qubellInfo(),
    },
  }, { compress: true });
};

export const gametopGetInfo = (info: EamuseInfo, data: any, send: EamuseSend) =>
  send.object({ data: { info: qubellInfo() } }, { compress: true });

export const gametopGetMeeting = (info: EamuseInfo, data: any, send: EamuseSend) =>
  send.object({
    data: {
      meeting: { single: K.ATTR({ count: "0" }), tag: K.ATTR({ count: "0" }) },
      reward: { total: K.ITEM("s32", -1), point: K.ITEM("s32", -1) },
    },
  }, { compress: true });

export const gametopRegist = async (info: EamuseInfo, data: any, send: EamuseSend) => {
  const refid = $(data).str("data.player.refid");
  const name = $(data).str("data.player.name") || "なし";
  if (!refid) return send.deny();
  let p = await findProfile(refid);
  if (!p) {
    const np = newProfile(name, await nextJid());
    await DB.Upsert<QProfile>(refid, { collection: "qubell_profile" }, np);
    p = await findProfile(refid);
  }
  console.log(`[qubell] gametop.regist -> jid ${p.jid} name ${p.name}`);
  return send.object(formatProfile(p), { compress: true });
};

export const gametopGetPdata = async (info: EamuseInfo, data: any, send: EamuseSend) => {
  const refid = $(data).str("data.player.refid");
  if (!refid) return send.deny();
  let p = await findProfile(refid);
  if (!p) {
    // The card is already bound to this game on the CORE side (it went through registration
    // once with the festo-format code), so Qubell never calls gametop.regist again and treats a
    // "no profile" status as a login failure. Create the Qubell profile here instead, reusing
    // the name from the old festo-format profile if one exists.
    const old: any = await DB.FindOne<any>(refid, { collection: "profile" });
    const name = (old && old.name) ? String(old.name) : "なし";
    await DB.Upsert<QProfile>(refid, { collection: "qubell_profile" }, newProfile(name, await nextJid()));
    p = await findProfile(refid);
    console.log(`[qubell] gametop.get_pdata: created profile on the fly, name=${name} jid=${p.jid}`);
  }
  console.log(`[qubell] gametop.get_pdata -> jid ${p.jid} name ${p.name}`);
  return send.object(formatProfile(p), { compress: true });
};

export const gametopGetMdata = async (info: EamuseInfo, data: any, send: EamuseSend) => {
  const jid = $(data).number("data.player.jid");
  const mdataVer = $(data).number("data.player.mdata_ver", 1);
  if (!jid) return send.deny();
  const p = await DB.FindOne<QProfile>(null, { collection: "qubell_profile", jid });
  if (!p) return send.status(109);

  // all scores go out in partition 1; later partitions are empty
  const scores = mdataVer === 1
    ? await DB.Find<QScore>(p.__refid, { collection: "qubell_score" })
    : [];

  const byMusic: { [id: string]: QScore[] } = {};
  for (const s of scores) (byMusic[String(s.musicId)] = byMusic[String(s.musicId)] || []).push(s);

  const musicdata = Object.keys(byMusic).map(id => {
    const play = [0, 0, 0], clr = [0, 0, 0], fc = [0, 0, 0], ex = [0, 0, 0], pts = [0, 0, 0], flags = [0, 0, 0];
    const bars: any[] = [];
    for (const s of byMusic[id]) {
      if (s.seq < 0 || s.seq > 2) continue;
      play[s.seq] = s.playCnt | 0; clr[s.seq] = s.clearCnt | 0; fc[s.seq] = s.fcCnt | 0; ex[s.seq] = s.exCnt | 0;
      pts[s.seq] = s.score | 0;
      let f = FLAG_PLAYED;
      if (s.clearCnt > 0) f |= FLAG_CLEARED;
      if (s.fcCnt > 0) f |= FLAG_FC;
      if (s.exCnt > 0) f |= FLAG_EX;
      flags[s.seq] = f;
      if (s.bar && s.bar.length) bars.push(K.ARRAY("u8", fix(s.bar, 30, 0), { seq: String(s.seq) }));
    }
    return K.ATTR({ music_id: id }, {
      play_cnt: s32a(play), clear_cnt: s32a(clr), fc_cnt: s32a(fc), ex_cnt: s32a(ex),
      score: s32a(pts), clear: K.ARRAY("s8", flags),
      ...(bars.length ? { bar: bars } : {}),
    });
  });

  console.log(`[qubell] gametop.get_mdata jid ${jid} ver ${mdataVer} -> ${musicdata.length} songs`);
  return send.object({
    data: { player: { jid: K.ITEM("s32", jid), mdata_list: { musicdata } } },
  }, { compress: true });
};

export const gameendRegist = async (info: EamuseInfo, data: any, send: EamuseSend) => {
  const refid = $(data).str("data.player.refid");
  if (!refid) return send.deny();
  const p = await findProfile(refid);
  if (!p) return send.deny();
  const d = $(data);
  const num = (path: string, def: number) => { const v = d.number(path); return (v === undefined || v === null || isNaN(v)) ? def : v; };
  const nums = (path: string, n: number, cur: number[]) => { const v = d.numbers(path); return (v && v.length) ? fix(v, n, -1) : cur; };

  p.saved = true;
  p.last.play_time = num("data.info.time_gameend", p.last.play_time);
  p.last.shopname = d.str("data.info.shopname") || p.last.shopname;
  p.last.areaname = d.str("data.info.areaname") || p.last.areaname;

  const I = "data.player.info.";
  p.jubility = num(I + "jubility", p.jubility); p.jubility_yday = num(I + "jubility_yday", p.jubility_yday);
  p.tune_cnt = num(I + "tune_cnt", p.tune_cnt); p.save_cnt = num(I + "save_cnt", p.save_cnt);
  p.saved_cnt = num(I + "saved_cnt", p.saved_cnt); p.fc_cnt = num(I + "fc_cnt", p.fc_cnt);
  p.ex_cnt = num(I + "ex_cnt", p.ex_cnt); p.clear_cnt = num(I + "clear_cnt", p.clear_cnt);
  p.match_cnt = num(I + "match_cnt", p.match_cnt); p.beat_cnt = num(I + "beat_cnt", p.beat_cnt);
  p.mynews_cnt = num(I + "mynews_cnt", p.mynews_cnt);
  p.bonus_tune_points = num(I + "bonus_tune_points", p.bonus_tune_points);
  p.is_bonus_tune_played = d.bool(I + "is_bonus_tune_played");

  const L = "data.player.last.";
  p.last.expert_option = num(L + "expert_option", p.last.expert_option);
  p.last.dig_select = num(L + "dig_select", p.last.dig_select);
  p.last.sort = num(L + "sort", p.last.sort);
  p.last.category = num(L + "category", p.last.category);
  const S = L + "settings.";
  p.last.matching = num(S + "matching", p.last.matching); p.last.hazard = num(S + "hazard", p.last.hazard);
  p.last.hard = num(S + "hard", p.last.hard); p.last.marker = num(S + "marker", p.last.marker);
  p.last.theme = num(S + "theme", p.last.theme); p.last.title = num(S + "title", p.last.title);
  p.last.parts = num(S + "parts", p.last.parts); p.last.rank_sort = num(S + "rank_sort", p.last.rank_sort);
  p.last.combo_disp = num(S + "combo_disp", p.last.combo_disp);
  p.last.emblem = fix(d.numbers(S + "emblem") || p.last.emblem, 5, 0);

  const T = "data.player.item.";
  p.music_list = nums(T + "music_list", 64, p.music_list);
  p.theme_list = nums(T + "theme_list", 16, p.theme_list);
  p.marker_list = nums(T + "marker_list", 16, p.marker_list);
  p.title_list = nums(T + "title_list", 160, p.title_list);
  p.parts_list = nums(T + "parts_list", 160, p.parts_list);
  p.emblem_list = nums(T + "emblem_list", 96, p.emblem_list);
  p.theme_list_new = nums(T + "new.theme_list", 16, p.theme_list_new);
  p.marker_list_new = nums(T + "new.marker_list", 16, p.marker_list_new);

  p.jbox_point = num("data.player.jbox.point", p.jbox_point);
  const jbType = num("data.player.jbox.emblem.type", 0), jbIndex = num("data.player.jbox.emblem.index", 0);
  if (jbType === 1) p.jbox_normal_index = jbIndex;
  else if (jbType === 2) p.jbox_premium_index = jbIndex;

  p.navi_flag = num("data.player.navi.flag", p.navi_flag);
  p.born_status = num("data.player.born.status", p.born_status);
  p.born_year = num("data.player.born.year", p.born_year);

  for (const ev of d.elements("data.player.event_info.event") || []) {
    const t = ev.attr("").type;
    if (t !== undefined) p.events[String(t)] = ev.bool("is_completed");
  }

  const dd = p.digdig || {};
  if (d.element("data.player.digdig")) {
    dd.flag = num("data.player.digdig.flag", dd.flag | 0);
    const st = d.element("data.player.digdig.main.stage");
    if (st) {
      const sn = parseInt(d.attr("data.player.digdig.main.stage").number);
      if (!isNaN(sn)) dd.stage_number = sn;
      dd.point = num("data.player.digdig.main.stage.point", dd.point | 0);
      dd.param = fix(d.numbers("data.player.digdig.main.stage.param") || dd.param, 12, 0);
      if (d.bool("data.player.digdig.main.stage.uc_available") && !isNaN(sn)) {
        p.stages[String(sn)] = (p.stages[String(sn)] | 0) | 0x2;
      }
    }
    if (d.element("data.player.digdig.eternal")) {
      const E = "data.player.digdig.eternal.";
      dd.eternal = dd.eternal || {};
      dd.eternal.used_point = num(E + "used_point", 0);
      dd.eternal.point = num(E + "point", 0);
      dd.eternal.excavated_point = num(E + "excavated_point", 0);
      dd.eternal.state = fix(d.numbers(E + "cube.state"), 12, 0);
      dd.eternal.item_kind = fix(d.numbers(E + "cube.item.kind"), 12, 0);
      dd.eternal.item_value = fix(d.numbers(E + "cube.item.value"), 12, 0);
      dd.eternal.norma_kind = fix(d.numbers(E + "cube.norma.kind"), 12, 0);
      dd.eternal.norma_value = fix(d.numbers(E + "cube.norma.value"), 12, 0);
      dd.eternal.norma_param = fix(d.numbers(E + "cube.norma.param"), 12, 0);
    }
  }
  const ust = d.element("data.player.unlock.main.stage");
  if (ust) {
    const sn = parseInt(d.attr("data.player.unlock.main.stage").number);
    const state = num("data.player.unlock.main.stage.state", 0);
    if (!isNaN(sn)) {
      p.stages[String(sn)] = state;
      if (sn === 13 && (state & 0x18) > 0) dd.flag = (dd.flag | 0) | 0x2;
    }
  }
  p.digdig = dd;

  // scores
  let saved = 0;
  for (const tune of d.elements("data.result.tune") || []) {
    const musicId = tune.number("music");
    const sa = tune.attr("player.score") || {};
    const seq = parseInt(sa.seq), flags = parseInt(sa.clear) | 0;
    const points = tune.number("player.score") | 0;
    const bar = tune.numbers("player.mbar");
    if (!musicId || isNaN(seq)) continue;
    p.last.music_id = musicId; p.last.seq_id = seq;
    const old = await DB.FindOne<QScore>(refid, { collection: "qubell_score", musicId, seq });
    const ns: QScore = old || { collection: "qubell_score", musicId, seq, score: 0, clear: 0, playCnt: 0, clearCnt: 0, fcCnt: 0, exCnt: 0, bar: [] };
    ns.playCnt++;
    if (flags & FLAG_CLEARED) ns.clearCnt++;
    if (flags & FLAG_FC) ns.fcCnt++;
    if (flags & FLAG_EX) ns.exCnt++;
    ns.score = Math.max(ns.score | 0, points);
    ns.clear = (ns.clear | 0) | flags;
    if (bar && bar.length) ns.bar = bar;
    await DB.Upsert<QScore>(refid, { collection: "qubell_score", musicId, seq }, {
      $set: { musicId, seq, score: ns.score, clear: ns.clear, playCnt: ns.playCnt, clearCnt: ns.clearCnt, fcCnt: ns.fcCnt, exCnt: ns.exCnt, bar: ns.bar },
    });
    saved++;
  }

  const { __refid, _id, createdAt, updatedAt, ...plain } = p as any;
  await DB.Update<QProfile>(refid, { collection: "qubell_profile" }, { $set: plain });
  console.log(`[qubell] gameend.regist jid ${p.jid}: ${saved} tune(s) saved`);
  return send.object({
    data: { player: { session_id: K.ITEM("s32", 1), end_final_session_id: K.ITEM("s32", 1) } },
  }, { compress: true });
};

export const gameendFinal = async (info: EamuseInfo, data: any, send: EamuseSend) => {
  const refid = $(data).str("data.player.refid");
  if (refid) {
    const p = await findProfile(refid);
    if (p) {
      const d = $(data);
      const jbType = d.number("data.player.jbox.emblem.type"), jbIndex = d.number("data.player.jbox.emblem.index");
      const upd: any = {};
      const pt = d.number("data.player.jbox.point"); if (pt !== undefined && !isNaN(pt)) upd.jbox_point = pt;
      if (jbType === 1) upd.jbox_normal_index = jbIndex; else if (jbType === 2) upd.jbox_premium_index = jbIndex;
      const bs = d.number("data.player.born.status"); if (bs !== undefined && !isNaN(bs)) upd.born_status = bs;
      const by = d.number("data.player.born.year"); if (by !== undefined && !isNaN(by)) upd.born_year = by;
      if (Object.keys(upd).length) await DB.Update<QProfile>(refid, { collection: "qubell_profile" }, { $set: upd });
    }
  }
  return send.success();
};

export const lobbyCheck = (info: EamuseInfo, data: any, send: EamuseSend) =>
  send.object({
    data: {
      interval: K.ITEM("s16", 0),
      entry_timeout: K.ITEM("s16", 0),
      entrant_nr: K.ITEM("u32", 0, { time: "0" }),
    },
  }, { compress: true });

export const demodataGetNews = (info: EamuseInfo, data: any, send: EamuseSend) =>
  send.object({ data: { officialnews: K.ATTR({ count: "0" }) } }, { compress: true });

export const demodataGetHitchart = (info: EamuseInfo, data: any, send: EamuseSend) => {
  const now = new Date();
  const pad = (n: number) => (n < 10 ? "0" : "") + n;
  return send.object({
    data: {
      update: K.ITEM("str", `${pad(now.getDate())}/${pad(now.getMonth() + 1)}/${now.getFullYear()}`),
      hitchart_lic: K.ATTR({ count: "0" }),
      hitchart_org: K.ATTR({ count: "0" }),
    },
  }, { compress: true });
};

export const recommendGetRecommend = (info: EamuseInfo, data: any, send: EamuseSend) =>
  send.object({ data: { player: { music_list: {} } } }, { compress: true });
