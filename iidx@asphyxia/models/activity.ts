export interface activity {
  collection: "activity";
  version: number;

  date: number;
  play_style: number;
  
  music_num: number;
  play_time: number;
  keyboard_num: number;
  scratch_num: number;
  clear_update_num: number[];
  score_update_num: number[];
}

export interface activity_mybest {
  collection: "activity_mybest";
  version: number;

  play_style: number;
  play_side: number;
  music_id: number;
  note_id: number;

  target_graph: number;
  target_score: number;
  pacemaker: number;
  best_clear: number;
  best_score: number;
  best_misscount: number;
  now_clear: number;
  now_score: number;
  now_misscount: number;
  now_pgreat: number;
  now_great: number;
  now_good: number;
  now_bad: number;
  now_poor: number;
  now_combo: number;
  now_fast: number;
  now_slow: number;
  option: number;
  option_2: number;
  ghost_gauge_data: string;
  gauge_type: number;
  result_type: number;
  is_special_result: number;

  update_date: number;
}
