var loadPlans = function (planText) {
  for (var i = 9; i <= 17; i++) {
    var eventEL = $("<div>").addClass("row");
    var eventDescription = $("<p>")
      .addClass("description col-sm-9 mt-2")
      .text(planText);
    var eventBtn = $("<button>")
      .addClass("btn saveBtn col-sm-1")
      .html('<i class="far fa-save"></i>');
    var eventTIme = $("<div>")
      .addClass("time-block col-sm-2 bg-light py-2")
      .text(moment(`${i}`, "hh").format(`LT`));

    eventEL.append(eventTIme, eventDescription, eventBtn);

    $(".container").append(eventEL);
  }
  // var now = moment();
  // console.log(moment("2010-10-20").isBefore("2010-10-21")); // true);
  // if (now.isBefore("3")) {
  //   // eventEL.addClass("bb");
  // }
  // // m.hour(11);
  // // m.format("hh yyyy Dd");
  // console.log(now.toString());
  // // console.log(moment("15", "hh").format("LT"));
};
loadPlans();
