# Jubeat Plugin

Jubeat Plugin for Asphyxia Core

# Supported Versions

- Festo
- Qubell (tested with L44:J:B:A:2017062001; prop and clan are routed to the same handlers but untested)

# Versions

- V1.0.0 (2021/12/16)
    - Only support normal mode score saving.

- V2.0.0 (2022/08/14)
    - Now Support Festo Final
    - Support hard mode score saving
    - Support Turn Run

- V2.1.0 (2026/09/14)
    - Add jubeat Qubell support (profile, score list, save, shop info) via version-split handlers in `qubell/`
    - Older builds (model date < 2018090000) use the Qubell handlers; festo behaviour is unchanged

# TODO

- [ ] Customized Turn Run. (Currently can't cuz Jubeat courses limit is 60, need someone to find how to patch it.)

# Credits

- Thanks [asesidaa](https://github.com/asesidaa?tab=repositories) for help!
- And also the other open-soured Jubeat lovers!
