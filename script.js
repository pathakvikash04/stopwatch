
let timer;
let elapsedTime = 0;
let running = false;

function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const milliseconds = ms % 1000;

    return (
        String(minutes).padStart(2, '0') + ':' +
        String(seconds).padStart(2, '0') + ':' +
        String(Math.floor(milliseconds / 10)).padStart(2, '0')
    );
}

function updateDisplay() {
    document.getElementById('display').textContent = formatTime(elapsedTime);
}

function startStop() {
    const startStopBtn = document.getElementById('startStopBtn');
    if (running) {
        clearInterval(timer);
        running = false;
        startStopBtn.textContent = 'Start';
    } else {
        const startTime = Date.now() - elapsedTime;
        timer = setInterval(() => {
            elapsedTime = Date.now() - startTime;
            updateDisplay();
        }, 10);
        running = true;
        startStopBtn.textContent = 'Pause';
    }
}

function reset() {
    clearInterval(timer);
    elapsedTime = 0;
    running = false;
    document.getElementById('startStopBtn').textContent = 'Start';
    updateDisplay();
    document.getElementById('laps').innerHTML = '';
}

function recordLap() {
    if (!running) return;
    const lapTime = formatTime(elapsedTime);
    const lap = document.createElement('div');
    lap.textContent = lapTime;
    lap.className = 'lap';
    document.getElementById('laps').appendChild(lap);
}
