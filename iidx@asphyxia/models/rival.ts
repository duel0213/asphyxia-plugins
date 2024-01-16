export interface rival {
  collection: "rival";

  play_style: number;

  index: number;
  rival_refid: string;
};

export interface rival_data {
  play_style: number;
  index: number;

  qprodata: number[];
  profile: (string | number)[];
  pcdata: number[];
}
