export interface profile {
  collection: "profile";

  refid: string;
  id: number;
  idstr: string;
  name: string;
  pid: number;

  language: number;
  total_pc: number;
  total_kbd: number;
  total_scr: number;
}

export const default_profile = {
  language: -1,

  total_pc: 0,
  total_kbd: 0,
  total_scr: 0,
}
