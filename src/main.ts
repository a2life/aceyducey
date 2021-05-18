import './style.css'
import drawCard from "./component/drawcard";
import messageBody from "./component/explanation";
import inbetween from './component/inbetween';
import {showElement,hideElement} from "./component/showhide";

interface PlayCard {
    face: string;
    value: number;
}

let cardOne = {} as PlayCard;
let cardTwo = {} as PlayCard;
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
const continueOrQuitElementId='continueOrQuit';
const playAgainElementId='playAgain';
const moneyOneHandElementId='moneyOnHand';

app.innerHTML = `
  <h1>Acey Ducey</h1>
  <p id="gameRule">
  ${messageBody}
</p>
 <div id="showCardDrawn">
  
</div>
<div id="${hiAceLoAceElementId}" style="display:none">
You have a choice for Ace,  would you like Hi Ace value of 14 or Low Ace value of 1 ?
<button id="${hiAceElementId}">Hi Ace</button><button id="${loAceElementId}">Lo Ace</button>
</div>
<div id="${betNoBetElementId}" style="display:none">
<button id="${betElementId}">Bet</button><button id="${noBetElementId}">No Bet</button>
</div>
<div id="betDiv" style="display:none">
Enter bet amount 
<input id="${betAmountElementId}" />
</div>
  <p id="gameResult"></p>
  <div id="continueOrQuit" style="display:none"><button id="playAgain" >Play Again?</button></div>
  <p id="${moneyOneHandElementId}">
You have now $${moneyOnHand}.
</p>
`;

document.addEventListener('click', (e) => {

    if ((e.target as HTMLTextAreaElement)!.matches('#hiAce')) {
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
        (<HTMLInputElement>document.getElementById(betAmountElementId))!.value=""
        showElement('betDiv');
        hideElement(betNoBetElementId);

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

const betEntry = document.querySelector(`#${betAmountElementId}`);
betEntry!.addEventListener('change',(e)=>{
    const betAmount = (<HTMLInputElement>e.target)!.value
    play(cardOne,cardTwo,parseInt(betAmount))
    hideElement('betDiv');

})

const dealTwoCards = () => {
    cardOne = drawCard();
    cardTwo = drawCard();
// show cards drawn
    document.getElementById('showCardDrawn')!.innerHTML = `we have ${cardOne.face} and ${cardTwo.face}`;
// if two cards are both Ace,
    if ((cardOne.value === 1) && (cardTwo.value === 1)) {
        //console log player win
        // then declare win and double the moneyOn hand
        document.getElementById('#gameResult')!.innerHTML = 'You won big!';
        moneyOnHand=moneyOnHand*2;
        askPlayorQuite();
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
const play = (cardOne: PlayCard, cardTwo: PlayCard, betAmount:number) => {
    const cardThree: PlayCard = drawCard();
    if (cardOne.value === 1) {
        cardOne.value = aceValue
    }
    if (cardTwo.value === 1) {
        cardTwo.value = aceValue
    }
    if (cardThree.value === 1) {
        cardThree.value = aceValue
    }
    if (inbetween(cardOne.value, cardTwo.value, cardThree.value)){
        moneyOnHand=moneyOnHand+betAmount;
    } else { moneyOnHand=moneyOnHand-betAmount}
    const winlose = inbetween(cardOne.value, cardTwo.value, cardThree.value) ? 'You win!' : 'You lose!';
    document.querySelector('#gameResult')!.innerHTML = `you draw ${cardThree.face}, ${winlose}`;
    askPlayorQuite();
}
const chicken = () => {
    document.querySelector('#gameResult')!.innerHTML = 'Chicken!';
    showElement(continueOrQuitElementId)
}

const askPlayorQuite=()=>{
    showElement(continueOrQuitElementId);
    document.getElementById(moneyOneHandElementId)!.innerHTML=`You now have $${moneyOnHand}`
}
//initial card dealing. repeat will be through 'play again?' button => click event
dealTwoCards()

