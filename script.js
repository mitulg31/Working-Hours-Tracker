let week1Submitted = false;
let week2Submitted = false;
let totalWeek1Hours = 0;
let totalWeek2Hours = 0;
let week1StartDate = '';
let week2StartDate = '';

// Function to calculate and display totals for Week 1
function calculateAndDisplayWeek1Total() {
    // Calculate total week 1 hours
    const week1Hours = [
        parseFloat(document.getElementById("mondayHours").value) || 0,
        parseFloat(document.getElementById("tuesdayHours").value) || 0,
        parseFloat(document.getElementById("wednesdayHours").value) || 0,
        parseFloat(document.getElementById("thursdayHours").value) || 0,
        parseFloat(document.getElementById("fridayHours").value) || 0,
        parseFloat(document.getElementById("saturdayHours").value) || 0,
        parseFloat(document.getElementById("sundayHours").value) || 0,
    ];
    totalWeek1Hours = week1Hours.reduce((acc, cur) => acc + cur, 0);

    // Update the total week 1 hours in the display
    document.getElementById("totalWeek1Hours").innerText = `Total Week 1 Hours: ${totalWeek1Hours}`;

    // Calculate remaining or exceeding hours and update the message
    updateMessage();
    
    // Update local storage
    localStorage.setItem('totalWeek1Hours', totalWeek1Hours.toString());
}

// Function to calculate and display totals for Week 2
function calculateAndDisplayWeek2Total() {
    // Calculate total week 2 hours
    const week2Hours = [
        parseFloat(document.getElementById("mondayHours2").value) || 0,
        parseFloat(document.getElementById("tuesdayHours2").value) || 0,
        parseFloat(document.getElementById("wednesdayHours2").value) || 0,
        parseFloat(document.getElementById("thursdayHours2").value) || 0,
        parseFloat(document.getElementById("fridayHours2").value) || 0,
        parseFloat(document.getElementById("saturdayHours2").value) || 0,
        parseFloat(document.getElementById("sundayHours2").value) || 0,
    ];
    totalWeek2Hours = week2Hours.reduce((acc, cur) => acc + cur, 0);

    // Update the total week 2 hours in the display
    document.getElementById("totalWeek2Hours").innerText = `Total Week 2 Hours: ${totalWeek2Hours}`;

    // Calculate remaining or exceeding hours and update the message
    updateMessage();
    
    // Update local storage
    localStorage.setItem('totalWeek2Hours', totalWeek2Hours.toString());
}

// Function to update the message for remaining or exceeding hours
function updateMessage() {
    // Calculate grand total hours
    const grandTotalHours = totalWeek1Hours + totalWeek2Hours;

    // Update the grand total hours in the display
    document.getElementById("grandTotalHours").innerText = `Grand Total Hours: ${grandTotalHours}`;

    // Calculate remaining or exceeding hours
    const extraHours = grandTotalHours < 48 ? 48 - grandTotalHours : 0;
    const message = grandTotalHours <= 48 ? `You can work ${extraHours} extra hours.` : `You exceeded the hours by ${grandTotalHours - 48} hours.`;

    // Update the message
    document.getElementById("extraHours").innerText = message;
}

// Event listener for Week 1 form submission
document.getElementById("week1Form").addEventListener("submit", function (e) {
    e.preventDefault();
    calculateAndDisplayWeek1Total();
});

// Event listener for Week 2 form submission
document.getElementById("week2Form").addEventListener("submit", function (e) {
    e.preventDefault();
    calculateAndDisplayWeek2Total();
});

// Load data from local storage when the page loads
window.addEventListener("load", function () {
    totalWeek1Hours = parseFloat(localStorage.getItem("totalWeek1Hours")) || 0;
    totalWeek2Hours = parseFloat(localStorage.getItem("totalWeek2Hours")) || 0;
    week1StartDate = localStorage.getItem("week1StartDate") || "";
    week2StartDate = localStorage.getItem("week2StartDate") || "";

    document.getElementById("totalWeek1Hours").innerText = `Total Week 1 Hours: ${totalWeek1Hours}`;
    document.getElementById("totalWeek2Hours").innerText = `Total Week 2 Hours: ${totalWeek2Hours}`;
    document.getElementById("grandTotalHours").innerText = `Grand Total Hours: ${totalWeek1Hours + totalWeek2Hours}`;
    
    // Calculate and display the initial message
    updateMessage();
});

// Event listeners for input fields to recalculate totals on change
const inputFields = document.querySelectorAll("input[type='number']");
inputFields.forEach(function (input) {
    input.addEventListener("change", function() {
        calculateAndDisplayWeek1Total();
        calculateAndDisplayWeek2Total();
    });
});


const decimalInputs = document.querySelectorAll('.decimal-input');

decimalInputs.forEach(input => {
    input.addEventListener('input', () => {
        const value = input.value;
        if (!/^\d+(\.\d{0,2})?$/.test(value)) {
            input.value = value.slice(0, -1);
        }
    });
});

