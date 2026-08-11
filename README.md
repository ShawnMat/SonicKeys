# 🎵 SonicKeys

**Play. Create. Experiment.**

SonicKeys is an interactive browser-based virtual musical instrument platform that allows users to play musical instruments directly from their computer or mobile device.

The project currently includes:

* 🎹 **Piano**
* 🥁 **Drum Kit**

SonicKeys is designed as an expandable platform where additional instruments such as Guitar, Violin, and Synthesizer can be added in the future.

---

# 🎯 Project Overview

SonicKeys combines interactive web development with real-time audio synthesis to create virtual musical instruments that can be played directly in a web browser.

The project focuses on:

* Interactive musical instruments
* Real-time sound generation
* Responsive design
* Keyboard interaction
* Mouse interaction
* Touch interaction
* Audio effects
* Mobile support
* Simple and intuitive controls

Users can play the instruments using their:

* 🖱️ Mouse
* ⌨️ Computer keyboard
* 👆 Touchscreen
* 👉 Pointer/touch dragging

The audio is generated using **Tone.js**, allowing SonicKeys to create sounds directly in the browser without depending entirely on pre-recorded audio files.

---

# 🎹 Piano

The SonicKeys Piano provides an interactive virtual piano keyboard that can be played using a computer keyboard, mouse, or touchscreen.

## Piano Features

* Interactive piano keys
* White and black keys
* Computer keyboard mapping
* Multiple octaves
* Octave switching
* Current octave display
* Current note display
* Volume control
* Touch support
* Pointer interaction
* Glissando-style playing
* Responsive layout
* Real-time audio synthesis

## Piano Range

The current piano implementation supports the configured range:

```text
C4 → F5
```

The piano can be expanded to support additional octaves in future versions.

## Playing the Piano

### Mouse

Click a piano key to play the corresponding note.

### Keyboard

The computer keyboard is mapped to the piano keys, allowing users to play notes without using the mouse.

### Touch

Tap the piano keys on a touchscreen device.

### Dragging

Press and drag across the piano keys to play consecutive notes.

This allows users to perform glissando-style movements across the keyboard.

### Octave Controls

The octave controls allow users to move between the available octaves.

The current octave is displayed in the piano interface.

---

# 🥁 Drum Kit

SonicKeys also includes an interactive 9-piece Drum Kit.

The Drum Kit uses a 3 × 3 grid layout where each card represents a playable drum instrument.

## Drum Instruments

| Instrument       | Keyboard Key |
| ---------------- | ------------ |
| Kick / Base Drum | `A`          |
| Snare Drum       | `S`          |
| Hi-Hat           | `D`          |
| High Tom         | `F`          |
| Middle Tom       | `G`          |
| Floor Tom        | `H`          |
| Crash Cymbal     | `J`          |
| Ride Cymbal      | `K`          |
| Crash Cymbal     | `L`          |

## Drum Layout

```text
┌─────────────┬─────────────┬─────────────┐
│    Crash    │   Hi-Hat    │    Crash    │
│      J      │      D      │      L      │
├─────────────┼─────────────┼─────────────┤
│    Snare    │    Kick     │  Floor Tom  │
│      S      │      A      │      H      │
├─────────────┼─────────────┼─────────────┤
│    Ride     │  High Tom   │  Middle Tom │
│      K      │      F      │      G      │
└─────────────┴─────────────┴─────────────┘
```

## Drum Features

* Interactive drum cards
* Keyboard controls
* Mouse controls
* Touch controls
* Pointer dragging
* Visual feedback
* Volume control
* Reverb control
* Responsive layout
* Real-time drum synthesis

---

# 🖱️ Mouse Controls

Users can click directly on any instrument.

For example:

```text
Click Drum
    ↓
Drum sound plays
    ↓
Card becomes active
    ↓
Visual feedback
    ↓
Active state is removed
```

When a drum is played, its card receives an `.active` CSS class for approximately 100 milliseconds.

This creates a visual response that makes the interface feel more interactive.

---

# ⌨️ Keyboard Controls

The Drum Kit can be played using:

```text
A S D F G H J K L
```

Mapping:

```text
A → Kick
S → Snare
D → Hi-Hat
F → High Tom
G → Middle Tom
H → Floor Tom
J → Crash
K → Ride
L → Crash
```

Repeated keyboard events are ignored to prevent unwanted repeated sounds when a key is held down.

The Piano also uses computer keyboard mappings to allow users to play notes without clicking each key individually.

---

# 📱 Touch Controls

SonicKeys supports touchscreen interaction.

