/// <reference lib="es2020.bigint" />

import { getEncoreStageData } from "../data/extrastage";
import Logger from "../utils/logger";
import { getVersion } from "../utils";

const logger = new Logger('info_delta');
export const shopInfoRegist: EPR = async (info, data, send) => {
  send.object({
    data: {
      cabid: K.ITEM('u32', 1),
      locationid: K.ITEM('str', 'Asphyxia'),
    },
    temperature: {
      is_send: K.ITEM('bool', 0),
    },
    tax: {
      tax_phase: K.ITEM('s32', 0),
    },
  })
}

export const gameInfoGet: EPR = async (info, data, send) => {

  const eventData = getEventDataResponse()
  const extraData = getEncoreStageData(info)
  const VER = getVersion(info)
    if (VER == "galaxywave"){
    await send.object({
      now_date: K.ITEM('u64', BigInt(Date.now())),
      extra: {
        extra_lv: K.ITEM('s32', extraData.level),
        extramusic: {
          music: extraData.musics.map(mid => {
            return {
              musicid: K.ITEM('s32', mid),
            }
          })
        }
      },
      unlock_challenge: { term: K.ITEM('s32', 0) },
      battle: { term: K.ITEM('s32', 0) },
      battle_chara: { term: K.ITEM('s32', 0) },
      data_ver_limit: { term: K.ITEM('s32', 0) },
      ea_pass_propel: { term: K.ITEM('s32', 0) },
      monthly_skill: {
        term: K.ITEM('u8', 0),
        target_music: {
          music: {
            musicid: K.ITEM('s32', 0),
          },
        },
      },
      update_prog: { term: K.ITEM('s32', 0) },
      rockwave: {
        event_list: {
          event: {
              data_id: K.ITEM('s32', 0),
              data_version: K.ITEM('s32', 0),
              event_id: K.ITEM('s32', 0),
              event_type: K.ITEM('s32', 0),
              start_date: K.ITEM('u64', BigInt(0)),
              end_date: K.ITEM('u64', BigInt(0)),
              is_open: K.ITEM('bool', 0),
              bg_no: K.ITEM('s32', 0),
              target_musicid: K.ITEM('s32', 0),
              clear_border: K.ITEM('s32', 0),
              reward_musicid: K.ITEM('s32', 0),
              reward_musicid_border_list: K.ITEM('s32', 0),
              reward_stickerid: K.ITEM('s32', 0),
              reward_stickerid_list: K.ITEM('s32', 0),
              reward_stickerid_border_list: K.ITEM('s32', 0),
              firstbit: K.ITEM('s32', 0),
              quest_no: K.ITEM('s32', 0),
              target_music_list: {
                  music: {
                      musicid: K.ITEM('s32', 0),
                  }
              },
              ranking_list: K.ITEM('u64', BigInt(0)),
          }
        }
      },
      general_term: {
        termdata: {
            type: K.ITEM('str', ''),
            term: K.ITEM('s32', 0),
            state: K.ITEM('s32', 0),
            start_date_ms: K.ITEM('u64', BigInt(0)),
            end_date_ms: K.ITEM('u64', BigInt(0)),
        }
      },
      galaxy_parade: {
        corner_list: {},
        gacha_table: {},
      },
      gitadoradon: {},
      entry_information :{},
      trbitemdata: {},
      ctrl_movie: {},
      ng_jacket: {},
      ranking: {
        skill_0_999: {},
        skill_1000_1499: {},
        skill_1500_1999: {},
        skill_2000_2499: {},
        skill_2500_2999: {},
        skill_3000_3499: {},
        skill_3500_3999: {},
        skill_4000_4499: {},
        skill_4500_4999: {},
        skill_5000_5499: {},
        skill_5500_5999: {},
        skill_6000_6499: {},
        skill_6500_6999: {},
        skill_7000_7499: {},
        skill_7500_7999: {},
        skill_8000_8499: {},
        skill_8500_9999: {},
        total: {},
        original: {},
        bemani: {},
        famous: {},
        anime: {},
        band: {},
        western: {},
      },
      processing_report_state: K.ITEM('u8', 0),
      assert_report_state: K.ITEM('u8', 0),
      recommendmusic: { '@attr': { nr: 0 } },
      demomusic: { '@attr': { nr: 0 } },
      event_skill: {},
      temperature: { is_send: K.ITEM('bool', 0) },
      bemani_summer_2018: { is_open: K.ITEM('bool', 0) },
      kac2018: {
        event: {
          term: K.ITEM('s32', 0),
          since: K.ITEM('u64', BigInt(0)),
          till: K.ITEM('u64', BigInt(0)),
          is_open: K.ITEM('bool', 0),
          target_music: {
            music_id: K.ARRAY('s32', [0, 0, 0, 0, 0, 0]),
          },
        },
      },
      ...eventData,
    });
  } else if (VER == "fuzzup"){
    await send.object({
      now_date: K.ITEM('u64', BigInt(Date.now())),
      extra: {
        extra_lv: K.ITEM('u8', extraData.level),
        extramusic: {
          music: extraData.musics.map(mid => {
            return {
              musicid: K.ITEM('s32', mid),
              get_border: K.ITEM('u8', 0),
            }
          })
        }
      },
      infect_music: { term: K.ITEM('u8', 0) },
      unlock_challenge: { term: K.ITEM('u8', 0) },
      battle: { term: K.ITEM('u8', 0) },
      battle_chara: { term: K.ITEM('u8', 0) },
      data_ver_limit: { term: K.ITEM('s32', 0) },
      ea_pass_propel: { term: K.ITEM('u8', 0) },
      monthly_skill: {
        term: K.ITEM('u8', 0),
        target_music: {
          music: {
            musicid: K.ITEM('s32', 0),
          },
        },
      },
      update_prog: { term: K.ITEM('u8', 0) },
      rockwave: { event_list: {} },
      general_term: {},
      jubeat_omiyage_challenge: {},
      kac2017: {},
      nostalgia_concert: {},
      trbitemdata: {},
      ctrl_movie: {},
      ng_jacket: {},
      ng_recommend_music: {},
      ranking: {
        skill_0_999: {},
        skill_1000_1499: {},
        skill_1500_1999: {},
        skill_2000_2499: {},
        skill_2500_2999: {},
        skill_3000_3499: {},
        skill_3500_3999: {},
        skill_4000_4499: {},
        skill_4500_4999: {},
        skill_5000_5499: {},
        skill_5500_5999: {},
        skill_6000_6499: {},
        skill_6500_6999: {},
        skill_7000_7499: {},
        skill_7500_7999: {},
        skill_8000_8499: {},
        skill_8500_9999: {},
        total: {},
        original: {},
        bemani: {},
        famous: {},
        anime: {},
        band: {},
        western: {},
      },
      processing_report_state: K.ITEM('u8', 0),
      assert_report_state: K.ITEM('u8', 0),
      recommendmusic: { '@attr': { nr: 0 } },
      demomusic: { '@attr': { nr: 0 } },
      event_skill: {},
      temperature: { is_send: K.ITEM('bool', 0) },
      bemani_summer_2018: { is_open: K.ITEM('bool', 0) },
      kac2018: {
        event: {
          term: K.ITEM('s32', 0),
          since: K.ITEM('u64', BigInt(0)),
          till: K.ITEM('u64', BigInt(0)),
          is_open: K.ITEM('bool', 0),
          target_music: {
            music_id: K.ARRAY('s32', [0, 0, 0, 0, 0, 0]),
          },
        },
      },
      livehouse: {
        event_list: {
          event: {
            is_open: K.ITEM('bool', 0),
            term: K.ITEM('u8', 0),
            start_date_ms: K.ITEM('u64', BigInt(0)),
            end_date_ms: K.ITEM('u64', BigInt(0)),
            livehouse_name: K.ITEM('str', 'Asphyxia'),
            reward_list: {
              reward: {
                reward_id: K.ITEM('s32', 0),
                reward_kind: K.ITEM('s32', 0),
                reward_itemid: K.ITEM('s32', 0),
                unlock_border: K.ITEM('s32', 0),
              },
            },
            requirements_musicid: K.ITEM('s32', 0),
            member_table: K.ITEM('s32', 0),
          },
        },
        bonus: {
            term: K.ITEM('u8', 0),
            stage_bonus: K.ITEM('s32', 0),
            charm_bonus: K.ITEM('s32', 0),
            start_date_ms: K.ITEM('u64', BigInt(0)),
            end_date_ms: K.ITEM('u64', BigInt(0)),
          },
      },
      ...eventData,
    });
  }//Older
  else {
    await send.object({
      now_date: K.ITEM('u64', BigInt(Date.now())),
      extra: {
        extra_lv: K.ITEM('u8', extraData.level),
        extramusic: {
          music: extraData.musics.map(mid => {
            return {
              musicid: K.ITEM('s32', mid),
              get_border: K.ITEM('u8', 0),
            }
          })
        }
      },
      infect_music: { term: K.ITEM('u8', 0) },
      unlock_challenge: { term: K.ITEM('u8', 0) },
      battle: { term: K.ITEM('u8', 0) },
      battle_chara: { term: K.ITEM('u8', 0) },
      data_ver_limit: { term: K.ITEM('u8', 0) },
      ea_pass_propel: { term: K.ITEM('u8', 0) },
      monthly_skill: {
        term: K.ITEM('u8', 0),
        target_music: {
          music: {
            musicid: K.ITEM('s32', 0),
          },
        },
      },
      update_prog: { term: K.ITEM('u8', 0) },
      rockwave: { event_list: {} },
      general_term: {},
      jubeat_omiyage_challenge: {},
      kac2017: {},
      nostalgia_concert: {},
      trbitemdata: {},
      ctrl_movie: {},
      ng_jacket: {},
      ng_recommend_music: {},
      ranking: {
        skill_0_999: {},
        skill_1000_1499: {},
        skill_1500_1999: {},
        skill_2000_2499: {},
        skill_2500_2999: {},
        skill_3000_3499: {},
        skill_3500_3999: {},
        skill_4000_4499: {},
        skill_4500_4999: {},
        skill_5000_5499: {},
        skill_5500_5999: {},
        skill_6000_6499: {},
        skill_6500_6999: {},
        skill_7000_7499: {},
        skill_7500_7999: {},
        skill_8000_8499: {},
        skill_8500_9999: {},
        total: {},
        original: {},
        bemani: {},
        famous: {},
        anime: {},
        band: {},
        western: {},
      },
      processing_report_state: K.ITEM('u8', 0),
      assert_report_state: K.ITEM('u8', 0),
      recommendmusic: { '@attr': { nr: 0 } },
      demomusic: { '@attr': { nr: 0 } },
      event_skill: {},
      temperature: { is_send: K.ITEM('bool', 0) },
      bemani_summer_2018: { is_open: K.ITEM('bool', 0) },
      kac2018: {
        event: {
          term: K.ITEM('s32', 0),
          since: K.ITEM('u64', BigInt(0)),
          till: K.ITEM('u64', BigInt(0)),
          is_open: K.ITEM('bool', 0),
          target_music: {
            music_id: K.ARRAY('s32', [0, 0, 0, 0, 0, 0]),
          },
        },
      },
      KAC2016: {
        is_entry: K.ITEM('bool', 0),
        term: K.ITEM('u8', 0),
        musicid: K.ITEM('s32', 0),
      },
      KAC2016_skill_ranking: { term: K.ITEM('u8', 0) },
      season_sticker: { term: K.ITEM('u8', 0) },
      paseli_point_lose: { term: K.ITEM('u8', 0) },
      nostal_link: { term: K.ITEM('u8', 0) },
      encore_advent: { term: K.ITEM('u8', 0) },
      sdvx_stamprally: { term: K.ITEM('u8', 0) },
      sdvx_stamprally2: { term: K.ITEM('u8', 0) },
      floor_policy_2_info: { term: K.ITEM('u8', 0) },
      long_otobear_fes_2: {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      },
      ...eventData,
    });
  }

};

