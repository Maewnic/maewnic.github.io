/* find the elements I want to interact with */
// I updated video to audio
const audioElement = document.querySelector("#mediaplayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");

/* when JS loads remove default controls */
audioElement.removeAttribute("controls");

// I want to updater total time based on the curretly loaded media file
//This will run when page loads, but if I wanted to channge the file after wards , I'd have to
// update there too
audioElement.addEventListener("canplay", updateTotalTime);

function updateTotalTime() {
  let audioSeconds = audioElement.duration;
  let totalMin = Math.floor(audioSeconds / 60);
  let totalSec = Math.floor(audioSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  console.log(audioElement.duration);
  totalTimeText.textContent = `${totalMin}:${totalSec}`;
}

/*
Play/pause button behavior:
if media is not playing - when I click it begins the playback of the media file
if media is playing - when I click it pauses the playback of the media file
Feedback:
toggle icon based on playing state
cursor change on hover
*/

/* I designed my own play and pause icon with a unique style using AdobeIllustrator.
It's an icon of a person with headphones on, listening to music while studying.
The headphone is off when it's on pause.
It universal play and pause icon is still there for the user to understand this is a button.
I want to make the media player more personal and relatable to the user.
*/
const playPauseIcon = document.querySelector("#playPauseIcon");
function togglePlayPause() {
  if (audioElement.paused || audioElement.ended) {
    audioElement.play();
    playPauseIcon.src = "assets/pauseIcon.png"; // Change to pause icon
    playPauseIcon.alt = "pause button";
  } else {
    audioElement.pause();
    playPauseIcon.src = "assets/playIcon.png"; // Change to play icon
  }
}

// Add keyboard event listener for spacebar
document.addEventListener("keydown", function (event) {
  // Check if spacebar is pressed and focus is not on an input/textarea
  if (
    event.code === "Space" &&
    document.activeElement.tagName !== "INPUT" &&
    document.activeElement.tagName !== "TEXTAREA"
  ) {
    event.preventDefault(); // Prevent scrolling
    togglePlayPause();
  }
});

playPauseButton.addEventListener("click", togglePlayPause);

/*
Timeline behavior:
it should update as the media playback occurs to show current time
I should be able to click and jump to particular time
*/

function updateTimeline() {
  /* find percentage of total time */
  let timePercent = (audioElement.currentTime / audioElement.duration) * 100;
  timeline.value = timePercent;
  updateCurrentTime();
}

function updateCurrentTime() {
  let audioSeconds = audioElement.currentTime;
  let totalMin = Math.floor(audioSeconds / 60);
  let totalSec = Math.floor(audioSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  console.log(audioElement.duration);
  currentTimeText.textContent = `${totalMin}:${totalSec}`;
}

audioElement.addEventListener("timeupdate", updateTimeline);

//find when I click my timeline and then jump to that time
timeline.addEventListener("click", jumpToTime);
function jumpToTime(ev) {
  // find how far from the left we clicked
  let clickX = ev.offsetX;
  // find  how wide my timeline is
  let timeLineWidth = timeline.offsetWidth;
  // find the ratio of click to width
  let timePercent = clickX / timeLineWidth;
  // update the current time
  audioElement.currentTime = audioElement.duration * timePercent;
  console.log(timePercent);
}

/* Added volume control
 I want to be able to mute and unmute the sound as well as control the volume level
 I also want the icon to change based on the volume level
 If the volume is 0, the icon should be a mute icon
 If the volume is greater than 0, the icon should be a volume icon
*/
const volumeSlider = document.getElementById("volumeSlider");
const muteButton = document.getElementById("muteButton");
const muteIcon = document.getElementById("muteIcon");

let previousVolume = 1;

volumeSlider.addEventListener("input", function () {
  audioElement.volume = this.value;
  muteIcon.src =
    this.value == 0 ? "./assets/muteIcon.png" : "./assets/volumeIcon.png";
});

muteButton.addEventListener("click", function () {
  if (audioElement.volume > 0) {
    previousVolume = audioElement.volume;
    audioElement.volume = 0;
    volumeSlider.value = 0;
    muteIcon.src = "./assets/muteIcon.png";
  } else {
    audioElement.volume = previousVolume;
    volumeSlider.value = previousVolume;
    muteIcon.src = "./assets/volumeIcon.png";
  }
});

// Controls for background slider
const overlay = document.querySelector(".overlay");
const bgSliderBrightness = document.getElementById("bgSliderBrightness");
const bgSliderBlur = document.getElementById("bgSliderBlur");

// this is set so that on load it's not on max brightness and no blur. In additon, I can always change the load value in HTML
let currentBrightness = 1 - bgSliderBrightness.value / 100;
let currentBlur = (bgSliderBlur.value / 50) * 10;

overlay.style.filter = `brightness(${currentBrightness}) blur(${currentBlur}px)`;

function updateOverlayFilter() {
  overlay.style.filter = `brightness(${currentBrightness}) blur(${currentBlur}px)`;
}

bgSliderBrightness.addEventListener("input", function () {
  currentBrightness = 1 - this.value / 100;
  updateOverlayFilter();
});

bgSliderBlur.addEventListener("input", function () {
  currentBlur = (this.value / 50) * 10;
  updateOverlayFilter();
});