Users can tap individual instruments directly on mobile devices.

The application uses Pointer Events so that the same interaction system can work with:

* Mouse
* Touch
* Stylus

---

# 👆 Dragging Across Instruments

The Drum Kit supports dragging across different drums.

For example:

```text
Kick
  ↓
Snare
  ↓
Hi-Hat
  ↓
High Tom
  ↓
Crash
```

As the pointer moves from one drum to another, each new drum is triggered.

The Piano uses a similar pointer-based approach to allow users to move across multiple piano keys.

---

# 🔊 Volume Control

SonicKeys provides volume control for the instruments.

The Drum Kit currently uses a volume slider ranging from:

```text
-40 dB → 0 dB
```

The default volume is:

```text
-8 dB
```

The volume is handled using the Tone.js `Tone.Volume` node.

The audio flow is:

```text
Instrument
    ↓
Tone.Volume
    ↓
Effects
    ↓
Destination
    ↓
Speakers
```

---

# 🌊 Reverb

The Drum Kit includes an adjustable reverb effect.

The reverb slider controls the amount of reverberated sound.

The current range is:

```text
0 → 1
```

The default value is:

```text
0.2
```

The reverb is generated using Tone.js.

The current configuration uses a decay value of approximately:

```text
1.5 seconds
```

Increasing the reverb amount produces a more spacious sound.

---

# 🎛️ Audio System

SonicKeys uses **Tone.js** for browser-based audio synthesis and processing.

Different Tone.js synthesizers are used for different instruments.

## Piano

The Piano uses Tone.js synthesizers to generate musical notes.

This allows notes to be created dynamically rather than requiring a separate audio file for every interaction.

## Drums

Different synthesizers are used for different drum types.

### Kick and Toms

`Tone.MembraneSynth`

Used for:

* Kick
* High Tom
* Middle Tom
* Floor Tom

### Snare

`Tone.NoiseSynth`

Used to generate the snare sound.

### Cymbals

`Tone.MetalSynth`

Used for:

* Hi-Hat
* Crash Cymbal
* Ride Cymbal

---

# 🔐 Browser Audio Restrictions

Modern browsers prevent websites from automatically starting audio before the user interacts with the page.

SonicKeys handles this by starting the Tone.js audio context after the user's first interaction.

The application uses:

```javascript
await Tone.start();
```

before playing audio.

This allows SonicKeys to work correctly with modern browser autoplay policies.

---

# 🎨 User Interface

SonicKeys uses a dark and modern visual style designed around musical instruments.

The Drum Kit includes:

* Instrument cards
* Transparent surfaces
* Backdrop blur
* Rounded corners
* Responsive sizing
* Visual feedback
* Background artwork

The Piano uses a virtual keyboard interface with white and black piano keys.

---

# 📱 Responsive Design

SonicKeys is designed to work across different screen sizes.

The Piano and Drum Kit adjust their layouts according to the available screen size.

The Drum Kit uses a three-column CSS Grid:

```css
grid-template-columns: repeat(3, auto);
```

This maintains the 3 × 3 drum layout while allowing the cards to resize on smaller screens.

Different responsive breakpoints are used for:

### Desktop

```text
> 768px
```

### Tablet

```text
≤ 768px
```

### Small Screens

```text
≤ 480px
```

---

# 🛠️ Technologies Used

## Core Technologies

* HTML5
* CSS3
* JavaScript

## Libraries

* Bootstrap 5
* Bootstrap Icons
* jQuery
* Tone.js

### Bootstrap

Used for:

* Responsive layouts
* Containers
* Flexbox utilities
* General UI structure

### Bootstrap Icons

Used for interface icons such as volume and other controls.

### jQuery

Included for DOM manipulation and future functionality.

### Tone.js

Used for:

* Piano sound generation
* Drum sound generation
* Volume control
* Reverb
* Audio routing
* Future audio effects

---

# 📁 Project Structure

