export interface grade {
  collection: "grade";
  version: number;

  style: number;
  gradeId: number;

  maxStage: number;
  archive: number; // typo: achieve //
}
