// variables
// this is how we find an element
const documentBody = document.querySelector("body");
console.log(documentBody);

const myName = "Munich";
let myHungriness = 0.3;
console.log(myHungriness);
myHungriness = 0.5;
console.log(myHungriness);

// console.log() sends messages to the browser console
console.log("Hello");

let stepNumber = 4;
console.log("Taking step:", stepNumber, "... I think");

// let name = prompt("What is your name?");

// strings
let firstName = "Munich";
let surname = "Bats";
let quote = "This is a 'quote'";
console.log(quote);
let nameString = `My full name is ${firstName} ${surname}.`;
console.log(nameString);

// type conversion
let myAge = 20;
let timePass = 5;
let updateAge = myAge + parseFloat(timePass);

//math operators = - = / *

console.log(updateAge);

// arrays
let myPets = ["Champee", "Champada", "Champoon"];

console.log(myPets);
console.log(myPets[2]);

//conditionals
const a = 10;
let b = "10";
let setToBlue = false;

if (!setToBlue) {
  document.body.style.backgroundColor = "red";
} else {
  document.body.style.backgroundColor = "blue";
}

// functions
function tellMeHowHungryIAM() {
  console.log(hiddenVariable);
}

console.log(hiddenVariable);
