const distanceDisplay = document.getElementById("distance");
const layerDisplay = document.getElementById("layer");

// Scroll to bottom on load (start in space)
// Source: https://stackoverflow.com/questions/7699941/html-page-load-at-the-bottom
window.scrollTo(0, document.body.scrollHeight);

// This is for calculating the distance based on scroll position
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const maxScroll = document.body.scrollHeight - window.innerHeight;

  const progress = 1 - scrollTop / maxScroll;

  /* When used linear scroll alone it is harder to reach higher values.
     I need to use exponential to reach the higher numbers when scrolling up further.
     However, This makes the middle range (mesosphere) compressed and gone by fast.
     Therefore, To maintain some control for the middle range.
     I need to make it start from linear and then switch to exponential once I want it to count higher. */
  let km;
  const cutoff = 80; // where exponential starts
  const maxKm = 10000; // top value
  const linearPortion = 0.5; // portion of scroll for linear part

  // Split scroll into two parts
  if (progress <= linearPortion) {
    // Linear part (0–80 km)
    const progressRatio = progress / linearPortion;
    km = Math.round(progressRatio * cutoff);
  } else {
    // Exponential part (80–10 000 km)
    const progressRatio = (progress - linearPortion) / (1 - linearPortion);
    const exp = 4;
    km = Math.round(cutoff + Math.pow(progressRatio, exp) * (maxKm - cutoff));
  }

  distanceDisplay.textContent = `${km.toLocaleString()} km`;

  /* This part determines which layer of the atmosphere the current distance is in */
  let layer = "";
  if (km < 11) layer = "Troposphere";
  else if (km < 50) layer = "Stratosphere";
  else if (km < 80) layer = "Mesosphere";
  else if (km < 700) layer = "Thermosphere";
  else if (km < 10000) layer = "Exosphere";
  else layer = "Vacuum of Space";

  layerDisplay.textContent = layer;
});
