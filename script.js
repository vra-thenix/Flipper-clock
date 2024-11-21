let intervalId; // Variable to store the interval ID

function updateClock() {
  const timezoneOffset = parseInt(document.getElementById("timezone").value, 10);

  // Clear any existing interval to avoid multiple intervals running
  if (intervalId) {
    clearInterval(intervalId);
  }

  // Store the previous time values to detect changes
  let previousHours = "";
  let previousMinutes = "";
  let previousSeconds = "";

  intervalId = setInterval(() => {
    const currentTime = new Date();
    const utcTime = currentTime.getTime() + currentTime.getTimezoneOffset() * 60000;
    const timeInZone = new Date(utcTime + timezoneOffset * 3600000);

    // Extract hours, minutes, and seconds
    let hours = timeInZone.getUTCHours().toString().padStart(2, '0');
    let minutes = timeInZone.getUTCMinutes().toString().padStart(2, '0');
    let seconds = timeInZone.getUTCSeconds().toString().padStart(2, '0');

    // Update the hours if it has changed
    if (hours !== previousHours) {
      flipDigit(document.getElementById("hours"), hours);
      previousHours = hours;
    }

    // Update the minutes if it has changed
    if (minutes !== previousMinutes) {
      flipDigit(document.getElementById("minutes"), minutes);
      previousMinutes = minutes;
    }

    // Update the seconds if it has changed
    if (seconds !== previousSeconds) {
      flipDigit(document.getElementById("seconds"), seconds);
      previousSeconds = seconds;
    }
  }, 1);
}

// Function to update the digit and apply the flipping effect
function flipDigit(element, newValue) {
  element.style.transform = "rotateX(-90deg)"; // Flip out
  setTimeout(() => {
    element.textContent = newValue; // Update the value
    element.style.transform = "rotateX(0deg)"; // Flip back in
  }, 300); // Delay to allow the flip-out animation to complete
}

// Initialize clock
updateClock();
