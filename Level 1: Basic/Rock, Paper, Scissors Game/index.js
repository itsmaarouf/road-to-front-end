const robotChoice = document.getElementById("robot-choice");
const userChoice = document.getElementById("player-choice");
const result = document.getElementById("result");
const choices =document.querySelectorAll("button")
let userChoiceValue;
let robotChoiceValue;
let ResultValue;

choices.forEach(choice => choice.addEventListener("click", (e) => {
    userChoiceValue = e.target.id;
    userChoice.innerText = userChoiceValue;
    randomRobotChoice()
    getResult()
}))

function randomRobotChoice() {
    const randomNumber = Math.floor(Math.random() * choices.length +1);
    
    if (randomNumber === 1) {
        robotChoiceValue = "rock"
    }
    if (randomNumber === 2) {
        robotChoiceValue = "paper"
    }
    if (randomNumber === 3) {
        robotChoiceValue = "scissors"
    }
    robotChoice.innerHTML = robotChoiceValue;
}

function getResult() {
    if (userChoiceValue === robotChoiceValue ) {
        ResultValue = 'its a draw'
    }
    else if ((userChoiceValue === "rock" && robotChoiceValue ==="scissors") || 
        (userChoiceValue === "scissors" && robotChoiceValue ==="paper") ||
        (userChoiceValue === "paper" && robotChoiceValue ==="rock") ){
            ResultValue = 'you win'
    }else {
            ResultValue = 'you lose'    
    }
    result.innerText = ResultValue;

}