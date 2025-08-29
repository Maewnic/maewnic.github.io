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

// for loop
for (let steps = 0; steps < 5; steps++) {
  console.log("Step taken:", steps);
}

// for each

const numbers = [12, 14, 8, 6];
let total = 0;

function totalNumbers(item) {
  total = total + item;
  console.log("item price", item, "running total", total);
}

numbers.forEach(totalNumbers);

console.log("final total", total);

if (!setToBlue) {
  document.body.style.backgroundColor = "red";
} else {
  document.body.style.backgroundColor = "blue";
}

// functions
function tellMeHowHungryIAM() {
  console.log(hiddenVariable);
}

cosole.log(hiddenVariable);

function addTwoNumbers() {
  let a = 10;
  let b = 5;
  let addTotal = a + b;
  return addTotal;
}

let numberTotal = addTwoNumbers(3, 4);
let diffTotal = addTwoNumbers(12, 50);
console.log(numberTotal, diffTotal);
