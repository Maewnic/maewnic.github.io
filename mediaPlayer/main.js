/* find the elements I want to interact with */
const videoElement = document.querySelector("#mediaplayer");
const playPauseButton = document.querySelector("#playPauseButton");
const timeline = document.querySelector("#timelineProgress");

/* when JS loads remove default controls */
videoElement.removeAttribute("controls");

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
    playPauseButton.textContent = "❚❚"; // Change to pause icon
  } else {
    videoElement.pause();
    playPauseButton.textContent = "▶"; // Change to play icon
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
  let timePercentage = () =>
    (videoElement.currentTime / videoElement.duration) * 100;
  timeline.value = timePercentage();
}

videoElement.addEventListener("timeupdate", updateTimeline);
