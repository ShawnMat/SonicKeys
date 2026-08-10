// ============================================================
// SONIC KEYS - DRUM KIT
// ============================================================


// ============================================================
// AUDIO ENGINE
// ============================================================

// ------------------------------
// MASTER VOLUME
// ------------------------------

const drumVolume = new Tone.Volume(-8).toDestination();


// ============================================================
// KICK / BASS DRUM
// ============================================================

const kick = new Tone.MembraneSynth({

    pitchDecay: 0.05,
    octaves: 8,

    oscillator: {
        type: "sine"
    },

    envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0,
        release: 0.1
    }

}).connect(drumVolume);


// ============================================================
// SNARE DRUM
// ============================================================

const snare = new Tone.NoiseSynth({

    noise: {
        type: "white"
    },

    envelope: {
        attack: 0.001,
        decay: 0.15,
        sustain: 0,
        release: 0.05
    }

}).connect(drumVolume);


// ============================================================
// HIGH TOM
// ============================================================

const highTom = new Tone.MembraneSynth({

    pitchDecay: 0.03,
    octaves: 4,

    oscillator: {
        type: "sine"
    },

    envelope: {
        attack: 0.001,
        decay: 0.25,
        sustain: 0,
        release: 0.1
    }

}).connect(drumVolume);


// ============================================================
// MIDDLE TOM
// ============================================================

const middleTom = new Tone.MembraneSynth({

    pitchDecay: 0.04,
    octaves: 4,

    oscillator: {
        type: "sine"
    },

    envelope: {
        attack: 0.001,
        decay: 0.3,
        sustain: 0,
        release: 0.1
    }

}).connect(drumVolume);


// ============================================================
// FLOOR TOM
// ============================================================

const floorTom = new Tone.MembraneSynth({

    pitchDecay: 0.05,
    octaves: 4,

    oscillator: {
        type: "sine"
    },

    envelope: {
        attack: 0.001,
        decay: 0.4,
        sustain: 0,
        release: 0.1
    }

}).connect(drumVolume);


// ============================================================
// HI-HAT
// ============================================================

const hiHat = new Tone.MetalSynth({

    frequency: 400,

    envelope: {
        attack: 0.001,
        decay: 0.08,
        release: 0.01
    },

    harmonicity: 5.1,
    modulationIndex: 32,
    resonance: 4000,
    octaves: 1.5

}).connect(drumVolume);


// ============================================================
// CRASH CYMBAL
// ============================================================

const crash = new Tone.MetalSynth({

    frequency: 250,

    envelope: {
        attack: 0.001,
        decay: 1.2,
        release: 0.2
    },

    harmonicity: 5.1,
    modulationIndex: 64,
    resonance: 3000,
    octaves: 1.5

}).connect(drumVolume);


// ============================================================
// RIDE CYMBAL
// ============================================================

const ride = new Tone.MetalSynth({

    frequency: 300,

    envelope: {
        attack: 0.001,
        decay: 0.8,
        release: 0.3
    },

    harmonicity: 5.1,
    modulationIndex: 40,
    resonance: 3500,
    octaves: 1.5

}).connect(drumVolume);


// ============================================================
// AUDIO INITIALIZATION
// ============================================================

let audioStarted = false;

async function startAudio() {

    if (audioStarted) {
        return;
    }

    await Tone.start();

    audioStarted = true;

    console.log("Tone.js audio started");
}


// ============================================================
// PLAY FUNCTIONS
// ============================================================

function playKick() {

    kick.triggerAttackRelease(
        "C1",
        "8n"
    );
}


function playSnare() {

    snare.triggerAttackRelease(
        "16n"
    );
}


function playHighTom() {

    highTom.triggerAttackRelease(
        "G2",
        "8n"
    );
}


function playMiddleTom() {

    middleTom.triggerAttackRelease(
        "E2",
        "8n"
    );
}


function playFloorTom() {

    floorTom.triggerAttackRelease(
        "C2",
        "8n"
    );
}


function playHiHat() {

    hiHat.triggerAttackRelease(
        "32n"
    );
}


function playCrash() {

    crash.triggerAttackRelease(
        "C4",
        "8n"
    );
}


function playRide() {

    ride.triggerAttackRelease(
        "C4",
        "8n"
    );
}


// ============================================================
// DRUM ELEMENTS
// ============================================================

