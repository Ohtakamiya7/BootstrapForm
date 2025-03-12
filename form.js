// function to update the cost/days whenever the checkIn or checkOut inputs are changed
document.addEventListener("DOMContentLoaded", function () {
    // get the inputs of checkIn,checkOut, days, costs whenever they are changed so we can update accordingly
    const checkInInput = document.getElementById("checkInDate");
    const checkOutInput = document.getElementById("checkOutDate");
    const daysInput = document.getElementById("days");
    const costInput = document.getElementById("cost");
    const pricePerDayPerAdult = 150; // price per day per adult is set to 150 

    // calculate the cost and days so we can change the cost and days boxes
    function calculateBookingDetails() {
        // convert the checkIn and checkOut to dates
        const checkInDate = new Date(checkInInput.value);
        const checkOutDate = new Date(checkOutInput.value);

        // will execute if their is both a checkIn day and checkOut day, and if checkOut day is after checkIn day
        if (checkInDate && checkOutDate && checkOutDate > checkInDate) {
            const timeDifference = checkOutDate - checkInDate;
            const numberOfDays = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Convert ms to days

            daysInput.value = numberOfDays; // Update the days input field
            
            // get the inputs of adults
            const adultsInput = document.getElementById("adults");
            // will execute if their is an adult input
            if (adultsInput) {
                const numberOfAdults = parseInt(adultsInput.value) || 1;
                costInput.value = pricePerDayPerAdult * numberOfAdults * numberOfDays; // Update cost
            } else {
                costInput.value = pricePerDayPerAdult * numberOfDays; // Default cost (if adults input is missing)
            }
        } else {
            daysInput.value = ""; // Clear field if invalid
            costInput.value = "";
        }
    }

    checkInInput.addEventListener("change", calculateBookingDetails);
    checkOutInput.addEventListener("change", calculateBookingDetails);
});

// function that handles the reset button
function resetButton(){

    const form = document.getElementById('bookingForm');
    form.reset();

    // goes through each input to disable the red box if a user previously submitted an invalid form
    let entries = ["username", "firstName", "lastName", "phoneNumber", "faxNumber", "email"];
    entries.forEach(field => {
        let group = $("#group-" + field); // get the group so we can highlight the boxes red if necessary
        group.removeClass("has-error");
    }); 
    
    // give a toastr info notification that it was successfully reset
    toastr.info("form succesfully reset")
 
}

// function that handles the submit button
function submitButton() {

    // valid is a boolean we modify based on certain cases to determine if the form is valid or not. 
    // entries is the id of the fields that are required and cost is cost we have 
    let valid = true; 
    let entries = ["username", "firstName", "lastName", "phoneNumber", "faxNumber", "email"];
    let cost = $("#cost");

    // go through each field that is necessary
    entries.forEach(field => {
        let input = $("#" + field); // get the input 
        let group = $("#group-" + field); // get the group so we can highlight the boxes red if necessary
        group.removeClass("has-error");

        if(input.val().trim() === ""){  // Check for empty value
            group.addClass("has-error"); // give red box error if empty 
            let formatName = formatFieldName(field); // format name so we can return a clean looking toastr
            toastr.error(formatName + " is required");
            valid = false; // not valid if any field is empty
        }
    });
    
    if(cost.val().trim() === ""){ // if there is no value, it should be an error
        toastr.error("No cost was calculated")
        valid = false;
    } else if(cost.val() <= 0){
        toastr.error("Cost is negative") // if the cost is negative, it should be an error
        valid = false; 
    }
    
    

    if(valid){  // If form is valid
        toastr.success("Booking form successfully submitted!");
    }
}

// function I used to format the field names so that we can give a clean looking toastr
function formatFieldName(field) {
  // Insert a space before each uppercase letter and convert it to lowercase
  let formattedField = field.replace(/([A-Z])/g, ' $1').trim();
  
  // Capitalize the first letter of each word
  return formattedField.charAt(0).toUpperCase() + formattedField.slice(1);
}

