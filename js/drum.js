const drumVolume = new Tone.Volume(-8).toDestination();

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

let audioStarted = false;

async function startAudio() {
    if (audioStarted) {
        return;
    }

    await Tone.start();

    audioStarted = true;

    console.log("Tone.js audio started");
}

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

function playKick() {
    kick.triggerAttackRelease("C1", "8n");
}

function playSnare() {
    snare.triggerAttackRelease("16n");
}

function playHighTom() {
    highTom.triggerAttackRelease("G2", "8n");
}

function playMiddleTom() {
    middleTom.triggerAttackRelease("E2", "8n");
}

function playFloorTom() {
    floorTom.triggerAttackRelease("C2", "8n");
}

function playHiHat() {
    hiHat.triggerAttackRelease("32n");
}

function playCrash() {
    crash.triggerAttackRelease("C4", "8n");
}

function playRide() {
    ride.triggerAttackRelease("C4", "8n");
}

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

Object.entries(drums).forEach(([drumName, element]) => {
    if (!element) {
        return;
    }

    element.addEventListener("click", () => {
        hitDrum(drumName);
    });
});

const keyboardMap = {
    "a": "kick",
    "s": "snare",
    "d": "hiHat",
    "f": "highTom",
    "g": "middleTom",
    "h": "floorTom",
    "j": "crash1",
    "k": "ride",
    "l": "crash2"
};

document.addEventListener("keydown", async (event) => {
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

let currentPointerDrum = null;

Object.entries(drums).forEach(([drumName, element]) => {
    if (!element) {
        return;
    }

    element.addEventListener("pointerdown", async (event) => {
        event.preventDefault();

        currentPointerDrum = drumName;

        await hitDrum(drumName);
    });
});

document.addEventListener("pointermove", async (event) => {
    if (currentPointerDrum === null) {
        return;
    }

    const element = document.elementFromPoint(
        event.clientX,
        event.clientY
    );

    if (!element) {
        return;
    }

    const drumEntry = Object.entries(drums).find(
        ([drumName, drumElement]) =>
            drumElement === element ||
            drumElement.contains(element)
    );

    if (!drumEntry) {
        return;
    }

    const [drumName] = drumEntry;

    if (drumName === currentPointerDrum) {
        return;
    }

    currentPointerDrum = drumName;

    await hitDrum(drumName);
});

document.addEventListener("pointerup", () => {
    currentPointerDrum = null;
});

document.addEventListener("pointercancel", () => {
    currentPointerDrum = null;
});

Object.values(drums).forEach((element) => {
    if (!element) {
        return;
    }

    element.addEventListener("dragstart", (event) => {
        event.preventDefault();
    });
});

// const rotateOverlay = document.getElementById("rotateOverlay");
// const playArea = document.querySelector(".playArea");

// function checkOrientation() {
//     const isMobile = window.innerWidth <= 768;
//     const isPortrait = window.innerHeight > window.innerWidth;

//     if (isMobile && isPortrait) {
//         rotateOverlay.style.display = "flex";
//         playArea.style.pointerEvents = "none";
//     } else {
//         rotateOverlay.style.display = "none";
//         playArea.style.pointerEvents = "auto";
//     }
// }

// checkOrientation();

// window.addEventListener("resize", checkOrientation);