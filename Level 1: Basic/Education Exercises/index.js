const num1  = Math.ceil(Math.random()*10)
const num2  = Math.ceil(Math.random()*10)

const formEl = document.getElementById("form");
let scoreEl = document.getElementById("score");
let score = JSON.parse(localStorage.getItem("score"));
const mQuestion = document.getElementById("question");
const answerEl = document.getElementById("Answer");

mQuestion.innerText = `what is ${num1} multiply by ${num2}?`;

const mCorrectAns = num1 * num2;

if (!score) {
    score = 0;  
} 

scoreEl.innerText = `score : ${score}`

formEl.addEventListener("submit",()=>{
    const userAnswer = +answerEl.value;
    if (userAnswer === mCorrectAns) {
        score++;
        updateLocalStorage()
    }else{
        score--;
        updateLocalStorage()
    }

});

function updateLocalStorage(){
    localStorage.setItem("score", JSON.stringify(score))
}