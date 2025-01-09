export interface pcdata {
  collection: "pcdata";

  version: number;

  spnum: number; 
  dpnum: number;
  sach: number;
  dach: number;
  sflg0: number;
  sflg1: number;
  sflg2: number;
  gno: number;
  timing: number;
  sdhd: number;
  sp_opt: number;
  dp_opt: number;
  dp_opt2: number;
  mcomb: number;
  ncomb: number;
  mode: number;
  category: number; // attribute (Pinky Crush) //
  pmode: number;
  liflen: number;
  judge: number; // attribute (tricoro) //
  opstyle: number;
  hispeed: number;
  judgeAdj: number;

  notes: number; // attribute (Lincle) //
  pase: number;
  sdtype: number;
  help: number;
  fcombo: number[]; 
  ngrade: number; // attribute (BISTROVER) //
  rtype: number; // attribute (Heroic Verse) //
  bgnflg: number; // attribute (Pinky Crush) //
  player_kind: number; // attribute (EPOLIS) //
  gpos: number;

  s_sorttype: number;
  d_sorttype: number;
  s_pace: number;
  d_pace: number;
  s_gno: number;
  d_gno: number;
  s_sub_gno: number;
  d_sub_gno: number;
  s_gtype: number;
  d_gtype: number;
  s_sdlen: number;
  d_sdlen: number;
  s_sdtype: number;
  d_sdtype: number;
  s_timing: number;
  d_timing: number;
  s_notes: number;
  d_notes: number;
  s_judge: number;
  d_judge: number;
  s_judgeAdj: number;
  d_judgeAdj: number;
  s_hispeed: number;
  d_hispeed: number;
  s_liflen: number;
  d_liflen: number;
  s_disp_judge: number;
  d_disp_judge: number;
  s_opstyle: number;
  d_opstyle: number;
  s_exscore: number; // PENDUAL //
  d_exscore: number;
  s_largejudge: number;
  d_largejudge: number;
  s_graph_score: number;
  d_graph_score: number;
  s_auto_scrach: number;
  d_auto_scrach: number;
  s_gauge_disp: number;
  d_gauge_disp: number;
  s_lane_brignt: number;
  d_lane_brignt: number;
  s_camera_layout: number;
  d_camera_layout: number;
  s_ghost_score: number;
  d_ghost_score: number;
  s_tsujigiri_disp: number;
  d_tsujigiri_disp: number;
  s_auto_adjust: number; // CastHour //
  d_auto_adjust: number;
  s_timing_split: number; // RESIDENT //
  d_timing_split: number;
  s_visualization: number;
  d_visualization: number;
  s_classic_hispeed: number; // EPOLIS //
  d_classic_hispeed: number;
  movie_thumbnail: number; // Pinky Crush //

  secret_flg1: string[]; // secret (Heroic Verse) //
  secret_flg2: string[];
  secret_flg3: string[];
  secret_flg4: string[];
  secret_flg5: string[]; // secret (Pinky Crush) //

  leggendaria_flg1: string[]; // leggendaria (BISTROVER) //
  leggendaria_flg2: string[]; // leggendaria (Pinky Crush) //

  dr_sprank: number[]; // djrank (Heroic Verse) //
  dr_sppoint: number[];
  dr_dprank: number[];
  dr_dppoint: number[];

  nr_spradar: number[]; // notes_radar (Heroic Verse) //
  nr_dpradar: number[];

  achi_lastweekly: number; // achievement (Heroic Verse) //
  achi_pack: number;
  achi_packcomp: number;
  achi_rivalcrush: number;
  achi_visitflg: number;
  achi_weeklynum: number;
  achi_trophy: string[]; // for somewhat reason save throws lots of elements but sending it as-is throws error //

  deller: number; // in-game currency (Lincle) //
  orb: number; // v-disc (SPADA) //
  present_orb: number; // v-disc but not sure what it does (Rootage) //

  sgid: number; // grade //
  dgid: number;

  gold_now: number;
  gold_all: number;
  gold_use: number;

  jewel_num: string;
  jewel_bnum: number[];
  party: number[];

  jpoint: number; // jpoint (Lincle) //

  st_sp_ach: number; // step (Lincle) //
  st_sp_dif: number;
  st_dp_ach: number;
  st_dp_dif: number;

  st_sp_hdpt: number; // tricoro //
  st_dp_hdpt: number;
  st_sp_round: number;
  st_dp_round: number;
  st_review: number;
  st_stamp: any;
  st_help: any; // save as base64 string, sent as buffer //

  st_damage: number; // SPADA //
  st_defeat: number;
  st_round: number;
  st_sp_mission: number;
  st_dp_mission: number;
  st_sp_level: number;
  st_dp_level: number;
  st_sp_level_h: number; // Pinky Crush //
  st_dp_level_h: number;
  st_sp_level_exh: number; // Pinky Crush //
  st_dp_level_exh: number;
  st_sp_mplay: number;
  st_dp_mplay: number;
  st_last_select: number;
  st_album: any;

  st_is_secret: number; // PENDUAL //
  st_age_list: number;
  st_is_present: number;
  st_is_future: number;

  st_friendship: number; // copula //
  st_station_clear: number;
  st_station_play: number;
  st_mission_gauge: number;
  st_tokimeki: any;

  st_point: number; // Cannon Ballers //

  st_enemy_damage: number; // Heroic Verse //
  st_progress: number;
  st_is_track_ticket: boolean;
  st_sp_mission_point: number;
  st_dp_mission_point: number;
  st_sp_dj_mission_level: number;
  st_dp_dj_mission_level: number;
  st_sp_clear_mission_level: number;
  st_dp_clear_mission_level: number;
  st_sp_dj_mission_clear: number;
  st_dp_dj_mission_clear: number;
  st_sp_clear_mission_clear: number;
  st_dp_clear_mission_clear: number;
  st_tips_read_list: number;

  st_total_point: number; // CastHour //
  st_enemy_defeat_flg: number;
  st_mission_clear_num: number;

  st_sp_fluctuation: number; // RESIDENT //
  st_dp_fluctuation: number;

  event_play_num: number; // event (HEROIC VERSE) //
  event_last_select_id: number;
  event_last_select_type: number; // CastHour //
  event_story_prog: number; // BISTROVER //
  event_failed_num: number;
  event_skip: boolean;

  type: number[]; // history (Lincle) //
  time: number[];
  p0: number[];
  p1: number[];
  p2: number[];
  p3: number[];
  p4: number[];

  sp_mlist: any; // favorite (SPADA), save as base64 string, sent as buffer //
  sp_clist: any;
  dp_mlist: any;
  dp_clist: any;

  eb_keyorb: number; // extra boss (Heroic Verse) //
  eb_bossorb0: number;
  eb_bossorb1: number;
  eb_bossorb2: number;
  eb_bossorb3: number;
  eb_bossorb4: number;
  eb_bossorb5: number;
  eb_bossorb6: number;
  eb_bossorb7: number;
  eb_bossorb8: number;

  tourism_secret_flg1: string[];
  tourism_secret_flg2: string[];
}

