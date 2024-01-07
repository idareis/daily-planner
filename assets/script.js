$(document).ready(function () {
// Retrieving stored data from local storage
    function getStoredPlans() {
    var plans = JSON.parse(localStorage.getItem("dailyPlans")) || {};
    return plans;
    }
    // Saving data to the local storage
    function savePlans(plans) {
    localStorage.setItem("dailyPlans", JSON.stringify(plans));
    }
    // Time blocks for each hour of the day
    function renderTimeBlocks() {
        var currentHour = dayjs().hour();
        
        for (var hour = 5; hour <= 23; hour++) {
            var $row = $("<div>").addClass("row time-block");
            var $hourCol = $("<div>").addClass("col-md-1 hour").text(hour + ":00");
            var $textarea = $("<textarea>").addClass("col-md-10 description");
            var savedPlans = getStoredPlans();
        
            $textarea.attr("data-hour", hour);
        
            if (hour < currentHour) {
            $textarea.addClass("past");
            } else if (hour === currentHour) {
            $textarea.addClass("present");
            } else {
            $textarea.addClass("future");
            }
        
            if (savedPlans[hour]) {
            $textarea.val(savedPlans[hour]);
            }
        
            var $saveBtn = $("<button>")
            .addClass("col-md-1 saveBtn")
            .html('<i class="fas fa-save"></i> Save');
        
            $row.append($hourCol, $textarea, $saveBtn,);
            $(".container").append($row);
        }
    }
    

        // Saving the events when the save button is clicked
    $(".container").on("click", ".saveBtn", function () {
        var hour = $(this).siblings(".description").data("hour");
        var plans = getStoredPlans();
        var text = $(this).siblings(".description").val();
    
        plans[hour] = text;
        savePlans(plans);
        });
    
        // Display current day at the top of the page
        $("#currentDay").text(dayjs().format("dddd, MMMM D YYYY hh:mm a"));
    
        // Render time blocks
        renderTimeBlocks();
    });