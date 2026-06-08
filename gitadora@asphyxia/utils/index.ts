export const isGF = (info: EamuseInfo) => {
  const t = info.model.split(':')[2];
  return t == 'A' || t == 'C';
};

export const isDM = (info: EamuseInfo) => {
  const t = info.model.split(':')[2];
  return t == 'B' || t == 'D';
};

export const isGalaxyWaveDeltaModel = (model: string) => {
  const t = model.split(':')[2];
  return t == 'C' || t == 'D';
};

export const getVersion = (info: EamuseInfo) => {
  const moduleName: string = info.module;
  const moduleMatch = moduleName.match(/([^_]*)_(.*)/);

  if (moduleMatch && moduleMatch[1]) {
    return moduleMatch[1];
  }

  console.error(`Unable to parse version from module name "${moduleName}".`);
  return "unknown";
};

export function isRequiredCoreVersion(major: number, minor: number) {
  // version value exposed since Core v1.19
  const core_major = typeof CORE_VERSION_MAJOR === "number" ? CORE_VERSION_MAJOR : 1
  const core_minor = typeof CORE_VERSION_MINOR === "number" ? CORE_VERSION_MINOR : 18   
  return core_major > major || (core_major === major && core_minor >= minor)
};

export function isAsphyxiaDebugMode() : boolean  {
  const argv = (globalThis as { process?: { argv?: string[] } }).process?.argv ?? [];
  return argv.includes("--dev") || argv.includes("--console");
}

export function isSharedFavoriteMusicEnabled() : boolean{
  return  Boolean(U.GetConfig("shared_favorite_songs"))
}

export function isSharedSongScoresEnabled() : boolean{
  return  Boolean(U.GetConfig("shared_song_scores"))
}
