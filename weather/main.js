// find my elements
const appBody = document.querySelector("body");
const tempInput = document.querySelector("#tempInput");
const tempReturn = document.querySelector("#tempReturn");

function interpretTemp() {
  console.log(tempInput.value);
  let inputTemp = tempInput.value;
  if (inputTemp < 10) {
    tempReturnText.textContent = "it's freezing";
    appBody.style.backgroundColor = "sky blue";
  }
  // temp 0-10 : freezing
  // temp 10-18 : cold
  // temp 18-26 : mild
  // temp 26-30 : warm
  // temp 30+ : hot
}
// this is a function
// interpretTemp();
