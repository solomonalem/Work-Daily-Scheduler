var loadPlans = function () {
  for (var i = 9; i <= 17; i++) {
    // change i to start counting from 0
    var planId = parseInt(`${i - 9}`);

    // get data from local storage
    var dataL = localStorage.getItem(`${planId}`);
    console.log(dataL);

    //create div element
    var eventEL = $("<div>").addClass("row");

    //create p element
    var eventDescription = $("<p>")
      .addClass("description col-sm-9 p-3")
      .text(dataL);
    //create button element
    var eventBtn = $("<button>")
      .addClass("saveBtn col-sm-1")
      .html('<i class="far fa-save"></i>');
    // create dive element for time
    var eventTIme = $("<div>")
      .addClass("time-block col-sm-2 bg-light py-2")
      .text(moment(`${i}`, "hh").format(`LT`));
    // var planId = moment(`${i}`, "hh").format(`h`);

    eventEL.attr("data-id", planId);
    eventEL.append(eventTIme, eventDescription, eventBtn);
    $(".container").append(eventEL);

    //-----------------------------------------  AUDIT -----------

    // get date from task element
    var date = $(eventEL).find("div").text().trim();
    // console.log(`date ${date}`);

    var scheduleTime = moment(date, "HH:mm a");
    // console.log(`scheduleTime ${scheduleTime}`);

    // remove any old classes from element
    $(eventEL).removeClass("list-group-item-warning list-group-item-danger");

    // apply new class if task is near/over due date
    if (moment().isAfter(scheduleTime)) {
      $(eventDescription).addClass("past p-3");
      // $(eventEL).addClass("list-group-item-danger");
    } else if (Math.abs(moment().diff(scheduleTime, "hour")) <= 0) {
      $(eventDescription).addClass("present");
    } else {
      $(eventDescription).addClass("future");
    }
  }

  $(".row").on("click", "p", function () {
    // get current text
    planText = $(this).text().trim();
    console.log(planText);

    // create new input element
    planInput = $("<textarea>").addClass("description col-sm-9").val(planText);

    $(this).replaceWith(planInput);

    // automatically bring up the calendar
    planInput.trigger("focus");
  });

  // $(".row").on("click", "button", function () {
  //   // get the textarea's current value/text
  //   var text = $(this).siblings(".description").val().trim();
  //   console.log(text);

  //   // get the parent row data-id attribute
  //   var index = $(this).closest(".row").attr("data-id");
  //   console.log(index);

  //   //save item to localStorage
  //   localStorage.setItem(index, text);

  //   var eventDescription = $("<p>")
  //     .addClass("description col-sm-9 p-3")
  //     .text(text);

  //   // replace textarea with p element
  //   $(this).siblings(".description").replaceWith(eventDescription);
  // });

  // // ------------- --------------------------------------Current -time
  // var currentTImeAndDate = moment().format("LL");
  // $("#currentDay").text(currentTImeAndDate);
};

// setInterval(function () {
//   var currentTime=moment().format("hh:mm:ss A");
//   $("#currentTime").text(currentTime);
  
//   }
// , 1000);

loadPlans();