const drums = {

    kick: document.getElementById("baseDrum"),

    snare: document.getElementById("snareDrum"),

    highTom: document.getElementById("highTom"),

    middleTom: document.getElementById("middleTom"),

    floorTom: document.getElementById("floorTom"),

    hiHat: document.getElementById("hiHat"),

    crash1: document.getElementById("crash1"),

    crash2: document.getElementById("crash2"),

    ride: document.getElementById("rideCymbal")

};


// ============================================================
// DRUM ACTION FUNCTION
// ============================================================

async function hitDrum(drumName) {

    await startAudio();

    switch (drumName) {

        case "kick":
            playKick();
            break;

        case "snare":
            playSnare();
            break;

        case "highTom":
            playHighTom();
            break;

        case "middleTom":
            playMiddleTom();
            break;

        case "floorTom":
            playFloorTom();
            break;

        case "hiHat":
            playHiHat();
            break;

        case "crash1":
            playCrash();
            break;

        case "crash2":
            playCrash();
            break;

        case "ride":
            playRide();
            break;
    }

}


// ============================================================
// MOUSE CLICK
// ============================================================

Object.entries(drums).forEach(([drumName, element]) => {

    if (!element) {
        return;
    }

    element.addEventListener("click", () => {

        hitDrum(drumName);

    });

});


// ============================================================
// KEYBOARD CONTROLS
// ============================================================

const keyboardMap = {

    "a": "kick",
    "s": "snare",
    "d": "hiHat",
    "f": "highTom",
    "g": "middleTom",
    "h": "floorTom",
    "j": "crash1",
    "k": "ride"

};


document.addEventListener("keydown", async (event) => {

    // Don't trigger again when holding a key
    if (event.repeat) {
        return;
    }

    const key = event.key.toLowerCase();

    const drumName = keyboardMap[key];

    if (!drumName) {
        return;
    }

    await hitDrum(drumName);

});


// ============================================================
// TOUCH / POINTER CONTROLS
// ============================================================

// Keep track of the currently touched drum

let currentPointerDrum = null;


// ------------------------------
// POINTER DOWN
// ------------------------------

Object.entries(drums).forEach(([drumName, element]) => {

    if (!element) {
        return;
    }

    element.addEventListener("pointerdown", async (event) => {

        // Prevent browser gestures
        event.preventDefault();

        // Remember current drum
        currentPointerDrum = drumName;

        // Play drum
        await hitDrum(drumName);

    });

});


// ============================================================
// POINTER MOVE
// ============================================================

document.addEventListener("pointermove", async (event) => {

    // No pointer interaction happening
    if (currentPointerDrum === null) {
        return;
    }

    // Find the element underneath the pointer
    const element = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    if (!element) {
        return;
    }

    // Find which drum the pointer is currently over
    const drumEntry = Object.entries(drums).find(
        ([drumName, drumElement]) =>
            drumElement === element ||
            drumElement.contains(element)
    );

    if (!drumEntry) {
        return;
    }

    const [drumName] = drumEntry;

    // Don't repeatedly trigger the same drum
    if (drumName === currentPointerDrum) {
        return;
    }

    // New drum touched
    currentPointerDrum = drumName;

    await hitDrum(drumName);

});


// ============================================================
// POINTER UP
// ============================================================

document.addEventListener("pointerup", () => {

    currentPointerDrum = null;

});


// ============================================================
// POINTER CANCEL
// ============================================================

document.addEventListener("pointercancel", () => {

    currentPointerDrum = null;

});


// ============================================================
// PREVENT IMAGE DRAGGING
// ============================================================

Object.values(drums).forEach((element) => {

    if (!element) {
        return;
    }

    element.addEventListener("dragstart", (event) => {

        event.preventDefault();

    });

});


// ============================================================
// START AUDIO ON FIRST POINTER INTERACTION
// ============================================================

document.addEventListener(
    "pointerdown",
    startAudio,
    {
        once: true
    }
);


// ==============================
// ORIENTATION CHECK
// ==============================

const rotateOverlay = document.getElementById("rotateOverlay");

function checkOrientation() {

    if (window.innerHeight > window.innerWidth) {

        // Portrait
        rotateOverlay.style.display = "flex";

    } else {

        // Landscape
        rotateOverlay.style.display = "none";

    }
}


// Check when page loads
checkOrientation();


// Check whenever screen size/orientation changes
window.addEventListener("resize", checkOrientation);