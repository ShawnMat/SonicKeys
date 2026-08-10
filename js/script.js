const playPiano = document.getElementById("playPiano");
const playDrums = document.getElementById("playDrums");

playPiano.addEventListener("click", function () {
    window.location.href = "./pages/piano.html";
});

playDrums.addEventListener("click", function () {
    window.location.href = "./pages/drums.html";
});