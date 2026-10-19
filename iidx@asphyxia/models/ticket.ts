export interface lane_ticket {
  collection: "lane_ticket";
  version: number;

  ticket_id: number;

  arrange_id: number;
}

export interface retry_ticket {
  collection: "retry_ticket";
  version: number;
  play_side: number;

  ticket_id: number;

  music_id: number;
  class_id: number;
  arrange_id: number;
  arrange_id2: number;
  option: number;
  option2: number;
}
