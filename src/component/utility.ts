export const showElement = (elementId: string) => {
    document.getElementById(elementId)!.style.display = '';
}
export const hideElement = (elementId: string) => {
    document.getElementById(elementId)!.style.display = 'none';
}

export const setText=(element:string, text:string)=>{
    document.getElementById(element)!.innerHTML=text;
}

