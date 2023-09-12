function updateProgressBar() {
    // Get the current date
    const currentDate = new Date();

    // Get the start and end dates of the year
    const currentYear = currentDate.getFullYear(); // Get the current year
    const yearStart = new Date(currentYear, 0, 1); // January is 0
    const yearEnd = new Date(currentYear + 1, 0, 1); // Next year's January 1st

    // Calculate the progress percentage and round it to the nearest integer
    const progress = Math.floor(((currentDate - yearStart) / (yearEnd - yearStart)) * 100);

    // Update the progress bar width
    const progressBar = document.getElementById("year-progress");
    progressBar.style.width = progress + "%";

    // Display the progress message
    const progressMessage = document.getElementById("progress-message");
    progressMessage.textContent = `${progress}% of ${currentYear} has passed`;

    // Display today's date
    const currentDateElement = document.getElementById("current-date");
    const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;
    currentDateElement.textContent = formattedDate;

    // Calculate days passed
    const daysPassedElement = document.getElementById("days-passed");
    const daysPassed = Math.floor((currentDate - yearStart) / (24 * 60 * 60 * 1000));
    daysPassedElement.textContent = `${daysPassed}/${365}`; // Assuming a year has 365 days
}

// Function to update the current time
function updateCurrentTime() {
    const currentTimeElement = document.getElementById("current-time");
    const currentTime = new Date().toLocaleTimeString();
    currentTimeElement.textContent = currentTime;
}

// Call the updateProgressBar function initially
updateProgressBar();

// Set up an interval to update the progress and current time every second (1000 milliseconds)
setInterval(function () {
    updateProgressBar();
    updateCurrentTime();
}, 1000);