export const GLD_pcdata = {
  version: 14,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  sflg2: 0,
  gno: 0,
  sdhd: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mcomb: 0,
  ncomb: 0,
  mode: 0,
  pmode: 0,

  sgid: -1,
  dgid: -1,

  gold_now: 0,
  gold_all: 0,
  gold_use: 0,
}

export const HDD_pcdata = {
  version: 15,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  sflg2: 0,
  gno: 0,
  sdhd: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mcomb: 0,
  ncomb: 0,
  mode: 0,
  pmode: 0,

  sgid: -1,
  dgid: -1,
}

export const I00_pcdata = {
  version: 16,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  sflg2: 0,
  gno: 0,
  sdhd: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mcomb: 0,
  ncomb: 0,
  mode: 0,
  pmode: 0,
  liflen: 0,

  jewel_num: "0",
  jewel_bnum: Array<number>(18).fill(0),
  fcombo: Array<number>(2).fill(0),

  sgid: -1,
  dgid: -1,
}

export const JDJ_pcdata = {
  version: 17,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  gno: 0,
  timing: 0,
  sdhd: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mcomb: 0,
  ncomb: 0,
  mode: 0,
  pmode: 0,
  liflen: 0,

  fcombo: Array<number>(2).fill(0),
  party: Array<number>(24).fill(0),

  sgid: -1,
  dgid: -1,
}

