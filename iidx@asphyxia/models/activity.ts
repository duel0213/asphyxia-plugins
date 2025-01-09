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
