# beatmaniaIIDX

Plugin Version: **v0.1.10**

---

Supported Versions

  - beatmaniaIIDX 18 Resort Anthem
  - beatmaniaIIDX 19 Lincle
  - beatmaniaIIDX 20 tricoro
  - beatmaniaIIDX 21 SPADA
  - beatmaniaIIDX 22 PENDUAL
  - beatmaniaIIDX 23 copula
  - beatmaniaIIDX 24 SINOBUZ
  - beatmaniaIIDX 25 CANNON BALLERS
  - beatmaniaIIDX 26 Rootage
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
  - Fixed where s_hispeed/d_hispeed doesn't save correctly.
 
**v0.1.6**
  - Added Initial support for tricoro
    - Event savings are broken
  - Added movie_upload url setting on plugin setting (BISTROVER ~)
    - This uses JSON instead of XML and this requires additional setup. (can't test or implement this as I don't own NVIDIA GPU)

**v0.1.7**
  - Added Initial support for SPADA
    - Event savings are broken
  - Fixed where rtype didn't save correctly. (BISTROVER ~)

**v0.1.8**
  - Added RIVAL pacemaker support
  - Added Initial support for PENDUAL
    - Event savings are broken
  - Fixed where old_linkage_secret_flg is missing on pc.get response (RESIDENT)
  - Fixed where game could crash due to invalid rival qprodata
  - Fixed where lift isn't saving (SPADA)

**v0.1.9**
  - Added Initial support for copula
    - Event savings are broken
  - Added shop.getconvention/shop.setconvention/shop.getname/shop.savename response

**v0.1.10**
  - Added Initial support for SINOBUZ ~ Rootage
    - Converted from asphyxia_route_public