export const JDZ_pcdata = {
  version: 18,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  gno: 0,
  timing: 0,
  sdhd: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mcomb: 0,
  ncomb: 0,
  mode: 0,
  pmode: 0,
  liflen: 0,

  fcombo: Array<number>(2).fill(0),

  sgid: -1,
  dgid: -1,
}

export const KDZ_pcdata = {
  version: 19,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  sflg0: 0,
  sflg1: 0,
  help: 1,
  gno: 0,
  timing: 0,
  sdhd: 0,
  sdtype: 0,
  notes: 0,
  pase: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mode: 0,
  pmode: 0,
  fcombo: Array<number>(2).fill(0),
  liflen: 0,

  sgid: -1,
  dgid: -1,

  jpoint: 0,

  st_sp_ach: -1,
  st_sp_dif: -1,
  st_dp_ach: -1,
  st_dp_dif: -1,

  type: Array<number>(30).fill(255),
  time: Array<number>(30).fill(0),
  p0: Array<number>(30).fill(-1),
  p1: Array<number>(30).fill(-1),
  p2: Array<number>(30).fill(-1),
  p3: Array<number>(30).fill(-1),
  p4: Array<number>(30).fill(-1),
}

export const LDJ_pcdata = {
  version: 20,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  help: 0,
  gno: 0,
  gpos: 0,
  timing: 0,
  sdhd: 0,
  sdtype: 0,
  notes: 0,
  pase: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  mode: 0,
  pmode: 0,
  liflen: 0,
  judge: 0,
  opstyle: 0,
  hispeed: 0,
  judgeAdj: 0,
  fcombo: Array<number>(2).fill(0),

  sgid: -1,
  dgid: -1,

  st_sp_ach: 0,
  st_sp_hdpt: 0,
  st_sp_level: 0,
  st_sp_round: 0,
  st_sp_mplay: 0,
  st_dp_ach: 0,
  st_dp_hdpt: 0,
  st_dp_level: 0,
  st_dp_round: 0,
  st_dp_mplay: 0,
  st_review: 0,
  st_stamp: null,
  st_help: null,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX21_pcdata = {
  version: 21,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  st_damage: 0,
  st_defeat: 0,
  st_progress: 0,
  st_round: 0,
  st_sp_mission: 0,
  st_dp_mission: 0,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_last_select: 0,
  st_album: null,

  achi_pack: 0,
  achi_packcomp: 0,
  achi_lastweekly: 0,
  achi_weeklynum: 0,
  achi_visitflg: 0,
  achi_rivalcrush: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX22_pcdata = {
  version: 22,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_exscore: 0,
  d_exscore: 0,
  s_largejudge: 0,
  d_largejudge: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  st_damage: 0,
  st_defeat: 0,
  st_progress: 0,
  st_sp_mission: 0,
  st_dp_mission: 0,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_age_list: 0,
  st_is_secret: 0,
  st_is_present: 0,
  st_is_future: 0,
  st_album: null,

  achi_pack: 0,
  achi_packcomp: 0,
  achi_lastweekly: 0,
  achi_weeklynum: 0,
  achi_visitflg: 0,
  achi_rivalcrush: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX23_pcdata = {
  version: 23,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_exscore: 0,
  d_exscore: 0,
  s_largejudge: 0,
  d_largejudge: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  st_friendship: 0,
  st_progress: 0,
  st_station_clear: 0,
  st_station_play: 0,
  st_sp_mission: 0,
  st_dp_mission: 0,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_mission_gauge: 0,
  st_tokimeki: null,

  achi_pack: 0,
  achi_packcomp: 0,
  achi_lastweekly: 0,
  achi_weeklynum: 0,
  achi_visitflg: 0,
  achi_rivalcrush: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX24_pcdata = {
  version: 24,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,

  d_disp_judge: 0,
  d_exscore: 0,
  d_gno: 0,
  d_graph_score: 0,
  d_gtype: 0,
  d_hispeed: 0,
  d_judge: 0,
  d_judgeAdj: 0,
  d_liflen: 0,
  d_notes: 0,
  d_opstyle: 0,
  d_pace: 0,
  d_sdlen: 0,
  d_sdtype: 0,
  d_sorttype: 0,
  d_timing: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  s_disp_judge: 0,
  s_exscore: 0,
  s_gno: 0,
  s_graph_score: 0,
  s_gtype: 0,
  s_hispeed: 0,
  s_judge: 0,
  s_judgeAdj: 0,
  s_liflen: 0,
  s_notes: 0,
  s_opstyle: 0,
  s_pace: 0,
  s_sdlen: 0,
  s_sdtype: 0,
  s_sorttype: 0,
  s_timing: 0,
  sp_opt: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  event_play_num: 0,
  event_last_select_id: -1,
  event2_play_num: 0,
  event2_last_select_id: -1,

  st_enemy_damage: 0,
  st_progress: 0,
  st_enemy_defeat_flg: 0,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,

  achi_pack: 0,
  achi_packcomp: 0,
  achi_lastweekly: 0,
  achi_weeklynum: 0,
  achi_visitflg: 0,
  achi_rivalcrush: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX25_pcdata = {
  version: 25,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,

  d_auto_scrach: 0,
  d_camera_layout: 0,
  d_disp_judge: 0,
  d_exscore: 0,
  d_gauge_disp: 0,
  d_gno: 0,
  d_graph_score: 0,
  d_gtype: 0,
  d_hispeed: 0,
  d_judge: 0,
  d_judgeAdj: 0,
  d_lane_brignt: 0,
  d_liflen: 0,
  d_notes: 0,
  d_opstyle: 0,
  d_pace: 0,
  d_sdlen: 0,
  d_sdtype: 0,
  d_sorttype: 0,
  d_timing: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  s_auto_scrach: 0,
  s_camera_layout: 0,
  s_disp_judge: 0,
  s_exscore: 0,
  s_gauge_disp: 0,
  s_gno: 0,
  s_graph_score: 0,
  s_gtype: 0,
  s_hispeed: 0,
  s_judge: 0,
  s_judgeAdj: 0,
  s_lane_brignt: 0,
  s_liflen: 0,
  s_notes: 0,
  s_opstyle: 0,
  s_pace: 0,
  s_sdlen: 0,
  s_sdtype: 0,
  s_sorttype: 0,
  s_timing: 0,
  sp_opt: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_point: 0,
  st_enemy_defeat_flg: 0,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
}

export const IIDX26_pcdata = {
  version: 26,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,

  d_auto_scrach: 0,
  d_camera_layout: 0,
  d_disp_judge: 0,
  d_gauge_disp: 0,
  d_ghost_score: 0,
  d_gno: 0,
  d_graph_score: 0,
  d_gtype: 0,
  d_hispeed: 0,
  d_judge: 0,
  d_judgeAdj: 0,
  d_lane_brignt: 0,
  d_liflen: 0,
  d_notes: 0,
  d_opstyle: 0,
  d_pace: 0,
  d_sdlen: 0,
  d_sdtype: 0,
  d_sorttype: 0,
  d_timing: 0,
  d_tsujigiri_disp: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  s_auto_scrach: 0,
  s_camera_layout: 0,
  s_disp_judge: 0,
  s_gauge_disp: 0,
  s_ghost_score: 0,
  s_gno: 0,
  s_graph_score: 0,
  s_gtype: 0,
  s_hispeed: 0,
  s_judge: 0,
  s_judgeAdj: 0,
  s_lane_brignt: 0,
  s_liflen: 0,
  s_notes: 0,
  s_opstyle: 0,
  s_pace: 0,
  s_sdlen: 0,
  s_sdtype: 0,
  s_sorttype: 0,
  s_timing: 0,
  s_tsujigiri_disp: 0,
  sp_opt: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),

  sgid: -1,
  dgid: -1,

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mission_point: 0,
  st_dp_mission_point: 0,
  st_sp_dj_mission_level: 0,
  st_dp_dj_mission_level: 0,
  st_sp_clear_mission_level: 0,
  st_dp_clear_mission_level: 0,
  st_sp_dj_mission_clear: 0,
  st_dp_dj_mission_clear: 0,
  st_sp_clear_mission_clear: 0,
  st_dp_clear_mission_clear: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
  present_orb: 0,

  eb_bossorb0: 0,
  eb_bossorb1: 0,
  eb_bossorb2: 0,
  eb_bossorb3: 0,
  eb_bossorb4: 0,
  eb_bossorb5: 0,
  eb_bossorb6: 0,
  eb_bossorb7: 0,
  eb_bossorb8: 0,

  event_play_num: 0,
  event_last_select_id: -1,
  event2_play_num: 0,
  event2_last_select_id: -1,
}

export const IIDX27_pcdata = {
  version: 27,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mission_point: 0,
  st_dp_mission_point: 0,
  st_sp_dj_mission_level: 0,
  st_dp_dj_mission_level: 0,
  st_sp_clear_mission_level: 0,
  st_dp_clear_mission_level: 0,
  st_sp_dj_mission_clear: 0,
  st_dp_dj_mission_clear: 0,
  st_sp_clear_mission_clear: 0,
  st_dp_clear_mission_clear: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,

  eb_keyorb: 0,
  eb_bossorb0: 0,
  eb_bossorb1: 0,
  eb_bossorb2: 0,
  eb_bossorb3: 0,
  eb_bossorb4: 0,
  eb_bossorb5: 0,
  eb_bossorb6: 0,
  eb_bossorb7: 0,
}

export const IIDX28_pcdata = {
  version: 28,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  ngrade: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),

  leggendaria_flg1: Array<string>(3).fill("-1"),

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mission_point: 0,
  st_dp_mission_point: 0,
  st_sp_dj_mission_level: 0,
  st_dp_dj_mission_level: 0,
  st_sp_clear_mission_level: 0,
  st_dp_clear_mission_level: 0,
  st_sp_dj_mission_clear: 0,
  st_dp_dj_mission_clear: 0,
  st_sp_clear_mission_clear: 0,
  st_dp_clear_mission_clear: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,
  event_story_prog: 0,
  event_failed_num: 0,

  eb_keyorb: 0,
  eb_bossorb0: 0,
  eb_bossorb1: 0,
  eb_bossorb2: 0,
  eb_bossorb3: 0,
  eb_bossorb4: 0,
  eb_bossorb5: 0,
  eb_bossorb6: 0,
  eb_bossorb7: 0,
}

export const IIDX29_pcdata = {
  version: 29,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  ngrade: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,
  s_auto_adjust: 0,
  d_auto_adjust: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),

  leggendaria_flg1: Array<string>(3).fill("-1"),

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_total_point: 0,
  st_enemy_defeat_flg: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,
  st_mission_clear_num: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,
  event_last_select_type: -1,
}

export const IIDX30_pcdata = {
  version: 30,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  ngrade: 0,
  rtype: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,
  s_auto_adjust: 0,
  d_auto_adjust: 0,
  s_timing_split: 0,
  d_timing_split: 0,
  s_visualization: 0,
  d_visualization: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),

  leggendaria_flg1: Array<string>(3).fill("-1"),

  tourism_secret_flg1: Array<string>(3).fill("-1"),
  tourism_secret_flg2: Array<string>(3).fill("-1"),

  dr_sprank: Array<number>(15).fill(0),
  dr_sppoint: Array<number>(15).fill(0),
  dr_dprank: Array<number>(15).fill(0),
  dr_dppoint: Array<number>(15).fill(0),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_total_point: 0,
  st_enemy_defeat_flg: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_fluctuation: 0,
  st_dp_fluctuation: 0,
  st_mission_clear_num: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,
  achi_trophy: Array<string>(20).fill("0"),

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,
}

export const IIDX31_pcdata = {
  version: 31,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  pmode: 0,
  ngrade: 0,
  rtype: 0,
  player_kind: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,
  s_auto_adjust: 0,
  d_auto_adjust: 0,
  s_timing_split: 0,
  d_timing_split: 0,
  s_visualization: 0,
  d_visualization: 0,
  s_classic_hispeed: 0,
  d_classic_hispeed: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),

  leggendaria_flg1: Array<string>(3).fill("-1"),

  tourism_secret_flg1: Array<string>(3).fill("-1"),
  tourism_secret_flg2: Array<string>(3).fill("-1"),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_total_point: 0,
  st_enemy_defeat_flg: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_fluctuation: 0,
  st_dp_fluctuation: 0,
  st_mission_clear_num: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,
  event_skip: false,
}

