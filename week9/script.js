// find our elements
const transformOuter = document.querySelector(".outer");
const ball = document.querySelector(".ball");
const moveButton = document.querySelector("#move-button");
const scaleButton = document.querySelector("#scale-button");
const rotateButton = document.querySelector("#rotate-button");
const resetButton = document.querySelector("#reset-button");

// define our transform varibles
let ballTranslateX = 0;
let ballRotate = 0;
let ballScale = 1;

// this function will take the current valumes and apply to ball
function updateTransform() {
  ball.style.transform = `translateX(${ballTranslateX}px) rotate(${ballRotate}deg) scale(${ballScale})`;
}

// move our ball to the right
function moveBall() {
  // find size detail of parent element
  const parentSize = transformOuter.getBoundingClientRect();
  const goal = parentSize.width / 2 - 25;
  console.log(parentSize);
  ballTranslateX += 10;
  if (ballTranslateX > goal) {
    alert("you scored a goal");
  }
  updateTransform();
}

// attach to button
moveButton.addEventListener("click", moveBall);

// Rotate our ball clockwise
function rotateBall() {
  ballRotate += 15;
  updateTransform();
}
// attach to button
rotateButton.addEventListener("click", rotateBall);

// scale our ball down
function scaleBall() {
  ballScale -= 0.1;
  updateTransform();
}
scaleButton.addEventListener("click", scaleBall);

function resetBall() {
  ballTranslateX = 0;
  ballRotate = 0;
  ballScale = 1;
  updateTransform();
}
resetButton.addEventListener("click", resetBall);
