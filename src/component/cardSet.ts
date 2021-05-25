const faceArray = ['Ace', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'Jack', 'Queen', 'King'];
const pArray = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
const suite = ["D", "H", "C", "S"]

export interface IPlayCard {
    face: string;
    value: number;
    png: string;
    sortValue?: number
}

export class CardDeck {
    card: IPlayCard[] = [];
    private pointer = 0;

    constructor() {
        for (let x = 0; x < 52; x++) {
            this.card[x] = {
                face: faceArray[x % 13],
                value: (x % 13) + 1,
                png: pArray[x % 13] + suite[Math.floor(x / 13)],
                sortValue: 0
            };
        }
        this.shuffle()

    }

    public shuffle = () => {
        this.card.forEach(element => element.sortValue = Math.random());
        this.card = this.card.sort((a, b) => a.sortValue! - b.sortValue!)


    }

    public next = () => {
        if (this.pointer >=this.card.length){
            this.pointer =0;
            this.shuffle();
        }
            return  this.card[this.pointer++]



    }
}

export const showCard=(card:IPlayCard, element:string)=>{
    (<HTMLImageElement>document.getElementById(element)).src=`/assets/img/PNG/${card.png}.png`;
}
