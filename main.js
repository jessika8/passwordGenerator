
//DOM elemnts
const resultElement = document.getElementById("result");
const lengthElement = document.getElementById("length");
const uppercaseElement = document.getElementById("uppercase");
const lowercaseElement = document.getElementById("lowercase");
const numberElement = document.getElementById("numbers");
const symbolsElement = document.getElementById("symbols");
const generateElement = document.getElementById("generate");
const clipboardElement = document.getElementById("clipboard");


//generate password click event listener
// getting the values
generateElement.addEventListener('click', () => {
    //getting the value of password length
    // + is making the value of string to numbers
    const length = +lengthElement.value;

    // i want to see if the boxes have been ticked, do they have a value
    // .checked - is it checked - going to be true or false
    const hasLower = lowercaseElement.checked;
    const hasUpper = uppercaseElement.checked;
    const hasNumber = numberElement.checked;
    const hasSymbols = symbolsElement.checked;

    //generatePassword result is going to be in the password genetare box (the actual password)
    resultElement.innerText = generatePassword(hasLower, hasUpper, hasNumber, hasSymbols, length);
})



// Generate password function
const generatePassword = (lower, upper, number, symbol, length) => {
    //1. Init password variable
    //2. Filter out unchecked types
    //3. Loop over the length, call generation function for each type
    //4. Add final password to the password variable and return

    //Init password
    let generatePassword = "";
    // Count checked items
    const typesCount = lower + upper + number + symbol;
    //console.log("typesCount: ", typesCount)

    // creating an array based these checked values
    // {} array with objects, true or false (lower=true or false)...
    //we need to filter out what ever is false, don't need that false
    // .filter - higher order array method, loop trough each item, based on a true or false value (unchecked), filters out false value items
    // Objects.values - getting the value (true or false)  item - passing the array  [0] - first value - if it uncheck, it is going to be filtred out of array
    const typesArr = [{lower}, {upper}, {number}, {symbol}].filter(item => Object.values(item)[0]);
    // console.log("typesArr: ", typesArr);

    //cheking if there are nonchecked - checking the typesCount = checked boxes
    if (typesCount === 0) {
        return "";
    }

    //Generaiting different characters
    // loop over the lenght, call generationfunction for each type
    // length(it is currently 20), incramenting by checked boxes (typesCount)
    // we are incramenting by the typesCount - so if I want a password with 10 charackters - it is going to be 12... so we need to use slice
    for(let i = 0; i < length; i += typesCount) {

        typesArr.forEach(type => {
            //looping trough typesArr, [0] - going to give the first value key (upper, lower, number or symbol)
            const funcName = Object.keys(type)[0];
            // console.log("funcName: ", funcName)

            //appent to it a key (upper,lower,number,symbol)
            generatePassword += randomFunc[funcName]();
        });
    }
    // so we can get the actual length of the password
    const finalPassword = generatePassword.slice(0, length)
    return finalPassword
}



// Generator functions

const getRandomLower = () => {
    const lower = "abcdefghijklmnopqrstuvwxyz"
    return lower[Math.floor(Math.random() * lower.length)]
}

const getRandomUpper = () => {
    const upper = "ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    return upper[Math.floor(Math.random() * upper.length)]
}

const getRandomNumber = () => {
    return Math.floor(Math.random() * 10)
}

const getRandomSymbol = () => {
    const symbols = "!@#%^&*(){}[]=<>/,.'"
    return symbols[Math.floor(Math.random() * symbols.length)]

}
// console.log(getRandomSymbol())


const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

// Copy password to clipboard
// need to create a <textarea>, use .select() method to select contents of the <texarea> element
// Document.execCommand('copy') to copy the contents of the <textarea> to the clipboard
// remove the <textareas> element from the document
clipboardElement.addEventListener("click", () =>{
    //creating textarea 
    const textarea = document.createElement("textarea");
    const password = resultElement.innerText;

    //check if there is nothing in there, return
    if (!password) {
        return;
    }

    textarea.value = password;

    // appendChild - puts it to the body
    document.body.appendChild(textarea);
    textarea.select()
    // coping to the clipboard
    document.execCommand("copy");
    // removing the texarea, we dont want to keep it there
    textarea.remove()
    alert("Password copied to clipboard");
})