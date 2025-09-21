// main.js — robust wiring (waits for DOM, exposes onYouTubeIframeAPIReady)
let player;
const VIDEO_ID = "8awfz5l8rLs";

let playPauseBtn,
  progressBar,
  volumeSlider,
  speedSelect,
  fullscreenBtn,
  pipBtn,
  titleEl;
let progressInterval;

// safely init after DOM ready
document.addEventListener("DOMContentLoaded", () => {
  playPauseBtn = document.getElementById("play-pause");
  progressBar = document.getElementById("progress");
  volumeSlider = document.getElementById("volume");
  speedSelect = document.getElementById("speed");
  fullscreenBtn = document.getElementById("fullscreen");
  pipBtn = document.getElementById("pip");
  titleEl = document.getElementById("video-title");

  // UI event handlers (guarded — player may not exist yet)
  playPauseBtn.addEventListener("click", () => {
    if (!player) return;
    const state = player.getPlayerState();
    if (state === YT.PlayerState.PLAYING) player.pauseVideo();
    else player.playVideo();
  });

  progressBar.addEventListener("input", () => {
    if (!player || !player.getDuration) return;
    const pct = Number(progressBar.value) / 100;
    player.seekTo(pct * player.getDuration(), true);
  });

  volumeSlider.addEventListener("input", () => {
    if (!player) return;
    player.setVolume(Number(volumeSlider.value));
  });

  speedSelect.addEventListener("change", () => {
    if (!player) return;
    player.setPlaybackRate(Number(speedSelect.value));
  });

  fullscreenBtn.addEventListener("click", () => {
    if (!player) return;
    const iframe = player.getIframe();
    if (iframe.requestFullscreen) iframe.requestFullscreen();
  });

  pipBtn.addEventListener("click", async () => {
    if (!player) return;
    const iframe = player.getIframe();
    try {
      if (document.pictureInPictureElement)
        await document.exitPictureInPicture();
      else if (iframe.requestPictureInPicture)
        await iframe.requestPictureInPicture();
    } catch (e) {
      console.warn("PiP not available:", e);
    }
  });
});

// This must be a global named function for the YouTube API to call:
window.onYouTubeIframeAPIReady = function () {
  player = new YT.Player("player", {
    videoId: VIDEO_ID,
    playerVars: { controls: 0, modestbranding: 1, rel: 0 },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });
};

function onPlayerReady() {
  // set default volume from slider
  if (volumeSlider && player) player.setVolume(Number(volumeSlider.value));

  // update title via noembed (lightweight)
  fetch(
    `https://noembed.com/embed?url=https://www.youtube.com/watch?v=${VIDEO_ID}`
  )
    .then((r) => r.json())
    .then((data) => {
      if (titleEl) titleEl.textContent = data.title || "YouTube video";
    })
    .catch(() => {
      if (titleEl) titleEl.textContent = "YouTube video";
    });

  // start progress updater
  clearInterval(progressInterval);
  progressInterval = setInterval(() => {
    if (!player || !player.getDuration) return;
    const total = player.getDuration();
    if (!total || total === 0) return;
    const current = player.getCurrentTime();
    const pct = (current / total) * 100;
    if (progressBar) progressBar.value = Math.min(100, Math.max(0, pct));
  }, 400);
}

function onPlayerStateChange(e) {
  if (!playPauseBtn) return;
  if (e.data === YT.PlayerState.PLAYING) playPauseBtn.textContent = "⏸";
  else playPauseBtn.textContent = "▶";
}
