export interface shop_data {
  collection: "shop_data";

  opname: string;
  pid: number;
  cls_opt: number;
}

export interface convention_data {
  collection: "shop_convention";

  version: number;

  music_0: number;
  music_1: number;
  music_2: number;
  music_3: number;
  valid: boolean;
}
