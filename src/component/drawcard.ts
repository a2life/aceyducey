const faceArray = ['Ace','two','three','four','five','six','seven','eight','nine','ten','Jack','Queen','King'];
const drawCard=()=> {
    const num= Math.floor(Math.random()*13)
    let card:{face:string,value:number}={face:faceArray[num],value:num+1};
    return card;
}

export default drawCard;

