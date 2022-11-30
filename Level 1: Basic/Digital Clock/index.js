// Digital clock variables
const hourEl = document.getElementById("hour");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");
const ampmEl = document.getElementById("ampm");

//StopWatch variables
const startStopBtn = document.querySelector('#startStopBtn')
const resetBtn = document.querySelector('#resetBtn')

// time values variables
let seconds = 0, minutes = 0,hours = 0;
let theSeconds = 0; theMinutes = 0; theHours = 0;

// lading zero 
let timerInterval = null;
let timerStatus = "stopped";

function updateClock(){
    let h = new Date().getHours()
    let m = new Date().getMinutes()
    let s = new Date().getSeconds()
    let ampm = "AM"

    if (h>12) {
        h-=12;
        ampm= "PM"
    }

    h = h < 10 ? "0" + h : h;
    m = m < 10 ? "0" + m : m;
    s = s < 10 ? "0" + s : s;

    hourEl.innerText= h;
    minutesEl.innerText= m;
    secondsEl.innerText= s;
    ampmEl.innerText=ampm;
    setTimeout(()=>{
        updateClock()
    }, 1000)
}
window.addEventListener('load', function () {
    if (document.title == "Digital Clock") {
        updateClock();
    }
})


function StopWatch() {
    seconds++;
    if (seconds / 60 === 1) {
        seconds = 0;
        minutes++;
        if (minutes / 60 === 1) {
            minutes = 0;
            hours++
        }
    }
    if (seconds < 10 ) {
        theSeconds = "0" + seconds.toString();
    } else {
        theSeconds = seconds;
    }
    if (minutes < 10 ) {
        theMinutes = "0" + minutes.toString();
    } else {
        theMinutes = minutes;
    }
    if (hours < 10 ) {
        theHours = "0" + hours.toString();
    } else {
        theHours = hours;
    }
    let displayTimer = document.getElementById('timer').innerText = theHours + ":" + theMinutes + ":" + theSeconds;
}

startStopBtn.addEventListener('click', function () {
    if (timerStatus === "stopped") {
        timerInterval = setInterval(StopWatch, 1000);
        document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-pause"></i>`;
        document.querySelector("#startStopBtn").style.backgroundColor = "orange";
        timerStatus = "started";
    } else {
        clearInterval(timerInterval);
        document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-play"></i>`;
        timerStatus = "stopped";
    }
})

resetBtn.addEventListener('click', function () {
    clearInterval(timerInterval);
    seconds = 0;
    minutes = 0;
    hours = 0;
    document.getElementById('timer').innerHTML = "00:00:00";
    document.getElementById('startStopBtn').innerHTML = `<i class="fa-solid fa-play"></i>`;
    timerStatus = "stopped";
    
})

