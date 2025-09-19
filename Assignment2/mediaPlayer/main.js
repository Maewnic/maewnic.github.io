/* find the elements I want to interact with */
const videoElement = document.querySelector("#mediaplayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");
const currentTimeText = document.querySelector("#currentTimeFeedback");
const totalTimeText = document.querySelector("#totalTimeFeedback");

/* when JS loads remove default controls */
videoElement.removeAttribute("controls");

// I want to updater total time based on the curretly loaded media file
//This will run when page loads, but if I wanted to channge the file after wards , I'd have to
// update there too
videoElement.addEventListener("canplay", updateTimeline);

function updateTotalTime() {
  let videoSeconds = videoElement.duration;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSec = videoSeconds % 60;
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  console.log(videoElement.duration);
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

function togglePlayPause() {
  if (videoElement.paused || videoElement.ended) {
    videoElement.play();
    playPauseIcon.src = "assets/pauseIcon.png"; // Change to pause icon
    playPauseIcon.alt = "pause button";
  } else {
    videoElement.pause();
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
  let timePercet = (videoElement.currentTime / videoElement.duration) * 100;
  timeline.value = timePercet;
  updateCurrentTime();
}

function updateCurrentTime() {
  let videoSeconds = videoElement.currentTime;
  let totalMin = Math.floor(videoSeconds / 60);
  let totalSec = Math.floor(videoSeconds % 60);
  if (totalSec < 10) {
    totalSec = "0" + totalSec;
  }
  console.log(videoElement.duration);
  currentTimeText.textContent = `${totalMin}:${totalSec}`;
}

videoElement.addEventListener("timeupdate", updateTimeline);

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
  videoElement.currentTime = videoElement.duration * timePercent;
  console.log(timePercent);
}

/// add feature to play next song when current one ends
const Array = [
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Hes.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Dry-Down-feat-Ben-Snaath.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Leapt.mp3",
  "https://thelongesthumstore.sgp1.cdn.digitaloceanspaces.com/IM-2250/p-hase_Water-Feature.mp3",
];

function updateCurrentSong(songNumber) {
  // based on the input number, change out the src of our source
  mediaSource.src = songArray[songNumber];
  // then we want to load new file
  videoElement.load();
  // the begin playback
  videoElement.play();
}

videoElement.addEventListener("ended", playNextOnEnd);
function playNextOnEnd() {
  if (currentSongNumber < songArray.length - 1) {
    updateCurrentSong(currentSongNumber + 1);
    currentSongNumber += 1;
  } else {
    // loop back to start of array
    updateCurrentSong(0);
    currentSongNumber = 0;
  }
}
