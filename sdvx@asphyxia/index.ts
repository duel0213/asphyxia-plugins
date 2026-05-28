import {common,log} from './handlers/common';
import {hiscore, rival, saveMix, loadMix, globalMatch} from './handlers/features';
import {
  updateProfile,
  updateMix,
  importMix,
  deleteMix,
  make_hexa_easier,
  import_assets,
  update_webui_nemsys_data,
  update_webui_stamp_data,
  update_webui_subbg_data,
  update_webui_bgm_data,
  update_music_db,
  sendMdb,
  sendAssetData,
  // sendImg,
  // sendImgWithID,
  // getScore,
  // getScoreCount,
  // test
} from './handlers/webui';
import {
  load,
  create,
  loadScore,
  save,
  saveScore,
  saveCourse,
  buy,
  print,
} from './handlers/profiles';

import { TRANSLATION_TABLE } from './utils';

import { MusicRecord } from './models/music_record';

export let music_db;

function load_music_db(){

  const fs = require('fs');
  const path = require('path');

  if (U.GetConfig('sdvx_path') == '') {
    console.log('sdvx_path is not set, skipping music_db load');
    return;
  }

  let sdvx_path = U.GetConfig('sdvx_path');

  const mdb_path = path.join(sdvx_path, 'data', 'others', 'music_db.xml');


  fs.promises.readFile(mdb_path).then(data => {
    let mdb_buffer = U.DecodeString(data, 'shift_jis');
    music_db = U.parseXML(mdb_buffer, false);
    console.log('music_db loaded, total: '+music_db.mdb.music.length);

    music_db.mdb.music.forEach((m: any) => {
      let title_name = m.info.title_name["@content"];

      for(let [key, value] of Object.entries(TRANSLATION_TABLE)){
        title_name = title_name.replaceAll(key, value);
      }

      m.info.title_name["@content"] = title_name;
    })
  })
  .catch((err: any) => {
    console.error('Error reading music_db.xml:', err);
  });
}

export function register() {
    
  R.Contributor("LatoWolf");
  R.GameCode('KFC');

  R.Config('enable_VSync', { type: 'boolean', default: false, name:'Enable VSync'} );
  R.Config('unlock_all_songs', { type: 'boolean', default: false, name:'Unlock All Songs'});
  R.Config('unlock_all_navigators', { type: 'boolean', default: false, name:'Unlock All Navigators'} );
  R.Config('unlock_all_appeal_cards', { type: 'boolean', default: false, name:'Unlock All Appeal Cards'});
  R.Config('use_information' ,{ type: 'boolean', default: true, name:'Use Information', desc:'Enable the information section after entry.'});
  R.Config('use_asphyxia_gameover',{ type: 'boolean', default: true, name:'Use Asphyxia Gameover', desc:'Enable the Asphyxia gameover message after ending the game.'})
  R.Config('use_blasterpass',{ type: 'boolean', default: true, name:'Use Blaster Pass', desc:'Enable Blaster Pass for VW and EG'});
  R.Config('new_year_special',{ type: 'boolean', default: true, name:'Use New Year Special', desc:'Enable New Year Special BGM for login'});
  R.Config('music_count',{ type: 'integer', default: 2500, name:'Music Count', desc:'The maximum id of music in the game.'});

  R.Config('sdvx_path', { type: 'string', default: '', name:'SDVX Path', desc:'Path to your SDVX installation folder.'});
    
  R.WebUIEvent('updateProfile', updateProfile);
  R.WebUIEvent('updateMix', updateMix);
  R.WebUIEvent('importMix', importMix);
  R.WebUIEvent('deleteMix', deleteMix);
  R.WebUIEvent('easyHexa', make_hexa_easier);
  R.WebUIEvent('import_assets', import_assets);
  R.WebUIEvent('update_webui_nemsys', update_webui_nemsys_data);
  R.WebUIEvent('update_webui_chat_stamp', update_webui_stamp_data);
  R.WebUIEvent('update_webui_subbg', update_webui_subbg_data);
  R.WebUIEvent('update_webui_bgm', update_webui_bgm_data);
  R.WebUIEvent('update_music_db', update_music_db);
  R.WebUIEvent('getMusicDB', sendMdb);
  R.WebUIEvent('getAssetData', sendAssetData);

  const MultiRoute = (method: string, handler: EPR | boolean) => {
    R.Route(`game.sv6_${method}`, handler);
  };
  

  // Common
  MultiRoute('common', common);

  // Profile
  MultiRoute('new', create);
  MultiRoute('load', load);
  MultiRoute('load_m', loadScore);
  MultiRoute('save', save);
  MultiRoute('save_m', saveScore);
  MultiRoute('save_c', saveCourse);
  MultiRoute('frozen', true);
  MultiRoute('buy', buy);
  MultiRoute('print',print);

  // Features
  MultiRoute('hiscore', hiscore);
  MultiRoute('load_r', rival);
  MultiRoute('save_ap', saveMix);
  MultiRoute('load_ap', loadMix);

  // Lazy
  MultiRoute('lounge', (_, __, send) => send.object({
    interval: K.ITEM('u32', 30)
  }));
  MultiRoute('shop', (_, __, send) => send.object({
    nxt_time: K.ITEM('u32', 1000 * 5 * 60)
  }));

  MultiRoute('save_e', true); 
  MultiRoute('save_mega',true);
  MultiRoute('play_e', true);
  MultiRoute('play_s', true);
  MultiRoute('entry_s', globalMatch);
  MultiRoute('entry_e', true);
  MultiRoute('exception', true);
  MultiRoute('log',log);
 
  R.Route('eventlog.write', (_, __, send) => send.object({
    gamesession: K.ITEM('s64', 1n),
    logsendflg: K.ITEM('s32', 0),
    logerrlevel: K.ITEM('s32', 0),
    evtidnosendflg: K.ITEM('s32', 0)
  }));
  
  R.Route('package.list',(_,__,send)=>send.object({
      package:K.ATTR({expire:"1200"},{status:"1"})
  }));
  
  R.Route('ins.netlog', (_, __, send) => send.object({
    //gamesession: K.ITEM('s64', BigInt(1)),
    //logsendflg: K.ITEM('s32', 0),
    //logerrlevel: K.ITEM('s32', 0),
    //evtidnosendflg: K.ITEM('s32', 0)
  }));
  
  


  R.Unhandled();

 
  load_music_db();
  
}
