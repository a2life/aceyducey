export const showElement = (elementId: string) => {
    document.getElementById(elementId)!.style.display = '';
}
export const hideElement = (elementId: string) => {
    document.getElementById(elementId)!.style.display = 'none';
}