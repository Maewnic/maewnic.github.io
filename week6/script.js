// we can use window to find certain properties
let windowWidth = window.innerWidth;
console.log(windowWidth);
// find out information about url location
console.log(window.location);
// document can be used to find html elements
console.log(document.title);
// set the title
// document.title = "New Title";
// can find the body
// document.body.style.backgroundColor = "red";
// navigator can find more details of hardware/software
// console.log(window.navigator.language);

const myImage = document.querySelector("#myImage");

console.log(myImage);

const helloParagraph = document.querySelector("#hello");

const myParagraphs = document.querySelectorAll("p");

myParagraphs.forEach(changeParaBG);

function changeParaBG(item) {
  console.log(item);
  item.style.backgroundColor = "red";
}

// first find cotent of hello p
console.log(helloParagraph.textContent);
helloParagraph.textContent = "whatever I want";

function updateCatName() {
  helloParagraph.textContent = `Hi! My name is ${myImage.dataset.catname}`;
  // classList.add() adds class
  // classList.remove() removes class
  // classList.toggle() toggles class
  myImage.classList.toggle("round");
}

myButton.addEventListener("click", function () {
  alert("button clicked");
});

//create element using document methods
const newPara = document.createElement("p");
newPara.textContent = "I'm a new paragraph!";
newPara.classList.add("coral-box");
outerSection.appendChild(newPara);
myButton.appendChild(newPara);

// look at the new paragraph
console.log(newPara);

// add new element to header
const myHeader = document.querySelector("header");
// find my cat name
let catName = myImage.dataset.catname;
myHeader.innerHTML += `<h2> I think ${catName} is pretty cool</h2>`;

// += works for maths too
let x = 0;
x = x + 2;
x += 4;

// add mouseenter eventlistener to img
myImage.addEventListener("mouseenter", addRoundClass);

function addRoundClass() {
  myImage.classList.add("round");
}
// add mouseleave eventlistener to img
myImage.addEventListener("mouseleave", removeRoundClass);

function removeRoundClass() {
  myImage.classList.remove("round");
}
