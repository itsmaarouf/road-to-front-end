const cardArray = [
    {
   
      name: 'fries',
      img: 'img/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'img/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'img/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'img/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'img/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'img/hotdog.png'
    },
    {
      name: 'fries',
      img: 'img/fries.png'
    },
    {
      name: 'cheeseburger',
      img: 'img/cheeseburger.png'
    },
    {
      name: 'ice-cream',
      img: 'img/ice-cream.png'
    },
    {
      name: 'pizza',
      img: 'img/pizza.png'
    },
    {
      name: 'milkshake',
      img: 'img/milkshake.png'
    },
    {
      name: 'hotdog',
      img: 'img/hotdog.png'
    }
  ];

cardArray.sort(() => 0.5 - Math.random());

const resultDisplay = document.querySelector('#result');
const messageDisplay = document.querySelector('#msg');
const gridDisplay = document.querySelector('#grid');
let cardChosen = [];
let cardChosenIds = [];
const cardsWon = [];

function createBoard() {
  for (let i = 0; i < cardArray.length; i++) {
    const card = document.createElement('img');
    card.setAttribute('src','img/blank.png');
    card.setAttribute('data-id', i)
    card.addEventListener('click',flipCard);
    gridDisplay.appendChild(card);
    
  }
}
createBoard();

function checkMatch() {
  const cards = document.querySelectorAll('#grid img');
  const optionOneId = cardChosenIds[0];
  const optionTwoId = cardChosenIds[1];

  if(optionOneId === optionTwoId) {
    messageDisplay.textContent ="Sorry, but you don't have clicked the same card twice";
    cardChosen = [];
    cardChosenIds = [];
  }

  if(cardChosen[0] == cardChosen[1] && cardChosenIds[0] != cardChosenIds[1]){
    messageDisplay.textContent ='Good, you have a match';
    cards[optionOneId].setAttribute('src','img/white.png');
    cards[optionTwoId].setAttribute('src','img/white.png');
    cards[optionOneId].removeEventListener('click', flipCard);
    cards[optionTwoId].removeEventListener('click', flipCard);
    cardsWon.push(cardChosen)
    resultDisplay.textContent = cardsWon.length;
    
  }else{
    console.log('you have no match');
    cards[optionOneId].setAttribute('src','img/blank.png');
    cards[optionTwoId].setAttribute('src','img/blank.png');
    messageDisplay.textContent ='Sorry, play again';
  }
    cardChosen = [];
    cardChosenIds = [];

    if(cardsWon.length == cardArray.length/2){
      resultDisplay.textContent = 'Congratulations you found them all.';
    }
    if(messageDisplay.textContent.includes('Sorry')){
      messageDisplay.style.background= 'brown';
      messageDisplay.style.color= 'white';
    }else if(messageDisplay.textContent.includes('Good')){
      messageDisplay.style.background= '#6bbd6b';
    }else{
      messageDisplay.style.display='none';
    }

}

function flipCard(){
  const cardId = this.getAttribute('data-id');
  const cardImage = cardArray[cardId].img;
  const cardName = cardArray[cardId].name;
  
  cardChosen.push(cardName);
  cardChosenIds.push(cardId);
  console.log(cardChosen , ' ', cardChosenIds);
  this.setAttribute('src', cardImage)

  if (cardChosen.length === 2) {
    setTimeout( checkMatch, 500);
  }
}