// SELECT HTML ELEMENTS

const pages = [...document.querySelectorAll(".page")];

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const beginBtn = document.getElementById("beginBtn");

const progressBar = document.getElementById("progressBar");
const pageCount = document.getElementById("pageCount");

const audio = document.getElementById("backgroundMusic");

const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const musicHint = document.getElementById("musicHint");


// YOUR THREE SONG FILES

const tracks = [

  "assets/phir-bhi-tumko-chahunga.mp4",
  "assets/kaun-hoyega.mp4",
  "assets/salamat.mp4"

];


// SONGS FOR EACH PAGE
// Page 1–2: Song 1
// Page 3–4: Song 2
// Page 5–7: Song 3
// Page 8–10: Song 1

const trackForPage = [
  0, 0,
  1, 1,
  2, 2, 2,
  0, 0, 0
];


// VARIABLES

let current = 0;

let musicStarted = false;
let musicEnabled = true;

let currentTrack = -1;


// CHANGE MUSIC ACCORDING TO PAGE

function setTrackForPage(index) {

  const wanted = trackForPage[index];

  if (!musicEnabled || !musicStarted || wanted === currentTrack) {
    return;
  }

  currentTrack = wanted;

  audio.src = tracks[wanted];

  audio.load();

  audio.play()
    .then(() => {

      musicLabel.textContent = "Music on";

      musicHint.textContent =
        "Now playing: " +
        [
          "Phir Bhi Tumko Chahunga",
          "Kaun Hoyega",
          "Salamat"
        ][wanted];

    })

    .catch(() => {

      musicLabel.textContent = "Tap for music";

      musicHint.textContent =
        "If music does not start, tap the music button once.";

    });

}


// SHOW PAGE FUNCTION

function showPage(index) {

  current = Math.max(0, Math.min(index, pages.length - 1));

  pages.forEach((page, i) => {

    page.classList.toggle("active", i === current);

  });


  // PREVIOUS BUTTON

  prevBtn.disabled = current === 0;


  // NEXT BUTTON

  nextBtn.disabled = current === pages.length - 1;


  // PROGRESS BAR

  progressBar.style.width =
    `${((current + 1) / pages.length) * 100}%`;


  // PAGE NUMBER

  pageCount.textContent =
    `${String(current + 1).padStart(2, "0")} / ${String(pages.length).padStart(2, "0")}`;


  // CHANGE SONG

  setTrackForPage(current);


  // SCROLL TO TOP

  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });

}


// START WEBSITE

function startExperience() {

  musicStarted = true;
  musicEnabled = true;

  setTrackForPage(current);

  musicLabel.textContent = "Music on";

  musicHint.textContent =
    "A little music, just for this journey.";

  showPage(1);

}


// BEGIN BUTTON

beginBtn.addEventListener("click", startExperience);


// NEXT BUTTON

nextBtn.addEventListener("click", () => {

  showPage(current + 1);

});


// PREVIOUS BUTTON

prevBtn.addEventListener("click", () => {

  showPage(current - 1);

});


// MUSIC ON / OFF BUTTON

musicToggle.addEventListener("click", () => {

  if (!musicStarted) {

    musicStarted = true;
    musicEnabled = true;

    setTrackForPage(current);

    return;

  }


  musicEnabled = !musicEnabled;


  if (musicEnabled) {

    setTrackForPage(current);

    if (audio.src) {
      audio.play().catch(() => {});
    }

    musicLabel.textContent = "Music on";

  } else {

    audio.pause();

    musicLabel.textContent = "Music off";

    musicHint.textContent = "Music is paused.";

  }

});


// KEYBOARD NAVIGATION

document.addEventListener("keydown", (event) => {

  if (event.key === "ArrowRight") {
    showPage(current + 1);
  }

  if (event.key === "ArrowLeft") {
    showPage(current - 1);
  }

});


// FIRST PAGE ON WEBSITE LOAD

showPage(0);
audio.addEventListener("error", () => {
  console.log("Music error:", audio.error);
  alert("Music file load nahi hui. File name aur folder location check karein.");
});

audio.addEventListener("canplay", () => {
  console.log("Music is ready to play!");
});