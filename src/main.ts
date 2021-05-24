import './style.css'
import {drawACard, playCard, showCard} from "./component/playCards";
import messageBody from "./component/explanation";
import numberIsInBetween from './component/inbetween';
import {setText, hideElement, showElement} from "./component/utility";


let cardOne = {} as playCard;
let cardTwo = {} as playCard;
let aceValue = 1;
let moneyOnHand: number = 100;

const app = document.querySelector<HTMLDivElement>('#app')!
const hiAceLoAceElementId = 'hiAceLoAce';
const loAceElementId = 'loAce';
const hiAceElementId = "hiAce";
const betNoBetElementId = 'betNoBet';
const betElementId = 'bet';
const noBetElementId = 'noBet';
const betAmountElementId = 'betAmount';
const continueOrQuitElementId = 'continueOrQuit';
const playAgainElementId = 'playAgain';
const moneyOneHandElementId = 'moneyOnHand';
const gameResultElementId = 'gameResult';
const betDivElementId = 'betDiv';
const backOfCard:playCard={png:"gray_back",face:'',value:0};

app.innerHTML = `
  <h1>Acey Ducey</h1>
  <p id="gameRule">
  ${messageBody}
</p>
<div id="cardTable" class="container-sm alert alert-success" role="alert">
<img id="cardOnePng"  src="" style="width:128px;" alt="card holder" />
<img id="cardTwoPng"  src="" style="width:128px;" alt="second card holder"/>
<img id="cardThreePng"  src="" style="width:128px;" alt="third card holder"/>
</div>
<div id="showCardDrawn">
  
</div>
<div id="${hiAceLoAceElementId}" style="display:none">
You have a choice for Ace,  would you like Hi Ace value of 14 or Low Ace value of 1 ?
<button id="${hiAceElementId}" class="btn btn-primary">Hi Ace</button><button id="${loAceElementId}" type="button" class="btn btn-primary">Lo Ace</button>
</div>
<div id="${betNoBetElementId}" style="display:none">
<button type="button" id="${betElementId}" class="btn btn-primary">Bet</button><button id="${noBetElementId}" type="button" class="btn btn-secondary">No Bet</button>
</div>
<div id="${betDivElementId}" style="display:none">
Enter bet amount 
<input id="${betAmountElementId}" />
</div>
  <p id="gameResult"></p>
  <div id="continueOrQuit" ><button type="button" class="btn btn-primary"id="playAgain" >Play ?</button></div>
  <p id="${moneyOneHandElementId}">
You have now $${moneyOnHand}.
</p>
`;
const betEntry = document.querySelector(`#${betAmountElementId}`);
showCard(drawACard(), 'cardOnePng')
showCard(drawACard(), 'cardTwoPng')
showCard(drawACard(), 'cardThreePng')

document.addEventListener('click', (e) => {

    if ((e.target as HTMLTextAreaElement)!.matches(`#${hiAceElementId}`)) {
        e.preventDefault();
        aceValue = 14;
        hideElement(hiAceLoAceElementId);
        showElement(betNoBetElementId)


    } else if ((e.target as HTMLTextAreaElement)!.matches(`#${loAceElementId}`)) {
        e.preventDefault();
        aceValue = 1;
        hideElement(hiAceLoAceElementId);

        showElement(betNoBetElementId);
    } else if ((e.target as HTMLTextAreaElement)!.matches(`#${betElementId}`)) {
        e.preventDefault();
        (<HTMLInputElement>document.getElementById(betAmountElementId))!.value = ""
        showElement('betDiv');
        hideElement(betNoBetElementId);
        (<HTMLTextAreaElement>betEntry!).focus();

    } else if ((e.target as HTMLTextAreaElement)!.matches(`#${noBetElementId}`)) {
        e.preventDefault();
        hideElement(betNoBetElementId);
        // go chicken
        chicken();
    } else if ((e.target as HTMLTextAreaElement)!.matches(`#${playAgainElementId}`)) {
        e.preventDefault();
        hideElement(continueOrQuitElementId);

        document.getElementById('gameResult')!.innerHTML = "";
        dealTwoCards();
    } else
        return
})


betEntry!.addEventListener('change', (e) => {
    const betAmount = parseInt((<HTMLInputElement>e.target)!.value);
    if (betAmount <= moneyOnHand) {
        play(cardOne, cardTwo, betAmount)
        hideElement('betDiv');
    } else window.alert("You are betting more than you have.  Reduce you bet! ")
})


const dealTwoCards = () => {
    cardOne = drawACard();
    cardTwo = drawACard();
    while (cardOne === cardTwo) cardTwo = drawACard();  // avoid showing duplicate
    showCard(cardOne,"cardOnePng");
    showCard(cardTwo,'cardTwoPng');
    showCard(backOfCard, 'cardThreePng');

// show cards drawn

    setText('showCardDrawn', `we have ${cardOne.face} and ${cardTwo.face}`)
// if two cards are both Ace,
    if ((cardOne.value === 1) && (cardTwo.value === 1)) {
        //console log player win
        // then declare win and double the moneyOn hand
        document.getElementById(gameResultElementId)!.innerHTML = 'You won big!';
        moneyOnHand = moneyOnHand * 2;
        askPlayAgain();
    }

// else if either card is Ace,
    else if ((cardOne.value === 1) || (cardTwo.value === 1)) {
        // confirm hi/lo .  Selecting Hi lo will display Bet/nobet button
        showElement('hiAceLoAce');
//
// bet button will trigger
// 1. display bet amount box
// 2. Entering bet amount box will trigger  Calculation and announce the result
    } else {
        showElement('betNoBet');
    }

}
const play = (cardOne: playCard, cardTwo: playCard, betAmount: number) => {
    let cardThree: playCard = drawACard();
    while (cardOne === cardThree || cardTwo === cardThree) cardThree = drawACard();
    (<HTMLImageElement>document.getElementById('cardThreePng')).src = `/assets/img/PNG/${cardThree.png}.png`;

    if (cardOne.value === 1) {
        cardOne.value = aceValue
    }
    if (cardTwo.value === 1) {
        cardTwo.value = aceValue
    }
    if (cardThree.value === 1) {
        cardThree.value = aceValue
    }
    if (numberIsInBetween(cardOne.value, cardTwo.value, cardThree.value)) {
        moneyOnHand = moneyOnHand + betAmount;
    } else {
        moneyOnHand = moneyOnHand - betAmount
    }
    const winLose = numberIsInBetween(cardOne.value, cardTwo.value, cardThree.value) ? 'You win!' : 'You lose!';
    setText(gameResultElementId, `you draw ${cardThree.face}, ${winLose}`)
    askPlayAgain();
}
const chicken = () => {
    setText(gameResultElementId, 'Chicken!');
    showElement(continueOrQuitElementId)
}

const askPlayAgain = () => {
    setText(moneyOneHandElementId, `You now have $${moneyOnHand}`);
    showElement(continueOrQuitElementId);
}

