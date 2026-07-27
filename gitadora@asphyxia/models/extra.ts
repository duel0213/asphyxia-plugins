import { PLUGIN_VER } from "../const";

export interface Extra {
  collection: 'extra';

  game: 'gf' | 'dm';
  version: string;
  pluginVer: number
  id: number;

  playstyle: number[];
  custom: number[];
  list_1: number[];
  list_2: number[];
  list_3: number[];
  recommend_musicid_list: number[];
  reward_status: number[];
}

export function getDefaultExtra(game: 'gf' | 'dm', version: string, id: number) : Extra {
  const playstyleLength = version == 'galaxywave_delta' ? 70 : 50;
  const result : Extra = {
    collection: 'extra',
    pluginVer: PLUGIN_VER,

    game,
    version,
    id,
    playstyle: Array(playstyleLength).fill(0),
    custom: Array(50).fill(0),
    list_1: Array(100).fill(-1),
    list_2: Array(100).fill(-1),
    list_3: Array(100).fill(-1),
    recommend_musicid_list: Array(5).fill(-1),
    reward_status: Array(50).fill(0),
  }
  result.playstyle[1] = 1    // Note scroll speed (should default to 1.0x)
  result.playstyle[25] = 0
  result.playstyle[26] = 1
  result.playstyle[27] = 1
  result.playstyle[28] = 1
  result.playstyle[29] = 1
  result.playstyle[30] = 1
  result.playstyle[31] = 1
  result.playstyle[32] = 1
  result.playstyle[33] = 1
  result.playstyle[34] = 1
  result.playstyle[35] = 3
  result.playstyle[36] = 20  // Target Timing Adjustment
  result.playstyle[48] = 20  // Note Display Adjustment

  if (playstyleLength >= 70) {
    result.playstyle[21] = 50 //DELTA 判定ライン位置
    result.playstyle[26] = 0 //DELTA 判定エフェクト位置
    result.playstyle[27] = 0 //DELTA SHUTTER IN
    result.playstyle[28] = 0 //DELTA SHUTTER OUT
    result.playstyle[35] = 0
    result.playstyle[36] = 1
    result.playstyle[37] = 1
    result.playstyle[38] = 1
    result.playstyle[40] = 1
    result.playstyle[41] = 2
    result.playstyle[42] = 1
    result.playstyle[43] = 2
    result.playstyle[48] = 0
    result.playstyle[56] = 0 
    result.playstyle[57] = 1
    result.playstyle[58] = 1
    result.playstyle[59] = 1
    result.playstyle[61] = 1
    result.playstyle[62] = 1
    result.playstyle[63] = 1
  }
  
  return result
}