function getEventDataResponse() {
  const addition: any = {
    monstar_subjugation: {
      bonus_musicid: K.ITEM('s32', 0),
    },
    bear_fes: {},
    nextadium: {},
    galaxy_parade: {
      corner_list: {
        corner: {
          is_open: K.ITEM('bool', 0),
          data_ver: K.ITEM('s32', 0),
          genre: K.ITEM('s32', 0),
          corner_id: K.ITEM('s32', 0),
          corner_name: K.ITEM('str', ''),
          start_date_ms: K.ITEM('u64', BigInt(0)),
          end_date_ms: K.ITEM('u64', BigInt(0)),
          requirements_musicid: K.ITEM('s32', 0),
          reward_list: {
            reward: {
              reward_id: K.ITEM('s32', 0),
              reward_kind: K.ITEM('s32', 0),
              reward_itemid: K.ITEM('s32', 0),
              unlock_border: K.ITEM('s32', 0),
              }
          },
        }
      },
      gacha_table: {
        chara_odds: {
          chara_id: K.ITEM('s32', 0),
          odds: K.ITEM('s32', 0),
        }
      },
      bonus: {
        term: K.ITEM('s32', 0),
        stage_bonus: K.ITEM('s32', 0),
        charm_bonus: K.ITEM('s32', 0),
        start_date_ms: K.ITEM('u64', BigInt(0)),
        end_date_ms: K.ITEM('u64', BigInt(0)),
      }
    },
  };
  const time = BigInt(31536000);

  for (let i = 1; i <= 20; ++i) {
    const obj = {
      term: K.ITEM('u8', 0),
      start_date_ms: K.ITEM('u64', time),
      end_date_ms: K.ITEM('u64', time),
    };
    if (i == 1) {
      addition[`phrase_combo_challenge`] = obj;
      addition[`long_otobear_fes_1`] = {
        term: K.ITEM('u8', 0),
        start_date_ms: K.ITEM('u64', time),
        end_date_ms: K.ITEM('u64', time),
        //bonus_musicid: {},
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`sdvx_stamprally3`] = obj;
      addition[`chronicle_1`] = obj;
      addition[`paseli_point_lottery`] = obj;
      addition['sticker_campaign'] = {
        term: K.ITEM('u8', 0),
        sticker_list: {},
      };
      addition['thanksgiving'] = {
        ...obj,
        box_term: {
          state: K.ITEM('u8', 0)
        }
      };
      addition['lotterybox'] = {
        ...obj,
        box_term: {
          state: K.ITEM('u8', 0)
        }
      };
    } else {
      addition[`phrase_combo_challenge_${i}`] = obj;
    }

    if (i <= 4) {
      addition['monstar_subjugation'][`monstar_subjugation_${i}`] = obj;
      addition['bear_fes'][`bear_fes_${i}`] = obj;
    }

    if (i <= 2) {
      addition[`gitadora_oracle_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`gitadora_oracle_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
    }

    if (i <= 3) {
      addition[`kouyou_challenge_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`dokidoki_valentine2_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`wakuteka_whiteday2_${i}`] = { term: K.ITEM('u8', 0) };
      addition[`ohanami_challenge_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`otobear_in_the_tsubo_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
      addition[`summer_craft_${i}`] = {
        term: K.ITEM('u8', 0),
        bonus_musicid: K.ITEM('s32', 0),
      };
    }
  }

  return addition
}
