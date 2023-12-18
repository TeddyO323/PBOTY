// Get the current date in GMT+3 time zone
const currentDate = new Date(new Intl.DateTimeFormat('en-US', { timeZone: 'Europe/Moscow' }).format(new Date()));

// Get the start and end dates of the year 2023 in GMT+3 time zone
const startDate = new Date(Date.UTC(2023, 0, 1));
const endDate = new Date(Date.UTC(2023, 11, 31, 23, 59, 59));

// Calculate the percentage of the year completed
const progressPercentage = ((currentDate - startDate) / (endDate - startDate)) * 100;

// Ensure the progress is capped at 100%
const cappedProgress = Math.min(progressPercentage, 100);

// Update the progress bar, title, and text
const progressBar = document.getElementById('progress-bar');
const progressTitle = document.getElementById('progress-title');

progressTitle.textContent = `0% of 2023 has passed`; // Start with 0%
progressBar.style.width = `0%`; // Start with 0%

// Animate the progress bar, title, and text
function animateProgressBar() {
  let width = 0;
  const increment = 0.5; // Adjust the increment value for speed

  const interval = setInterval(function () {
    if (width >= cappedProgress) {
      clearInterval(interval);
    } else {
      width += increment;
      progressBar.style.width = `${width}%`;
      progressTitle.textContent = `${Math.floor(width)}% of 2023 has passed!!`;
    }
  }, 10); // Adjust the interval duration for smoothness
}

// Update additional information
const daysToChristmasSpan = document.getElementById('days-to-christmas');
const currentDateSpan = document.getElementById('current-date');
const daysPassedSpan = document.getElementById('days-passed');
const currentTimeSpan = document.getElementById('current-time');

function updateInfo() {
  const now = new Date();
  const daysToChristmas = Math.ceil((new Date('2023-12-25T00:00:00Z') - now) / (1000 * 60 * 60 * 24));
  const daysPassed = Math.floor((now - startDate) / (1000 * 60 * 60 * 24));

  daysToChristmasSpan.textContent = daysToChristmas;
  currentDateSpan.textContent = now.toLocaleDateString();
  daysPassedSpan.textContent = daysPassed;
  currentTimeSpan.textContent = now.toLocaleTimeString();
}

function applyColors() {
    const barColorInput = document.getElementById('barColor');
    const containerColorInput = document.getElementById('containerColor');
    const progressBar = document.getElementById('progress-bar');
    const progressBarContainer = document.getElementById('progress-bar-container');
  
    const barColor = barColorInput.value;
    const containerColor = containerColorInput.value;
  
    // Apply user-selected colors
    progressBar.style.backgroundColor = barColor;
    progressBarContainer.style.backgroundColor = containerColor;
  }
  
  // Trigger applyColors when the page is loaded
  window.addEventListener('load', applyColors);
  

// Trigger the animation and continuously update the time
window.addEventListener('load', function () {
  animateProgressBar();
  updateInfo();
  setInterval(updateInfo, 1000); // Update every 1000 milliseconds (1 second)
});

// Array of snowflake characters
const snowflakeCharacters = ['❄', '❅', '❆'];

// Function to create a snowflake and add it to the page
function createSnowflake() {
  const snowflake = document.createElement('div');
  snowflake.className = 'snowflake';

  // Randomly select a snowflake character from the array
  const randomIndex = Math.floor(Math.random() * snowflakeCharacters.length);
  snowflake.innerHTML = snowflakeCharacters[randomIndex];

  // Adjust the font size for the larger snowflake
  if (snowflake.innerHTML === '❆') {
    snowflake.style.fontSize = '40px'; // Set the desired font size
    
  }
    // Adjust the font size for the larger snowflake
    if (snowflake.innerHTML === '❅') {
        snowflake.style.fontSize = '30px'; // Set the desired font size
      }
    

  // Randomize starting position and animation duration
  const startPosition = Math.random() * window.innerWidth;
  const animationDuration = 5 + Math.random() * 10; // Between 5 and 15 seconds

  snowflake.style.left = startPosition + 'px';
  snowflake.style.animation = `fall ${animationDuration}s linear infinite`;

  // Append the snowflake to the snowflakes container
  document.getElementById('snowflakes').appendChild(snowflake);
}

// Create multiple snowflakes
for (let i = 0; i < 30; i++) {
  createSnowflake();
}
// Function to update the timezone based on user selection
function updateTimezone() {
    const timezoneSelect = document.getElementById('timezone');
    const selectedTimezone = timezoneSelect.value;
  
    // Update the timezone in the additional info section
    const timezoneInfo = document.getElementById('timezone-info');
    timezoneInfo.textContent = `Your timezone: ${selectedTimezone}`;
  
    // You can also update other time-related information here if needed
  }

