
let currentOctave = 4;
const beforeOctave = document.getElementById("beforeOctave");
const afterOctave = document.getElementById("afterOctave");
const currentOctaveText = document.getElementById("currentOctave");
const volumeSlider = document.getElementById("volumeSlider");
const currentNote = document.getElementById("currentNote");

const activeNotes = new Set();
currentOctaveText.textContent = `C${currentOctave}`;

const noteNames = [
    "C", "C#", "D", "D#", "E", "F",
    "F#", "G", "G#", "A", "A#", "B",
    "C", "C#", "D", "D#", "E", "F"
];

function updateOctave(status) {
    if (status === "reduce" && currentOctave > 1) {
        currentOctave--;
    }
    else if (status === "increase" && currentOctave < 7) {
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
// const synth = new Tone.PolySynth(Tone.Synth).toDestination();
const synth = new Tone.PolySynth(Tone.Synth, {
    oscillator: {
        type: "sine"
    },
    envelope: {
        attack: 0.01,
        decay: 0.2,
        sustain: 0.3,
        release: 1.2
    }
}).toDestination();


let audioStarted = false;
synth.volume.value = -10;
volumeSlider.addEventListener("input", () => {
    synth.volume.value = Number(volumeSlider.value);
});
console.log(Tone.context.state);


// Unlock audio on first user interaction
async function startAudio() {
    try {
        if (!audioStarted) {
            await Tone.start();
            audioStarted = true;
            console.log("Tone.js Ready");
            console.log(Tone.context.state);
        }
    } catch (error) {
        console.error("Error starting Tone.js:", error);
    }
}

const pianoKeys = document.querySelectorAll(".whiteKeys, .blackKeys");
updateOctave("init");
pianoKeys.forEach(key => {
    const label = key.querySelector(".keyLabel");
    label.textContent = key.dataset.key.toUpperCase();
});
const pressedKeys = {};



function pressKey(key) {
    key.classList.add("active");
}

function releaseKey(key) {
    key.classList.remove("active");
}

function playNote(note) {
    try {
        console.log("Playing:", note);
        activeNotes.add(note);
        currentNote.textContent = [...activeNotes].join("  ");
        synth.triggerAttack(note);
    } catch (error) {
        console.error("Error playing note:", error);
    }
}

function stopNote(note) {
    try {
        console.log("Stopping:", note);
        activeNotes.delete(note);
        currentNote.textContent = activeNotes.size ? [...activeNotes].join("  ") : "--";
        synth.triggerRelease(note);
    } catch (error) {
        console.error("Error stopping note:", error);
    }
}

function checkOrientation() {
    const overlay = document.getElementById("rotateOverlay");

    const isSmallScreen = window.innerWidth < 600;
    const isPortrait = window.innerHeight > window.innerWidth;

    if (isSmallScreen && isPortrait) {
        overlay.style.display = "flex";
    } else {
        overlay.style.display = "none";
    }
}

window.addEventListener("load", checkOrientation);
window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);

pianoKeys.forEach((key) => {
    key.addEventListener("mousedown", async () => {
        await startAudio();
        // Ensure Tone context is running before playing
        if (Tone.context.state !== 'running') {
            await Tone.context.resume();
        }
        pressKey(key);
        playNote(key.dataset.note);
    });

    key.addEventListener("mouseup", () => {
        releaseKey(key);
        stopNote(key.dataset.note);
    });

    key.addEventListener("mouseleave", () => {
        releaseKey(key);
        stopNote(key.dataset.note);
    });
});


document.addEventListener("mouseup", () => {
    pianoKeys.forEach((key) => {
        releaseKey(key);
    });

});


document.addEventListener("keydown", async (event) => {
    await startAudio();
    const keyPressed = event.key.toLowerCase();
    // Prevent repeated firing while key is held
    if (pressedKeys[keyPressed]) return;
    pressedKeys[keyPressed] = true;
    await startAudio();
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    pressKey(pianoKey);
    playNote(pianoKey.dataset.note);
    

});

document.addEventListener("keyup", async (event) => {
    await startAudio();
    const keyPressed = event.key.toLowerCase();
    pressedKeys[keyPressed] = false;
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (!pianoKey) return;
    releaseKey(pianoKey);
    stopNote(pianoKey.dataset.note);
});




beforeOctave.addEventListener("click",()=>{
    updateOctave("reduce");
})
afterOctave.addEventListener("click",()=>{
    updateOctave("increase");
})