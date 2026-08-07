let currentOctave = 4;
let currentPointerKey = null;
let isPointerDown = false;
let audioStarted = false;

const activeNotes = new Set();
const pressedKeys = {};


const keyboard = document.querySelector(".piano");
const beforeOctave = document.getElementById("beforeOctave");
const afterOctave = document.getElementById("afterOctave");
const currentOctaveText = document.getElementById("currentOctave");
const volumeSlider = document.getElementById("volumeSlider");
const currentNote = document.getElementById("currentNote");
const rotateOverlay = document.getElementById("rotateOverlay");
const pianoKeys = document.querySelectorAll(".whiteKeys, .blackKeys");


const noteNames = [
    "C","C#","D","D#","E","F",
    "F#","G","G#","A","A#","B",
    "C","C#","D","D#","E","F"
];


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

    if (key.classList.contains("active")) return;

    pressKey(key);
    playNote(key.dataset.note);

}

function deactivateKey(key) {

    if (!key.classList.contains("active")) return;

    releaseKey(key);
    stopNote(key.dataset.note);

}


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
    key.addEventListener("pointerdown", async (e) => {
        e.preventDefault();
        await startAudio();
        key.setPointerCapture(e.pointerId);
        isPointerDown = true;
        activateKey(key);
        currentPointerKey = key;

    });
});

document.addEventListener("pointerup", (e) => {
    isPointerDown = false;
    if (currentPointerKey) {
        currentPointerKey.releasePointerCapture(e.pointerId);
        deactivateKey(currentPointerKey);
        currentPointerKey = null;
    }

});


keyboard.addEventListener("pointermove", (e) => {
    if (!isPointerDown) return;
    const element = document.elementFromPoint(e.clientX, e.clientY);
    const key = element?.closest(".whiteKeys, .blackKeys");
    if (!key) {
        if (currentPointerKey) {
            deactivateKey(currentPointerKey);
            currentPointerKey = null;
        }
        return;
    }

    if (key === currentPointerKey) {
        return;
    }

    if (currentPointerKey) {
        deactivateKey(currentPointerKey);
    }
    activateKey(key);
    currentPointerKey = key;

});

document.addEventListener("keydown", async (event) => {
    await startAudio();
    const keyPressed = event.key.toLowerCase();
    if (pressedKeys[keyPressed]) return;
    pressedKeys[keyPressed] = true;
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    activateKey(pianoKey);
    

});

document.addEventListener("keyup", async (event) => {
    const keyPressed = event.key.toLowerCase();
    pressedKeys[keyPressed] = false;
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    deactivateKey(pianoKey);
});
