export interface expert {
  collection: "expert";
  version: number;
  coid: number;

  cArray: number[];
  pgArray: number[];
  gArray: number[];
  optArray: number[];
  opt2Array: number[];
  esArray: number[];
}

export interface ranking {
  collection: "ranking";
  version: number;
  clid: number;
  coid: number;

  gnum: number;
  pgnum: number;
  name: string;
  opname: string;
  pid: number;
  udate: number;

  exscore: number; // <- for sort //
  maxStage: number;
}
