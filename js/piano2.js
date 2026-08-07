// --------------------
// GLOBAL VARIABLES
// --------------------

let currentOctave = 4;
let audioStarted = false;

const activeNotes = new Set();
const pressedKeys = {};

// DOM Elements
const beforeOctave = document.getElementById("beforeOctave");
const afterOctave = document.getElementById("afterOctave");
const currentOctaveText = document.getElementById("currentOctave");
const volumeSlider = document.getElementById("volumeSlider");
const currentNote = document.getElementById("currentNote");
const rotateOverlay = document.getElementById("rotateOverlay");

const pianoKeys = document.querySelectorAll(".whiteKeys, .blackKeys");


// --------------------
// CONSTANTS
// --------------------

const noteNames = [
    "C","C#","D","D#","E","F",
    "F#","G","G#","A","A#","B",
    "C","C#","D","D#","E","F"
];

// --------------------
// TONE.JS
// --------------------

const synth = new Tone.PolySynth(Tone.Synth,{
    oscillator:{
        type:"sine"
    },
    envelope:{
        attack:0.01,
        decay:0.2,
        sustain:0.3,
        release:1.2
    }
}).toDestination();

synth.volume.value = -10;

async function startAudio() {
    try {
        if (!audioStarted) {
            await Tone.start();
            audioStarted = true;
            console.log("Tone.js Ready");
        }

        if (Tone.context.state !== "running") {
            await Tone.context.resume();
        }
    } catch (error) {
        console.error("Error starting Tone.js:", error);
    }
}

function checkOrientation() {
    const isSmallScreen = window.innerWidth < 600;
    const isPortrait = window.innerHeight > window.innerWidth;

    rotateOverlay.style.display =
        isSmallScreen && isPortrait ? "flex" : "none";
}


function updateOctave(status) {

    if (status === "reduce" && currentOctave > 1) {
        currentOctave--;
    }

    if (status === "increase" && currentOctave < 7) {
        currentOctave++;
    }

    currentOctaveText.textContent = `C${currentOctave}`;

    let octave = currentOctave;

    pianoKeys.forEach((key, index) => {

        if (index === 12) {
            octave++;
        }

        key.dataset.note = `${noteNames[index]}${octave}`;
    });
}

function pressKey(key) {
    key.classList.add("active");
}

function releaseKey(key) {
    key.classList.remove("active");
}

function playNote(note) {

    activeNotes.add(note);

    currentNote.textContent =
        [...activeNotes].join("  ");

    synth.triggerAttack(note);
}

function stopNote(note) {

    activeNotes.delete(note);

    currentNote.textContent =
        activeNotes.size
            ? [...activeNotes].join("  ")
            : "--";

    synth.triggerRelease(note);
}

function activateKey(key) {
    pressKey(key);
    playNote(key.dataset.note);
}

function deactivateKey(key) {
    releaseKey(key);
    stopNote(key.dataset.note);
}
// --------------------
// INITIALIZE
// --------------------

updateOctave("init");

currentOctaveText.textContent = `C${currentOctave}`;

pianoKeys.forEach(key=>{
    key.querySelector(".keyLabel").textContent =
        key.dataset.key.toUpperCase();
});

checkOrientation();

window.addEventListener("load",checkOrientation);
window.addEventListener("resize",checkOrientation);
window.addEventListener("orientationchange",checkOrientation);

volumeSlider.addEventListener("input",()=>{
    synth.volume.value = Number(volumeSlider.value);
});

beforeOctave.addEventListener("click",()=>{
    updateOctave("reduce");
});

afterOctave.addEventListener("click",()=>{
    updateOctave("increase");
});


pianoKeys.forEach((key) => {
    // key.addEventListener("mousedown", async () => {
    //     await startAudio();
    //     // Ensure Tone context is running before playing
    //     if (Tone.context.state !== 'running') {
    //         await Tone.context.resume();
    //     }
    //     pressKey(key);
    //     playNote(key.dataset.note);
    // });

    // key.addEventListener("mouseup", () => {
    //     releaseKey(key);
    //     stopNote(key.dataset.note);
    // });

    // key.addEventListener("mouseleave", () => {
    //     releaseKey(key);
    //     stopNote(key.dataset.note);
    // });



    key.addEventListener("pointerdown", async (e) => {

        e.preventDefault();

        await startAudio();

        activateKey(key);

    });

    key.addEventListener("pointerup", () => {

        deactivateKey(key);

    });

    key.addEventListener("pointerleave", () => {

        deactivateKey(key);

    });

});

// document.addEventListener("mouseup", () => {
//     pianoKeys.forEach((key) => {
//         releaseKey(key);
//     });

// });


document.addEventListener("keydown", async (event) => {
    await startAudio();
    const keyPressed = event.key.toLowerCase();
    // Prevent repeated firing while key is held
    if (pressedKeys[keyPressed]) return;
    pressedKeys[keyPressed] = true;
    // await startAudio();
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    activateKey(pianoKey);
    

});

document.addEventListener("keyup", async (event) => {
    await startAudio();
    const keyPressed = event.key.toLowerCase();
    pressedKeys[keyPressed] = false;
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    deactivateKey(pianoKey);
});
