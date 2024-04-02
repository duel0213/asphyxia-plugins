export interface score {
  collection: "score";

  mid: number;

  pgArray: number[];
  gArray: number[];
  mArray: number[];
  cArray: number[];
  rArray: number[];
  esArray: number[];

  optArray: number[];
  opt2Array: number[];
}

export interface score_top {
  collection: "score_top";

  play_style: number;
  mid: number;

  names: string[];
  scores: number[];
  clflgs: number[];
}
