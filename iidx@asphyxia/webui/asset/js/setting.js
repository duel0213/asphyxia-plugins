const customizationList = [
  { field: "turntable", file: "turntable" },
  { field: "note_skin", file: "note_skin" },
  { field: "note_burst", file: "note_burst" },
  { field: "note_beam", file: "note_beam" },
  { field: "lane_cover", file: "lane_cover" },
  { field: "lift_cover", file: "lane_cover" },
  { field: "pacemaker_cover", file: "lane_cover" },
  { field: "judge_font", file: "judge_font" },
  { field: "full_combo_splash", file: "fullcombo_splash" },
];
const customizeOptions = {};
let customizeOptionsLoaded = false;
let pendingCustomize = {
  version: $("#version").val(),
  values: null,
};

Promise.all(
  customizationList.map((item) =>
    $.getJSON("static/asset/customize/" + item.file + ".json").then((config) => {
      customizeOptions[item.field] = config;
    })
  )
)
.then(() => {
  customizeOptionsLoaded = true;
  $.ajax({
    type: "post",
    url: "/emit/iidxGetSetting",
    data: {
      refid: refid,
      version: pendingCustomize.version,
    },
    dataType: "text",
    success: function (result) {
      let data = JSON.parse(result);
      renderSelectedCustomizeOptions(pendingCustomize.version, data);
    },
    error: function () {
      alert("Unable to process data");
    }
  });
})
.catch((error) => {
  console.error("Could not load customization JSON:", error);
});

function renderSelectedCustomizeOptions(version, values) {
  if (values == null) {
    alert("Theres no customization data available on this version!");
    return;
  }

  renderCustomizeListOptions(version, {
    "turntable": values["custom"].turntable,
    "note_skin": values["custom"].note_skin,
    "note_burst": values["custom"].note_burst,
    "note_beam": values["custom"].note_beam,
    "lane_cover": values["custom"].lane_cover,
    "lift_cover": values["custom"].lift_cover,
    "pacemaker_cover": values["custom"].pacemaker_cover,
    "judge_font": values["custom"].judge_font,
    "full_combo_splash": values["custom"].full_combo_splash,
  });

  $("#frame").val(values["custom"].frame);
  $("#menu_music").val(values["custom"].menu_music);
  $("#category_vox").val(values["custom"].category_vox);
  $("#disable_musicpreview").prop("checked", values["custom"].disable_musicpreview);
  $("#vefx_lock").prop("checked", values["custom"].vefx_lock);
  $("#effect").val(values["custom"].effect);
  $("#bomb_size").val(values["custom"].bomb_size);
  $("#disable_hcn_color").prop("checked", values["custom"].disable_hcn_color);
  $("#first_note_preview").val(values["custom"].first_note_preview);
  $("#djl_v").prop("checked", data["custom"].djl_v);

  if (values["custom"].note_size == undefined) $("#note_size").val(0);
  else $("#note_size").val(values["custom"].note_size);
  if (values["custom"].note_beam_size == undefined) $("#note_beam_size").val(0);
  else $("#note_beam_size").val(values["custom"].note_beam_size);
  if (values["custom"].cn_color == undefined) $("#cn_color").val(0);
  else $("#cn_color").val(values["custom"].cn_color);
  if (values["custom"].cn_size == undefined) $("#cn_size").val(0);
  else $("#cn_size").val(values["custom"].cn_size);

  $("#rank_folder").prop("checked", values["custom"].rank_folder);
  $("#clear_folder").prop("checked", values["custom"].clear_folder);
  $("#diff_folder").prop("checked", values["custom"].diff_folder);
  $("#alpha_folder").prop("checked", values["custom"].alpha_folder);
  $("#rival_folder").prop("checked", values["custom"].rival_folder);
  $("#rival_battle_folder").prop("checked", values["custom"].rival_battle_folder);
  $("#rival_info").prop("checked", values["custom"].rival_info);
  $("#hide_playcount").prop("checked", values["custom"].hide_playcount);
  $("#disable_graph_cutin").prop("checked", values["custom"].disable_graph_cutin);
  $("#classic_hispeed").prop("checked", values["custom"].classic_hispeed);
  $("#rival_played_folder").prop("checked", values["custom"].rival_played_folder);
  $("#hide_iidxid").prop("checked", values["custom"].hide_iidxid);

  if (values["custom"].disable_beginner_option == undefined) $("#disable_beginner_option").prop("checked", false);
  else $("#disable_beginner_option").prop("checked", values["custom"].disable_beginner_option);

  $("#qpro_head").val(values["custom"].qpro_head);
  $("#qpro_hair").val(values["custom"].qpro_hair);
  $("#qpro_hand").val(values["custom"].qpro_hand);
  $("#qpro_face").val(values["custom"].qpro_face);
  $("#qpro_body").val(values["custom"].qpro_body);

  if (values["custom"].qpro_back == undefined) $("#qpro_back").val(0);
  else $("#qpro_back").val(values["custom"].qpro_back);

  if (values["lm_custom"] == null) {
    $("#lm_skin").val(0);
    $("#lm_bg").val(0);
    $("#lm_bg_2").val(0);
    $("#lm_entry_bg").val(0);
    $("#lm_entry_bg_bright").val(0);
  } else {
    $("#lm_skin").val(values["lm_custom"].premium_skin);
    $("#lm_bg").val(values["lm_custom"].premium_bg);

    if (values["lm_custom"].premium_bg_concent == undefined) $("#lm_bg_2").val(0);
    else $("#lm_bg_2").val(values["lm_custom"].premium_bg_concent);
    if (values["lm_custom"].entry_bg == undefined) $("#lm_entry_bg").val(0);
    else $("#lm_entry_bg").val(values["lm_custom"].entry_bg);
    if (values["lm_custom"].entry_bg_brightness == undefined) $("#lm_entry_bg_bright").val(0);
    else $("#lm_entry_bg_bright").val(values["lm_custom"].entry_bg_brightness);
  }
}

function renderCustomizeListOptions(version, values) {
  pendingCustomizeRender = { version: String(version), values };

  if (!customizeOptionsLoaded) return;

  customizationList.forEach((item) => {
    const $select = $("#" + item.field);
    const selectedValue =
      values && values[item.field] != undefined
        ? values[item.field]
        : $select.val();

    const config = customizeOptions[item.field];
    const options = config[String(version)] || config.default || [];

    $select.empty();

    options.forEach((option) => {
      $("<option>")
        .val(option.val)
        .text(option.name)
        .prop("selected", Number(option.val) == Number(selectedValue))
        .appendTo($select);
    });
  });
}

$("#version").on("change", function () {
  const selectedVersion = this.value;
  $.ajax({
    type: "post",
    url: "/emit/iidxGetSetting",
    data: {
      refid: refid,
      version: selectedVersion,
    },
    dataType: "text",
    success: function (result) {
      let data = JSON.parse(result);
      renderSelectedCustomizeOptions(this.value, data);
    },
    error: function () {
      alert("Unable to process data");
    }
  });
});
