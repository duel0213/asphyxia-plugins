import { PLUGIN_VER } from "../const";
import { Scores } from "../models/scores";

type ScoreDiff = Scores['scores'][string]['diffs'][string];
type ScoreEntry = Scores['scores'][string];

function selectBetterMeter(existing?: string, incoming?: string): string {
  if (!incoming) return existing ?? "0";
  if (!existing) return incoming;

  try {
    return BigInt(incoming) > BigInt(existing) ? incoming : existing;
  } catch (e) {
    return incoming || existing;
  }
}

function mergeScoreDiff(existing: ScoreDiff | undefined, incoming: ScoreDiff): ScoreDiff {
  if (!existing) return incoming;

  return {
    perc: Math.max(existing.perc ?? 0, incoming.perc ?? 0),
    rank: Math.max(existing.rank ?? 0, incoming.rank ?? 0),
    meter: selectBetterMeter(existing.meter, incoming.meter),
    prog: Math.max(existing.prog ?? 0, incoming.prog ?? 0),
    clear: (existing.clear ?? false) || (incoming.clear ?? false),
    fc: (existing.fc ?? false) || (incoming.fc ?? false),
    ex: (existing.ex ?? false) || (incoming.ex ?? false),
  };
}

function mergeScoreEntry(existing: ScoreEntry | undefined, incoming: ScoreEntry): ScoreEntry {
  const mergedDiffs: ScoreEntry['diffs'] = existing ? { ...existing.diffs } : {};

  for (const [seq, diff] of Object.entries(incoming.diffs)) {
    mergedDiffs[seq] = mergeScoreDiff(mergedDiffs[seq], diff);
  }

  const mergedUpdate = existing?.update ? [...existing.update] : [0, 0];
  if (incoming.update && (mergedUpdate[1] ?? 0) < incoming.update[1]) {
    mergedUpdate[0] = incoming.update[0];
    mergedUpdate[1] = incoming.update[1];
  }

  return {
    update: mergedUpdate,
    diffs: mergedDiffs,
  };
}

function mergeScoreCollections(target: Scores['scores'], incoming: Scores['scores']): Scores['scores'] {
  const merged = { ...target } as Scores['scores'];

  for (const [mid, entry] of Object.entries(incoming)) {
    merged[mid] = mergeScoreEntry(merged[mid], entry);
  }

  return merged;
}

async function persistSharedScores(refid: string, game: 'gf' | 'dm', scores: Scores['scores']) {
  await DB.Upsert<Scores>(refid, { collection: 'scores', game, version: 'shared' }, {
    collection: 'scores',
    version: 'shared',
    pluginVer: PLUGIN_VER,
    game,
    scores,
  });
}

/**
 * Load and merge scores across all versions for a player/game pair and persist them under version "shared".
 */
export async function getMergedSharedScores(refid: string, game: 'gf' | 'dm'): Promise<Scores['scores']> {
  const scoreDocs = await DB.Find<Scores>(refid, { collection: 'scores', game });
  const mergedScores = scoreDocs.reduce<Scores['scores']>((acc, doc) => mergeScoreCollections(acc, doc.scores), {} as Scores['scores']);

  await persistSharedScores(refid, game, mergedScores);
  return mergedScores;
}

/**
 * Merge the provided score set into the shared scores document for the player/game pair.
 */
export async function mergeScoresIntoShared(refid: string, game: 'gf' | 'dm', scores: Scores['scores']) {
  const existingShared = await DB.FindOne<Scores>(refid, { collection: 'scores', game, version: 'shared' });
  const mergedScores = mergeScoreCollections(existingShared?.scores ?? {}, scores);

  await persistSharedScores(refid, game, mergedScores);
}
