document.addEventListener('DOMContentLoaded', function () {
    const progressBar = document.getElementById('progress-bar');
    const progressMessage = document.getElementById('progress-message');
    const todayDate = document.getElementById('today-date');
    const currentTime = document.getElementById('current-time');
    const daysPassed = document.getElementById('days-passed');
    const screenshotButton = document.getElementById('screenshot-btn');
    const captureArea = document.getElementById('capture-area');
    let screenshotImage = null;

    // Start and end dates for 2025
    const startOfYear = new Date(2025, 0, 1);
    const endOfYear = new Date(2025, 11, 31);

    function updateInfo() {
        const currentDate = new Date();

        if (currentDate >= new Date(2026, 0, 1)) {
            progressMessage.innerText = "100% of 2025 has passed.";
            progressBar.style.width = "100%";
            todayDate.innerText = `Today's Date: ${currentDate.toDateString()}`;
            currentTime.innerText = `Current Time: ${currentDate.toLocaleTimeString()}`;
            daysPassed.innerText = `Days Passed: Day 365 of 365`;
            return;
        }

        const totalMilliseconds = endOfYear - startOfYear;
        const passedMilliseconds = currentDate - startOfYear;
        const progressPercentage = (passedMilliseconds / totalMilliseconds) * 100;

        const totalDays = Math.floor(totalMilliseconds / (1000 * 60 * 60 * 24)) + 1;
        const passedDays = Math.floor(passedMilliseconds / (1000 * 60 * 60 * 24)) + 1;

        progressBar.style.width = `${progressPercentage}%`;
        progressMessage.innerText = `${Math.floor(progressPercentage)}% of 2025 has passed.`;

        todayDate.innerText = `Today's Date: ${currentDate.toDateString()}`;
        currentTime.innerText = `Current Time: ${currentDate.toLocaleTimeString()}`;
        daysPassed.innerText = `Days Passed: Day ${passedDays} of ${totalDays}`;
    }

    setInterval(updateInfo, 1000); // Update every second
    updateInfo(); // Initial call

    // Handle screenshot functionality
    screenshotButton.addEventListener('click', function () {
        if (screenshotButton.innerText === 'Take Screenshot' || screenshotButton.innerText === 'Take Another Screenshot') {
            screenshotButton.innerText = 'Taking Screenshot...';
            screenshotButton.style.backgroundColor = '#ffcc00'; // Yellow during capturing

            html2canvas(captureArea).then(function (canvas) {
                screenshotImage = canvas.toDataURL(); // Save screenshot as data URL

                screenshotButton.innerText = 'Screenshot Successful! Download Screenshot';
                screenshotButton.style.backgroundColor = '#4caf50'; // Green after successful capture
            }).catch(function (error) {
                console.error('Error capturing screenshot:', error);
                screenshotButton.innerText = 'Take Screenshot';
                screenshotButton.style.backgroundColor = '#f44336'; // Red on error
            });
        } else if (screenshotButton.innerText === 'Screenshot Successful! Download Screenshot') {
            if (screenshotImage) {
                const link = document.createElement('a');

                // Generate a unique name using timestamp
                const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
                const fileName = `progress-screenshot-${timestamp}.png`;

                link.href = screenshotImage;
                link.download = fileName;
                link.click();

                screenshotButton.innerText = 'Take Another Screenshot';
                screenshotButton.style.backgroundColor = '#2196f3'; // Blue for taking another screenshot
            }
        }
    });
});
