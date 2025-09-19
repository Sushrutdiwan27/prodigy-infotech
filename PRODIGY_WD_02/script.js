let timer;
let isRunning = false;
let elapsedTime = 0; // in milliseconds
let startTime;

function updateDisplay() {
  const time = Date.now() - startTime + elapsedTime;
  const hours = Math.floor(time / 3600000);
  const minutes = Math.floor((time % 3600000) / 60000);
  const seconds = Math.floor((time % 60000) / 1000);

  document.getElementById("display").textContent =
    `${hours.toString().padStart(2,'0')}:` +
    `${minutes.toString().padStart(2,'0')}:` +
    `${seconds.toString().padStart(2,'0')}`;
}

function start() {
  if (!isRunning) {
    startTime = Date.now();
    timer = setInterval(updateDisplay, 1000);
    isRunning = true;
  }
}

function pause() {
  if (isRunning) {
    clearInterval(timer);
    elapsedTime += Date.now() - startTime;
    isRunning = false;
  }
}

function reset() {
  clearInterval(timer);
  isRunning = false;
  elapsedTime = 0;
  document.getElementById("display").textContent = "00:00:00";
  document.getElementById("laps").innerHTML = "";
}

function lap() {
  if (isRunning) {
    const lapTime = document.getElementById("display").textContent;
    const lapContainer = document.getElementById("laps");
    const lapElement = document.createElement("p");
    lapElement.textContent = "Lap: " + lapTime;
    lapContainer.appendChild(lapElement);
  }
}
