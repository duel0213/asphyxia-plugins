import { PlayerInfo } from "../models/playerinfo"
import { Rival } from "../models/rival"

export const updatePlayerInfo = async (data: {
  refid: string;
  version: string;
  name?: string;
  title?: string;
}) => {
  if (data.refid == null) return;

  const update: Update<PlayerInfo>['$set'] = {};

  if (data.name && data.name.length > 0) {
    //TODO: name validator
    update.name = data.name;
  }

  if (data.title && data.title.length > 0) {
    //TODO: title validator
    update.title = data.title;
  }

  await DB.Update<PlayerInfo>(
    data.refid,
    { collection: 'playerinfo', version: data.version },
    { $set: update }
  );
};

/**
 * Replace the rival list for one game/version pair.
 *
 * Rival documents live in the owner's profile space, so removing a player from
 * Asphyxia also removes their outgoing rival list automatically.
 */
export const updateRival = async (data: {
  refid: string;
  version: string;
  game: 'gf' | 'dm';
  rival1?: string;
  rival2?: string;
  rival3?: string;
  rival4?: string;
  rival5?: string;
}) => {
  if (!data.refid || !data.version || (data.game !== 'gf' && data.game !== 'dm')) return;

  const requestedRefids = [data.rival1, data.rival2, data.rival3, data.rival4, data.rival5];
  const seenRefids = new Set<string>();
  const rivalSlots = requestedRefids.flatMap((input, index) => {
    const rivalRefid = input?.trim();
    if (!rivalRefid || rivalRefid === data.refid || seenRefids.has(rivalRefid)) return [];
    seenRefids.add(rivalRefid);
    return [{ rivalRefid, slot: index + 1 }];
  });

  // Store only players that have a profile in the same game version. This keeps
  // the later game response from referencing a player whose DID/profile is absent.
  const validRivalSlots: Array<{ rivalRefid: string; slot: number }> = [];
  for (const rival of rivalSlots) {
    const player = await DB.FindOne<PlayerInfo>(rival.rivalRefid, {
      collection: 'playerinfo',
      version: data.version,
    });
    if (player) validRivalSlots.push(rival);
  }

  await DB.Remove<Rival>(data.refid, {
    collection: 'rival',
    game: data.game,
    version: data.version,
  });

  for (const { rivalRefid: rival_refid, slot } of validRivalSlots) {
    await DB.Insert<Rival>(data.refid, {
      collection: 'rival',
      game: data.game,
      version: data.version,
      rival_refid,
      slot,
    });
  }
};