```text
SonicKeys/
│
├── assets/
│   └── images/
│       │
│       ├── background/
│       │   ├── drumBG.png
│       │   ├── drumCard.png
│       │   ├── guitar.png
│       │   ├── musicalStudio.png
│       │   ├── pianoCard.png
│       │   ├── synthesizer.png
│       │   └── Violin.png
│       │
│       ├── drums/
│       │   ├── basedrum.png
│       │   ├── crashcymbal.png
│       │   ├── floortom.png
│       │   ├── hightom.png
│       │   ├── hihat.png
│       │   ├── middletom.png
│       │   ├── ridecymbal.png
│       │   └── snaredrum.png
│       │
│       ├── icons/
│       │   ├── drum.png
│       │   ├── guitar (1).png
│       │   ├── pianoIcon.png
│       │   ├── synthesizer (1).png
│       │   └── violin (1).png
│       │
│       └── logos/
│           └── SonicKeys Logo.png
│
├── css/
│   ├── drums.css
│   ├── piano.css
│   └── style.css
│
├── js/
│   ├── drum.js
│   ├── piano.js
│   ├── script.js
│   └── tone.js
│
├── pages/
│   ├── drums.html
│   └── piano.html
│
└── index.html
```

---

# 📂 Directory Description

## `assets/`

Contains the visual assets used throughout SonicKeys.

### `assets/images/background/`

Contains background images and instrument artwork.

* `drumBG.png` — Drum Kit background
* `drumCard.png` — Drum instrument card artwork
* `guitar.png` — Guitar artwork
* `musicalStudio.png` — Musical studio artwork
* `pianoCard.png` — Piano card artwork
* `synthesizer.png` — Synthesizer artwork
* `Violin.png` — Violin artwork

### `assets/images/drums/`

Contains individual Drum Kit images.

* `basedrum.png`
* `crashcymbal.png`
* `floortom.png`
* `hightom.png`
* `hihat.png`
* `middletom.png`
* `ridecymbal.png`
* `snaredrum.png`

### `assets/images/icons/`

Contains instrument icons.

* `drum.png`
* `guitar (1).png`
* `pianoIcon.png`
* `synthesizer (1).png`
* `violin (1).png`

### `assets/images/logos/`

Contains SonicKeys branding assets.

* `SonicKeys Logo.png`

---

# 📄 CSS Files

## `style.css`

Contains the main website styling and shared styles.

## `piano.css`

Contains styles specific to the Piano interface.

## `drums.css`

Contains styles specific to the Drum Kit interface.

---

# 📜 JavaScript Files

## `script.js`

Contains the main website functionality and interactions.

## `piano.js`

Handles Piano functionality including:

* Piano key interaction
* Note triggering
* Keyboard mapping
* Octave controls
* Pointer interaction
* Touch interaction
* Audio handling

## `drum.js`

Handles Drum Kit functionality including:

* Drum sound generation
* Drum interaction
* Keyboard mapping
* Pointer interaction
* Touch interaction
* Dragging
* Volume
* Reverb
* Visual feedback

## `tone.js`

Contains the local Tone.js library used for audio synthesis and processing.

---

# 📄 HTML Pages

## `index.html`

The main SonicKeys landing page.

It provides navigation to the available instruments and introduces the SonicKeys platform.

## `pages/piano.html`

Contains the interactive Piano interface.

## `pages/drums.html`

Contains the interactive Drum Kit interface.

---

# 🔗 Application Flow

The basic application structure is:

```text
                         SonicKeys
                             │
                             ▼
                        index.html
                             │
                ┌────────────┴────────────┐
                │                         │
                ▼                         ▼
             Piano                     Drums
                │                         │
                ▼                         ▼
          piano.html                 drums.html
                │                         │
                ▼                         ▼
            piano.js                  drum.js
                │                         │
                └──────────┬──────────────┘
                           ▼
                        tone.js
                           │
                           ▼
                     Web Audio API
                           │
                           ▼
                         Sound
```

This separation keeps the HTML, CSS, JavaScript, and assets organized and makes it easier to add new instruments.

---

# 🚀 How to Run the Project

## 1. Clone the Repository

Clone the SonicKeys repository:

```bash
git clone <repository-url>
```

Navigate into the project:

```bash
cd SonicKeys
```

---

## 2. Open in Visual Studio Code

Open the project folder in Visual Studio Code.

```text
File
 ↓
Open Folder
 ↓
SonicKeys
```

---

## 3. Run with Live Server

Install the **Live Server** extension in Visual Studio Code.

Then:

1. Open `index.html`.
2. Right-click inside the HTML file.
3. Select **Open with Live Server**.
4. The SonicKeys website will open in your browser.

---

# 🎮 How to Use SonicKeys

## 🎹 Piano

1. Open the Piano section.
2. Click or touch a piano key.
3. Use the computer keyboard to play notes.
4. Drag across keys to play multiple notes.
5. Use the octave controls to change octaves.
6. Adjust the volume if required.

---

## 🥁 Drum Kit

