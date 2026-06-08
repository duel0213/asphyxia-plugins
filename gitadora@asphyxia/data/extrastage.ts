import { getVersion } from "../utils";
import { isGalaxyWaveDeltaModel } from "../utils";

interface EncoreStageData {
    level: number
    musics: number[]
    unlock_challenge?: number[]
}

export function getEncoreStageData(info: EamuseInfo): EncoreStageData {
    const fallback = { level: 10, musics: [0] }
    const customLevel: number = U.GetConfig("encore_version")
    const useCustomLevel: boolean = U.GetConfig("use_custom_encore_level")
    const ntDummyEncore = U.GetConfig("nextage_dummy_encore")

    const level = (ver: string) => useCustomLevel ? customLevel : getPredefinedLevel(ver);

    // GALAXY WAVE DELTA uses same route prefix, detect by model instead
    if (isGalaxyWaveDeltaModel(info.model)) {
        return {
            level: level('galaxywave_delta'),
            musics: [
                2939, // Hopeful Daybreak!!!
                2956, // Over Time Groove
                2942, // Bellatrix
                3008, // Questions That Should Not Be Answered
                3009, // LIQUID NOTES
                3011, // D光石火
                3017, // Peyotl
                3018, // Neoverse
            ]
        }
    }

    switch (getVersion(info)) {
        case 'galaxywave':
            return {
                level: level('galaxywave'),
                musics: [
                    2866, // Calm days
                    2893, // 愛はToxic! feat.Lilymone
                    2885, // Astrum
                    2897, // DESPERATE ERROR
                    2884, // Multiverse
                    2919, // DOGMA
                    2922, // Stay By My Side
                    2937, // Prog for your Soul
                    2963, // Zero Visibility
                    2939, // Hopeful Daybreak!!!
                    2956, // Over Time Groove
                ]
            }
        case 'fuzzup':
            return {
                level: level('fuzzup'),
                musics: [
                    2812, // THE LAST OF FIREFACE
                    2814, // ENCOUNT
                    2783, // Q転直下
                    2848, // Bloody Iron Maiden
                    2860, // Serious Joke
                    2844, // HyperNebula
                    2877, // AVEL
                    2892, // Elliptic Orbits
                ]
            }
        case 'highvoltage':
            return {
                level: level('highvoltage'),
                musics: [
                    2686, // CYCLONICxSTORM
                    2687, // Heptagram
                    2700, // Saiph
                    2706, // LUCID NIGHTMARE
                    2740, // Mobius
                    2748, // Under The Shades Of The Divine Ray
                    2772, // REBELLION
                    2812, // THE LAST OF FIREFACE
                ]
            }
        case 'nextage':
            return {
                level: level('nextage'),
                musics: !ntDummyEncore ? [
                    2587, // 悪魔のハニープリン
                    2531, // The ULTIMATES -reminiscence-
                    2612, // ECLIPSE 2
                    2622, // Slip Into My Royal Blood
                    2686, // CYCLONICxSTORM
                    // FIXME: Fix special encore.
                    305, 602, 703, 802, 902, 1003, 1201, 1400, 1712, 1916, 2289, 2631, // DD13 and encores.
                    1704, 1811, 2121, 2201, 2624, // Soranaki and encores.
                    1907, 2020, 2282, 2341, 2666  // Stargazer and encores.
                ] : [
                    2622, 305, 1704, 1907, 2686 // Dummy.
                ]
            }
        case 'exchain':
            return {
                level: level('exchain'),
                musics: [
                    2246, // 箱庭の世界
                    2498, // Cinnamon
                    2500, // キヤロラ衛星の軌跡
                    2529, // グリーンリーフ症候群
                    2548, // Let's Dance
                    2587, // 悪魔のハニープリン
                    5020, // Timepiece phase II (CLASSIC)
                    5033, // MODEL FT2 Miracle Version (CLASSIC)
                    2586, // 美麗的夏日風
                    5060, // EXCELSIOR DIVE (CLASSIC)
                    2530, // The ULTIMATES -CHRONICLE-
                    2581, // 幸せの代償
                    5046, // Rock to Infinity (CLASSIC)
                ]
            }
        case 'matixx':
            return {
                level: level('matixx'),
                musics: [
                    2432, // Durian
                    2445, // ヤオヨロズランズ
                    2456, // Fate of the Furious
                    2441, // PIRATES BANQUET
                    2444, // Aion
                    2381, // Duella Lyrica
                    2471, // triangulum
                    2476, // MODEL FT4
                    2486, // 煉獄事変
                    2496, // CAPTURING XANADU
                    2497, // Physical Decay
                    2499, // Cinnamon
                    2498, // けもののおうじゃ★めうめう
                ]
            }
        case 're':
            return {
                level: level('re'),
                musics: [
                    2341, // Anathema
                    2384, // White Forest
                    2393, // REFLEXES MANIPULATION
                    2392, // 主亡き機械人形のまなざし
                    2406, // Exclamation
                    2414, // MEDUSA
                    2422, // BLACK ROSES
                    2411, // ギタドラシカ
                    2432, // Durian
                ]
            }
        default:
            return fallback
    }
}

function getPredefinedLevel(ver: string): number {
    // Placeholder values, to be replaced with real data
    switch (ver) {
        case 'galaxywave_delta': return 5;
        case 'galaxywave':       return 5;
        case 'fuzzup':           return 5;
        case 'highvoltage':      return 5;
        case 'nextage':          return 5;
        case 'exchain':          return 5;
        case 'matixx':           return 5;
        case 're':               return 5;
        default:                 return 5;
    }
}