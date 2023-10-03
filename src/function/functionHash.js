export function encodeToAscii(inputString) {
    // let result = '';
    return inputString.split("")
    .map(c => c.charCodeAt(0).toString(16).padStart(2, "0"))
    .join("");
}

export function decodeFromAscii(inputString) {
    // let result = '';
    // for (let i = 0; i < inputString.length; i++) {
    //     result += String.fromCharCode(parseInt(inputString[i], 16));
    // }
    // const result = inputString.split('').map(hexCode => parseInt(hexCode, 16)).map(num => String.fromCharCode(num)).toString('ascii');
    return inputString.split(/(\w\w)/g)
    .filter(p => !!p)
    .map(c => String.fromCharCode(parseInt(c, 16)))
    .join("")
}