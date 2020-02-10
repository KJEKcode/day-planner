// ADD DAYPLANNER TO GLOBAL SCOPE
var dayPlanner;
// ALWAYS RUNNING 5 MIN INTERVAL checks colors on input fields
clockInterval = setInterval(function() {
    styleInput();
}, 300000);

// HANDLE BUTTON CLICK
$( ":button" ).click(function() { 
    var inputId = $(this).attr("data-controls"),
    inputValue = document.getElementById(inputId).value.trim();
    dayPlanner[inputId] = inputValue;
    localStorage.setItem("dayPlanner", JSON.stringify(dayPlanner));
});

// PREVENT DEFAULT form action on submit
$("#time-form").submit(function(event){
    event.preventDefault();
});

// STYLE INPUT TAGS
function styleInput() {
    $("input").each(function() {
        var mtime = $(this).attr("data-mtime");
        console.log(mtime);
        console.log(moment().format("HH"));
        if (mtime < moment().format("HH")) {
            $(this).addClass("past");
        }
        if (mtime === moment().format("HH")) {
            $(this).addClass("present");
        }
        if (mtime > moment().format("HH")) {
            $(this).addClass("future");
        }
    });
}

// SET CURRENT DATE & Color code input fields
function checkTime() {
    $("#currentDay").text(moment().format("MMM Do YYYY"));
    styleInput();
}

// WHEN THE PAGE LOADS set up day planner object
function init() {
    dayPlanner = JSON.parse(localStorage.getItem("dayPlanner"));
    if (dayPlanner) {
        $.each( dayPlanner, function( key, value ) {
            var matchingInput = document.getElementById(key);
            matchingInput.value = value;
        });
    } else {
        dayPlanner = { am9: "", am10: "", am11: "", pm12: "", pm1: "", pm2: "", pm3: "", pm4: "", pm5: "", }
    }
    checkTime()
}

init();


