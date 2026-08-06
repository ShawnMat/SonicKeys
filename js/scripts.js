document.querySelectorAll(".whiteKeys, .blackKeys").forEach(key => {

    key.addEventListener("click", function () {

        this.classList.add("active");
        console.log(this);
        
        setTimeout(() => {
            this.classList.remove("active");
        }, 200);

    });

});

document.addEventListener("keydown", async () => {
    await Tone.start();
    console.log("Audio Ready");
}, { once: true });



const pressedKeys = {};
// const pianoSounds = {
//     C4: new Audio("assets/audio/C4.mp3"),
//     "C#4": new Audio("assets/audio/C#4.mp3"),

//     D4: new Audio("assets/audio/D4.mp3"),
//     "D#4": new Audio("assets/audio/D#4.mp3"),

//     E4: new Audio("assets/audio/E4.mp3"),

//     F4: new Audio("assets/audio/F4.mp3"),
//     "F#4": new Audio("assets/audio/F#4.mp3"),

//     G4: new Audio("assets/audio/G4.mp3"),
//     "G#4": new Audio("assets/audio/G#4.mp3"),

//     A4: new Audio("assets/audio/A4.mp3"),
//     "A#4": new Audio("assets/audio/A#4.mp3"),

//     B4: new Audio("assets/audio/B4.mp3"),

//     C5: new Audio("assets/audio/C5.mp3"),
//     "C#5": new Audio("assets/audio/C#5.mp3"),

//     D5: new Audio("assets/audio/D5.mp3"),
//     "D#5": new Audio("assets/audio/D#5.mp3"),

//     E5: new Audio("assets/audio/E5.mp3"),

//     F5: new Audio("assets/audio/F5.mp3"),
// };



// const notes = [
//     "C4", "C#4", "D4", "D#4", "E4",
//     "F4", "F#4", "G4", "G#4",
//     "A4", "A#4", "B4",
//     "C5", "C#5", "D5", "D#5",
//     "E5", "F5"
// ];

// const pianoSounds = {};

// window.addEventListener("load", () => {
//     setTimeout(() => {
//         notes.forEach(note => {
//             pianoSounds[note] = new Audio(`assets/audio/${note}.mp3`);
//             pianoSounds[note].preload = "auto";
//         });
//     }, 100);
// });


// const pianoKeys = document.querySelectorAll(".whiteKeys, .blackKeys");
// document.addEventListener("keydown", (event) => {
//     const key = event.key.toLowerCase();
//     if (pressedKeys[key]) return;
//     pressedKeys[key] = true;
//     const pianoKey = document.querySelector(`[data-key="${key}"]`);
//     if (!pianoKey) return;
//     pianoKey.classList.add("active");
//     const note = pianoKey.dataset.note;
//     playNote(note);
// });

// document.addEventListener("keyup", (event) => {
//     const key = event.key.toLowerCase();
//     pressedKeys[key] = false;
//     const pianoKey = document.querySelector(`[data-key="${key}"]`);
//     if (!pianoKey) return;
//     pianoKey.classList.remove("active");
// });

// pianoKeys.forEach((key) => {
//     key.addEventListener("mousedown", () => {
//         key.classList.add("active");
//         const note = key.dataset.note;
//         playNote(note);
//     });

//     key.addEventListener("mouseup", () => {
//         key.classList.remove("active");
//     });

//     key.addEventListener("mouseleave", () => {
//         key.classList.remove("active");
//     });
// });

// document.addEventListener("mouseup", () => {
//     pianoKeys.forEach((key) => {
//         key.classList.remove("active");
//     });
// });

// function playNote(note) {
//     console.log(note);
    
//     const audio = pianoSounds[note];
//     if (!audio) return;

//     // audio.pause()
//     audio.currentTime = 0; // Restart if pressed again
//     audio.play().catch(err => console.log(err));
// }


