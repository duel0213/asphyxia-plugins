export interface Rival {
  collection: 'rival';

  game: 'gf' | 'dm';
  version: string;
  rival_refid: string;
  slot: number;
}
