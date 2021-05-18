const inbetween = (num1: number, num2: number, num3: number) => {
    let highNum: number;
    let loNum: number;
    if (num1 > num2) {
        highNum = num1;
        loNum = num2;
    } else {
        highNum = num2;
        loNum = num1;
    }

    if (highNum >= num3 && loNum <= num3) {
        return true
    } else return false;
}

export default inbetween;