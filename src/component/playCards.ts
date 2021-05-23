const faceArray = ['Ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'Jack', 'Queen', 'King'];
const pArray = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
let suffix = "";
export interface playCard {
    face: string;
    value: number;
    png: string;
}
export const drawACard = () => {
    const seed = Math.floor(Math.random() * 52)
    const kind = Math.floor(seed /13);
    const num = seed % 13;
    switch (kind) {
        case 0:
            suffix = 'S';
            break;
        case 1:
            suffix = 'H';
            break;
        case 2:
            suffix = 'C';
            break;
        case 3:
            suffix = 'D';
            break;
        default:

    }

    let card: playCard = {face: faceArray[num], value: num + 1, png:pArray[num]+suffix};
    console.log(card);
    return card
}

export const showCard=(card:playCard, element:string)=>{
    (<HTMLImageElement>document.getElementById(element)).src=`/assets/img/PNG/${card.png}.png`;
}


