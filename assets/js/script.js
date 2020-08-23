var loadPlans = function () {
  for (var i = 14; i <= 22; i++) {
    // change i to start counting from 0
    var planId = parseInt(`${i - 9}`);

    // get data from local storage
    var dataL = localStorage.getItem(`${planId}`);

    //create div element
    var eventEL = $("<div>").addClass("row d-flex");

    //create p element
    var eventDescription = $("<p>")
      .addClass("description  p-3 col-sm-8 col-md-9 col-lg-9")
      .text(dataL);
    //create button element
    var eventBtn = $("<button>")
      .addClass("saveBtn col-sm-2 col-md-1 col-lg-1")
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

    // apply new class if task is over due time
    if (moment().isAfter(scheduleTime)) {
      $(eventDescription).addClass("past p-3");

      // $(eventEL).addClass("present");
    } else if (Math.abs(moment().diff(scheduleTime, "hour")) <= 0) {
      var ScheduleText = $(eventDescription).text();
      if (ScheduleText) {
        var reminder = $('<i class="far fa-bell"></i>');
        var alert = $("<span>").text(
          ` Get ready for " ${ScheduleText} " at - ${scheduleTime.format(
            "hh:mm A"
          )} `
        );
        $("#alert").append(reminder, alert);
      }
      $(eventDescription).addClass("present");
    } else {
      $(eventDescription).addClass("future");
    }
  }

  $(".row").on("click", "p", function () {
    // get the class name before the click happen
    var previousCLass = $(this).closest("p").attr("class");

    // get current text
    planText = $(this).text().trim();
    console.log(planText);

    // create new textarea element and assign it class name of the one before edit start
    planInput = $("<textarea>").addClass(previousCLass).val(planText);

    $(this).replaceWith(planInput);

    // focus for text input
    planInput.trigger("focus");
  });

  $(".row").on("click", "button", function () {
    // get the textarea's current value/text
    var text = $(this).siblings(".description").val().trim();

    // get the class name of 'textarea' as previous class
    var previousCLass = $(this).siblings("textarea").attr("class");

    // get the parent row data-id attribute
    var index = $(this).closest(".row").attr("data-id");

    //save item to localStorage
    localStorage.setItem(index, text);
    // create new event element with the class name as text area
    var eventDescription = $("<p>").addClass(previousCLass).text(text);

    // replace textarea with p element
    $(this).siblings(".description").replaceWith(eventDescription);
  });

  // ------------- --------------------------------------Current -time
  var currentTImeAndDate = moment().format("LL");
  $("#currentDay").text(currentTImeAndDate);
};

// call moment every second to update the time;
setInterval(function () {
  var currentTime = moment().format("hh:mm:ss A");
  $("#currentTime").text(currentTime);
}, 1000);

loadPlans();
