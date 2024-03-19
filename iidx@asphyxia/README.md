# beatmaniaIIDX

Plugin Version: **v0.1.14**

---

Supported Versions

  - beatmaniaIIDX 15 DJ TROOPERS
  - beatmaniaIIDX 16 EMPRESS
  - beatmaniaIIDX 17 SIRIUS
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
  - EVENT (Partial)
  - ARENA (Partial)
  - RANDOME LANE TICKET
  - FAVORITE/SONG SELECTION NOTES (Partial)
    - EXTRA FAVORITE does not support yet

---

Known Issues
  - Clear Lamps may display invalid lamps due to missing conversion code
  - DJ LEVEL folders are broken in ~ DJ TROOPERS due to missing rank\_id
  - LEGGENDARIA play records before HEROIC VERSE may not display on higher version due to missing conversion code
  - ONE MORE EXTRA STAGE progress won't save (can't test this due to skill issue)

---

Changelogs

**v0.1.0**
  - Added Initial support for Lincle

**v0.1.1**
  - Added Initial support for HEROIC VERSE
  - Expanded score array to adapting newer difficulty (SPN ~ DPA [6] -> SPB ~ DPL [10])
    - This borked previous score datas recorded with v0.1.0
    - All score data now shared with all version
      - as it doesn't have music\_id conversion, it will display incorrect data on certain versions
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
    -  LEAGUE, STORY does not work yet
  - Fixed where s\_hispeed/d\_hispeed doesn't save correctly
 
**v0.1.6**
  - Added Initial support for tricoro
    - Some of event savings are broken
  - Added movie\_upload url setting on plugin setting (BISTROVER ~)
    - This uses JSON instead of XML and this requires additional setup (can't test or implement this as I don't own NVIDIA GPU)

**v0.1.7**
  - Added Initial support for SPADA
    - Some of event savings are broken
  - Fixed where rtype didn't save correctly (BISTROVER ~)

**v0.1.8**
  - Added RIVAL pacemaker support
  - Added Initial support for PENDUAL
    - Some of event savings are broken
  - Fixed where old\_linkage\_secret\_flg is missing on pc.get response (RESIDENT)
  - Fixed where game could crash due to invalid rival qprodata
  - Fixed where lift isn't saving (SPADA)

**v0.1.9**
  - Added Initial support for copula
    - Some of event savings are broken
  - Added shop.getconvention/shop.setconvention/shop.getname/shop.savename response

**v0.1.10**
  - Added Initial support for SINOBUZ ~ Rootage
    - Converted from asphyxia\_route\_public

**v0.1.11**
  - Added Shop Ranking support
  - Changed pc.common/gameSystem.systemInfo response not to use pugFile
    - IIDX\_CPUS on models/arena.ts came from asphyxia\_route\_public

**v0.1.12**
  - Exposed some of pc.common attributes to plugin settings (WIP)
  - Added Experimental WebUI (WIP)
  - Added music.crate/music.breg response
    - CLEAR RATE and BEGINNER clear lamp may not work on certain versions
  - Added Initial support for SIRIUS
  - Fixed where Venue Top didn't save correctly (BISTROVER ~)
  - Fixed where music.appoint send empty response even rival has score data when player doesn't have score data
  - Fixed where FAVORITE may work only on specific version
  - Fixed where shop name always displayed as "CORE" instead of saved one
  - Fixed where rlist STEP UP achieve value was fixed value instead of saved one
  - Fixed where fcombo isn't saving (Resort Anthem)
  - Removed shop.savename as not working as intented.

**v0.1.13**
  - Added Initial support for DJ TROOPERS
  - Added Initial support for EMPRESS
  - Fixed where EXPERT result does not display total cleared users and ranking position

**v0.1.14**
  - Added Experimental OMEGA-Attack event saving support on tricoro
  - Reworked on SINOBUZ ~ Rootage responses
  - Fixed where Base64toBuffer returns invalid value sometimes
  - Fixed where timing display option isn't saving on certain versions