1. Open the Drum Kit section.
2. Click any drum card.
3. Use `A S D F G H J K L` to play the drums.
4. On mobile, tap the drum cards.
5. Drag across different drums to play them.
6. Adjust the volume.
7. Adjust the reverb amount.

---

# ⚠️ Troubleshooting

## No Sound

If there is no sound:

1. Click or interact with an instrument first.
2. Check your device volume.
3. Check the browser tab volume.
4. Refresh the page.
5. Interact with the instrument again.
6. Check the browser console for JavaScript errors.

The browser may block audio until the user interacts with the page.

---

## Keyboard Controls Not Working

Make sure:

* The browser window is active.
* You are not typing inside an input field.
* The correct keyboard keys are being used.

For drums:

```text
A S D F G H J K L
```

---

## Audio Delay

Possible causes include:

* Browser performance
* Audio context initialization
* Multiple sounds playing simultaneously
* Device performance
* Large number of audio nodes

SonicKeys uses real-time synthesis to reduce the need for loading large audio samples.

---

# 🔮 Future Enhancements

SonicKeys is designed to become a larger browser-based music platform.

Potential future features include:

## 🎸 Guitar

An interactive virtual guitar.

## 🎻 Violin

A virtual violin interface.

## 🎹 Synthesizer

A customizable synthesizer with different oscillator types and effects.

## 🎼 Metronome

A BPM-controlled metronome for practicing rhythm.

Example:

```text
BPM: 120

● ─ ● ─ ● ─ ● ─
```

## 🥁 Beat Sequencer

Allow users to create and loop custom drum patterns.

Example:

```text
Kick   ● ─ ● ─ ● ─ ● ─
Snare  ─ ─ ● ─ ─ ─ ● ─
HiHat  ● ● ● ● ● ● ● ●
```

## 🎙️ Recording

Allow users to record their performances and play them back.

```text
● Record
    ↓
Play Instrument
    ↓
■ Stop
    ↓
▶ Playback
```

## 🎵 Multi-Instrument Recording

Allow users to combine different instruments into a single performance.

For example:

```text
Piano + Drums
      ↓
   Recording
      ↓
    Playback
```

## 🎚️ Individual Instrument Volume

Allow users to control the volume of individual instruments.

For example:

* Kick volume
* Snare volume
* Hi-Hat volume
* Tom volume
* Cymbal volume
* Piano volume

## 🎛️ More Audio Effects

Possible future effects include:

* Delay
* Distortion
* Chorus
* Phaser
* Compressor
* Equalizer

## 🎹 MIDI Support

Future versions could support:

* MIDI keyboards
* MIDI controllers
* External musical devices

---

# 🧠 Project Goals

The main goals of SonicKeys are:

1. Create an interactive musical experience.
2. Generate sounds directly in the browser.
3. Support desktop and mobile devices.
4. Provide responsive and intuitive controls.
5. Explore Web Audio API concepts.
6. Experiment with real-time audio synthesis.
7. Build a modular virtual instrument platform.
8. Provide a foundation for future music creation tools.

---

# 🌐 Browser Compatibility

SonicKeys requires a modern browser with Web Audio API support.

Recommended browsers include:

* Google Chrome
* Microsoft Edge
* Mozilla Firefox
* Safari

For the best experience, use an up-to-date browser.

---

# 📌 Current Development Status

| Feature                 | Status      |
| ----------------------- | ----------- |
| Landing Page            | ✅ Completed |
| Piano                   | ✅ Available |
| Piano Keyboard Controls | ✅ Available |
| Piano Touch Interaction | ✅ Available |
| Piano Octave Controls   | ✅ Available |
| Drum Kit                | ✅ Available |
| Drum Keyboard Controls  | ✅ Available |
| Drum Touch Interaction  | ✅ Available |
| Drum Drag Interaction   | ✅ Available |
| Volume Control          | ✅ Available |
| Reverb                  | ✅ Available |
| Visual Drum Feedback    | ✅ Available |
| Guitar                  | 🔮 Planned  |
| Violin                  | 🔮 Planned  |
| Synthesizer             | 🔮 Planned  |
| Metronome               | 🔮 Planned  |
| Beat Sequencer          | 🔮 Planned  |
| Recording               | 🔮 Planned  |
| MIDI Support            | 🔮 Planned  |

---

# 📜 License

This project is intended for educational and personal development purposes.

If external assets, libraries, images, sounds, fonts, or other resources are used, their respective licenses and attribution requirements should be followed.

---

# 🎵 SonicKeys

**Play. Create. Experiment.**

A browser-based virtual musical instrument platform built with modern web technologies and real-time audio synthesis.