export const IIDX32_pcdata = {
  version: 32,

  spnum: 0,
  dpnum: 0,
  sach: 0,
  dach: 0,
  mode: 0,
  category: 0,
  pmode: 0,
  ngrade: 0,
  rtype: 0,
  bgnflg: 0,
  player_kind: 0,
  sp_opt: 0,
  dp_opt: 0,
  dp_opt2: 0,
  gpos: 0,
  s_sorttype: 0,
  d_sorttype: 0,
  s_pace: 0,
  d_pace: 0,
  s_gno: 0,
  d_gno: 0,
  s_sub_gno: 0,
  d_sub_gno: 0,
  s_gtype: 0,
  d_gtype: 0,
  s_sdlen: 0,
  d_sdlen: 0,
  s_sdtype: 0,
  d_sdtype: 0,
  s_timing: 0,
  d_timing: 0,
  s_notes: 0,
  d_notes: 0,
  s_judge: 0,
  d_judge: 0,
  s_judgeAdj: 0,
  d_judgeAdj: 0,
  s_hispeed: 0,
  d_hispeed: 0,
  s_liflen: 0,
  d_liflen: 0,
  s_disp_judge: 0,
  d_disp_judge: 0,
  s_opstyle: 0,
  d_opstyle: 0,
  s_graph_score: 0,
  d_graph_score: 0,
  s_auto_scrach: 0,
  d_auto_scrach: 0,
  s_gauge_disp: 0,
  d_gauge_disp: 0,
  s_lane_brignt: 0,
  d_lane_brignt: 0,
  s_camera_layout: 0,
  d_camera_layout: 0,
  s_ghost_score: 0,
  d_ghost_score: 0,
  s_tsujigiri_disp: 0,
  d_tsujigiri_disp: 0,
  s_auto_adjust: 0,
  d_auto_adjust: 0,
  s_timing_split: 0,
  d_timing_split: 0,
  s_visualization: 0,
  d_visualization: 0,
  s_classic_hispeed: 0,
  d_classic_hispeed: 0,
  movie_thumbnail: 0,

  secret_flg1: Array<string>(3).fill("-1"),
  secret_flg2: Array<string>(3).fill("-1"),
  secret_flg3: Array<string>(3).fill("-1"),
  secret_flg4: Array<string>(3).fill("-1"),
  secret_flg5: Array<string>(3).fill("-1"),

  leggendaria_flg1: Array<string>(3).fill("-1"),
  leggendaria_flg2: Array<string>(3).fill("-1"),

  tourism_secret_flg1: Array<string>(3).fill("-1"),
  tourism_secret_flg2: Array<string>(3).fill("-1"),

  nr_spradar: Array<number>(6).fill(0),
  nr_dpradar: Array<number>(6).fill(0),

  st_enemy_damage: 0,
  st_progress: 0,
  st_total_point: 0,
  st_enemy_defeat_flg: 0,
  st_is_track_ticket: false,
  st_sp_level: 0,
  st_dp_level: 0,
  st_sp_level_h: 0,
  st_dp_level_h: 0,
  st_sp_level_exh: 0,
  st_dp_level_exh: 0,
  st_sp_fluctuation: 0,
  st_dp_fluctuation: 0,
  st_mission_clear_num: 0,
  st_sp_mplay: 0,
  st_dp_mplay: 0,
  st_tips_read_list: 0,

  sgid: -1,
  dgid: -1,

  achi_lastweekly: 0,
  achi_pack: 0,
  achi_packcomp: 0,
  achi_rivalcrush: 0,
  achi_visitflg: 0,
  achi_weeklynum: 0,

  deller: 0,
  orb: 0,
  present_orb: 0,

  event_play_num: 0,
  event_last_select_id: -1,
}
