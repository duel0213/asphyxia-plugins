import { PlayerInfo } from "../models/playerinfo";
import { Profile } from "../models/profile";
import { Rival } from "../models/rival";

type Game = 'gf' | 'dm';

/**
 * Build the persistent rival list included in gametop.get.
 * This is unrelated to online/session matching: it only supplies the local
 * client's registered-rival profiles and skill data.
 */
export async function getRivalDataResponse(refid: string, version: string, game: Game) {
  const savedRivals = await DB.Find<Rival>(refid, {
    collection: 'rival',
    version,
    game,
  });

  const rivals = savedRivals
    .filter(rival => rival.rival_refid && rival.rival_refid !== refid)
    .sort((a, b) => (a.slot ?? 0) - (b.slot ?? 0));
  const responseRivals: any[] = [];

  for (const rival of rivals) {
    const rivalRefid = rival.rival_refid;
    const playerInfo = await DB.FindOne<PlayerInfo>(rivalRefid, {
      collection: 'playerinfo',
      version,
    });
    if (!playerInfo) continue;

    // FUZZ-UP leaves an empty registered rival slot active and can expose
    // music ID 0 as a bogus one-song Rival 5 skill folder. Only advertise
    // targets that can provide a real skill list.
    const skillProfile = await DB.FindOne<Profile>(rivalRefid, {
      collection: 'profile',
      version,
      game,
    });
    if (!skillProfile || ((skillProfile.skill ?? 0) <= 0 && (skillProfile.all_skill ?? 0) <= 0)) {
      continue;
    }

    // FUZZ-UP reads these four direct children from each repeated rival node.
    responseRivals.push({
      did: K.ITEM('s32', playerInfo.id),
      name: K.ITEM('str', playerInfo.name),
      active_index: K.ITEM('s32', rival.slot ?? 1),
      refid: K.ITEM('str', rivalRefid),
    });
  }

  return { rival: responseRivals };
}
