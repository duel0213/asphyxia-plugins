$("#version").on("change", function () {
  $.ajax({
    type: "post",
    url: "/emit/iidxGetProfile",
    data: {
      refid: refid,
      version: this.value,
    },
    dataType: "text",
    success: function (result) {
      let data = JSON.parse(result);

      if (data["pcdata"] == null) {
        alert("Theres no profile data available on this version!");
        return;
      }

      let sp_grade = data["pcdata"].sgid;
      let dp_grade = data["pcdata"].dgid;

      if (sp_grade == -1) sp_grade = "----";
      if (dp_grade == -1) dp_grade = "----";

      $("#sp_grade").text(sp_grade);
      $("#dp_grade").text(dp_grade);
    },
    error: function () {
      alert("Unable to process data");
    }
  });
});
