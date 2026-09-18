export interface lightning_settings {
  collection: "lightning_settings";
  version: number;

  headphone_vol: number;

  resistance_sp_left: number;
  resistance_sp_right: number;
  resistance_dp_left: number;
  resistance_dp_right: number;

  slider: number[];
  light: number[];
  concentration: number;

  keyboard_kind: number; // epolis //

  brightness: number;
  brightness_concent: number; // sparkle shower ///

  assistant_disp_type: number; // sparkle shower ///
  assistant_last_tab: number;
  assistant_chara: number;
}

export interface lightning_playdata {
  collection: "lightning_playdata";

  version: number;

  sp_num: number;
  dp_num: number;
}

export interface lightning_custom {
  collection: "lightning_custom";
  version: number;

  premium_skin: number;

  premium_bg: number; // epolis //

  premium_bg_concent: number; // sparkle shower //
  entry_bg: number;
  entry_bg_brightness: number;
}

export interface eisei_grade {
  collection: "eisei_grade";
  version: number;

  clear_type: number;
  grade_id: number;
  grade_type: number;
  stage_num: number;
  option: number;

  past_achievement: number[];
  past_selected_course: number[];
  max_past_achievement: number[];
  max_past_selected_course: number[];
}

export interface eisei_grade_data {
  clear_type: number;
  grade_id: number;
  grade_type: number;
  stage_num: number;
  option: number;

  past: number[];
  selected_course: number[];
  max_past: number[];
  max_selected_course: number[];
}

export interface lightning_musicmemo {
  collection: "lightning_musicmemo";
  version: number;

  music_idx: number;
  play_style: number;
  music_id: number;
}

export interface musicmemo_data {
  music_idx: number;
  play_style: number;
  music_id: number;
}

export interface lightning_musicmemo_new {
  collection: "lightning_musicmemo_new";
  version: number;

  folder_idx: number;
  folder_name: string;
  play_style: number;
  music_ids: number[];
}

export interface musicmemo_data_new {
  folder_idx: number;
  folder_name: string;
  play_style: number;
  music_ids: number[];
}

export interface lightning_musicfilter {
  collection: "lightning_musicfilter";
  version: number;

  play_style: number;
  folder_id: number;
  filter_id: number;
  is_valid: boolean;
  value0: number;
  value1: number;
}

export interface lightning_musicfilter_sort {
  collection: "lightning_musicfilter_sort";
  version: number;

  play_style: number;
  folder_id: number;
  sort: number;
}

export interface musicfilter_data {
  play_style: number;
  folder_id: number;
  filter_id: number;
  is_valid: number;
  value0: number;
  value1: number;
}

export interface musicfilter_sort_data {
  play_style: number;
  folder_id: number;
  sort: number;
}

export const lm_playdata = {
  sp_num: 0,
  dp_num: 0,
};

export const lm_settings = {
  headphone_vol: 10,

  resistance_sp_left: 4,
  resistance_sp_right: 4,
  resistance_dp_left: 4,
  resistance_dp_right: 4,

  slider: [7, 7, 7, 7, 7, 15, 15],
  light: [1, 1, 1, 1, 1, 1],
  concentration: 0,
};

export const lm_settings_new = {
  headphone_vol: 10,

  resistance_sp_left: 4,
  resistance_sp_right: 4,
  resistance_dp_left: 4,
  resistance_dp_right: 4,

  slider: [7, 7, 7, 7, 7, 15, 15],
  light: [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  concentration: 0,

  keyboard_kind: 10, // epolis //

  brightness: 0,
  brightness_concent: 0, // sparkle shower //

  assistant_disp_type: 0,
  assistant_last_tab: 0,
  assistant_chara: 0,
}

export const lm_customdata = {
  premium_skin: 0, // Icons //

  premium_bg: 0, // Background (epolis) //

  premium_bg_concent: 0, // Background [Concentration Mode] (sparkle shower) //
  entry_bg: 0, // Entry BG //
  entry_bg_brightness: 0, // Entry BG Brightness //
}
