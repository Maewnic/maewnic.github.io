/* find the element we want to intteract*/
const popButton = document.querySelector("#popButton");
const popAudio = document.querySelector("#popAudio");

/* this is a function, that plays the popping sound when run*/
function playPop() {
  popAudio.play();
}

/* run playPop function when button is clicked*/
popButton.addEventListener("click", playPop);

/* maybe add data logging and focus mode? */
