# BootstrapForm
This is a booking form I created using html5, css, javascript, bootstrap 3, font awesome, and toastr. I have created panels for User, Contact, Schedule, and Other. With reset and submit buttons as well at the end. 

**What each panel includes:**
The **user** panel includes a text input for a username and first and last name. 
The **contact** panel includes a phone, fax, and email textboxes with prepended font awesome icons. 
The **schedule** panel includes a dropdown for number of adults (1 - 5 adults), a date picker for check-in, a date picker for check-out, a readonly days textbox, and a readonly cost textbox. The days and cost textboxes will automatically update whenever a new check-in and check-out date are selected and the check-out date is after the check-in date. 
The **other** panel includes a text box for a message, a horizontal range bar, and a priority picker. 

**Reset and Submit Buttons**
The **reset** button will reset all boxes to have no input and will also clear "has-error" class on the group input that highlights the box red if the user tries to submit with empty fields. Lastly it will create an info toastr that tells the user that the form was reset succesfully. 
The **submit** button will check that no inputs are empty, and also make sure that a non-negative cost was calculated. If any of these are not true, I will add the "has-error" class to the input group to make the box highlight in red.
