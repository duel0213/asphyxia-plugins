# beatmaniaIIDX

Plugin Version: **v0.1.6**

---

Supported Versions

  - beatmaniaIIDX 18 Resort Anthem
  - beatmaniaIIDX 19 Lincle
  - beatmaniaIIDX 20 tricoro
  - beatmaniaIIDX 27 HEROIC VERSE
  - beatmaniaIIDX 28 BISTROVER
  - beatmaniaIIDX 29 CastHour
  - beatmaniaIIDX 30 RESIDENT

---

Features

  - STEP UP (Partial)
  - SKILL ANALYZER
  - EVENT
  - ARENA (Local)
  - RANDOME LANE TICKET
  - SONG SELECTION NOTES

---

Changelogs

**v0.1.0**
  - Added Initial support for Lincle

**v0.1.1**
  - Added Initial support for HEROIC VERSE
  - Expanded score array to adapting newer difficulty (SPN ~ DPA [6] -> SPB ~ DPL [10])
    - This borked previous score datas recorded with v0.1.0
    - All score data now shared with all version.
      - as it doesn't have music_id conversion, it will display incorrect data on certain versions.
  - Added Initial customize support (no webui)

**v0.1.2**
  - Added Initial support for BISTROVER
  - Added Initial Rival support (partial webui)

**v0.1.3**
  - Added Initial support for CastHour

**v0.1.4**
  - Added Initial support for RESIDENT

**v0.1.5**
  - Added Initial support for Resort Anthem
    -  BEGINNER, LEAGUE, STORY does not work yet.
  - Fixed s_hispeed/d_hispeed doesn't save correctly.
 
**v0.1.6**
  - Added Initial support for tricoro
    - Event savings are broken
  - Added movie_upload url setting on plugin setting (BISTROVER ~)
    - This uses JSON instead of XML and this requires additional setup. (can't test or implement this as I don't own NVIDIA GPU)
