const startBtn = document.querySelector('#start');
const pauseBtn = document.querySelector('#pause');
const stopBtn = document.querySelector('#stop');

const displayTimeElement = document.querySelector('#time');

let hh, mm, ss;
hh = mm = ss = 0;

let pause = true;

let timeHandler;

function displayTime() {
  let h, m, s;
  h = hh;
  m = mm;
  s = ss;
  if (hh < 10) {
    h = '0' + hh;
  }
  if (mm < 10) {
    m = '0' + mm;
  }
  if (ss < 10) {
    s = '0' + ss;
  }
  displayTimeElement.textContent = `${h}:${m}:${s}`;
}

function startTimer() {
  pause = false;
  pauseBtn.textContent = 'pause';
  timeHandler = setInterval(() => {
    ss += 1;
    if (ss >= 60) {
      mm += 1;
      ss = 0;
      if (mm >= 60) {
        hh += 1;
        mm = 0;
      }
    }
    displayTime();
  }, 1000);
}

function resetTimer() {
  pause = true;
  hh = mm = ss = 0;
}

function pauseTimer() {
  pause = true;
  clearInterval(timeHandler);
  pauseBtn.textContent = 'continue';
}

function continueTimer() {
  pause = false;
  startTimer();
  pauseBtn.textContent = 'pause';
}

function stopTimer() {
  pause = true;
  clearInterval(timeHandler);
  resetTimer();
  displayTime();
}

function toggleActiveBtn() {
  startBtn.disabled = !startBtn.disabled;
  stopBtn.disabled = !startBtn.disabled;
  if (startBtn.disabled) {
    pauseBtn.disabled = false;
  } else {
    pauseBtn.disabled = true;
  }
}

startBtn.addEventListener('click', function () {
  startTimer();
  toggleActiveBtn();
});

stopBtn.addEventListener('click', function () {
  stopTimer();
  toggleActiveBtn();
  pauseBtn.textContent = 'pause';
});

pauseBtn.addEventListener('click', function () {
  if (pause) {
    continueTimer();
    pause = false;
    // stopBtn.disabled = true;
  } else {
    pauseTimer();
    pause = true;
    // stopBtn.disabled = false;
  }
});
