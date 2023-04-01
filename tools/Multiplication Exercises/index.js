const num1 = Math.ceil(Math.random() * 10)
const num2 = Math.ceil(Math.random() * 10)

const formEl = document.getElementById("form");
let scoreEl = document.getElementById("score");
let timeLeft = document.getElementById("timeLeft");
let score = JSON.parse(localStorage.getItem("score"));
const mQuestion = document.getElementById("question");
const answerEl = document.getElementById("Answer");
let time = 5;
let currentTime = time;
let restart = 10;
const btn = document.querySelector('.btn');
const content = document.querySelector('.exe');
const result = document.querySelector('.result');

mQuestion.innerText = `what is ${num1} multiply by ${num2}?`;

const mCorrectAns = num1 * num2;

if (!score) score = 0;

scoreEl.innerText = `score: ${score}`

formEl.addEventListener("submit", controlAnswer);

function controlAnswer() {
    const userAnswer = +answerEl.value;
    if (userAnswer === mCorrectAns) {
        score++;
        updateLocalStorage()
    } else {
        score--;
        updateLocalStorage()
    }
}

const updateLocalStorage = () => localStorage.setItem("score", JSON.stringify(score))

function countDown() {
    currentTime--;
    timeLeft.innerText = `time left: ${currentTime}`

    if (currentTime == 0) {
        formEl.removeEventListener('submit', controlAnswer);
        clearInterval(timeId);
        btn.disabled = true;
        btn.classList.toggle('disabled');
        content.style.display = 'none';
        result.style.display = 'block';
        result.innerHTML = `Game over! Your final score is ${score} <br> <small style="font-size:0.7em">the game will restart after ${restart} seconds.</small>`
        function theRestart() {
            restart--;
            result.innerHTML = `Game over! Your final score is ${score} <br> <small style="font-size:0.7em">the game will restart after ${restart} seconds.</small>`

            if (restart == 0) {
                localStorage.setItem("score", JSON.stringify(score = 0));
                window.location.reload()
            }
        }
        setInterval(theRestart, 1000)
    }
}
let timeId = setInterval(countDown, 1000);

