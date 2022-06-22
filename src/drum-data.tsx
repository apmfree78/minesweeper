//key-value map to quickly look up sound by track and key
const soundLookup = [
  {
    Q: "sounds1",
    W: "sounds2",
    E: "sounds3",
    A: "sounds4",
    S: "sounds5",
    D: "sounds6",
    Z: "sounds7",
    X: "sounds8",
    C: "sounds9",
  },
  {
    Q: "sounds10",
    W: "sounds11",
    E: "sounds12",
    A: "sounds13",
    S: "sounds14",
    D: "sounds15",
    Z: "sounds16",
    X: "sounds17",
    C: "sounds18",
  },
];

// object with all sounds
const drumSounds = {
  sounds1: {
    name: "Heater 1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
    track: 1,
    key: "Q",
  },
  sounds2: {
    name: "Heater 2",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
    track: 1,
    key: "W",
  },
  sounds3: {
    name: "Heater 3",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
    track: 1,
    key: "E",
  },
  sounds4: {
    name: "Heater 4",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
    track: 1,
    key: "A",
  },
  sounds5: {
    name: "Heater 6",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
    track: 1,
    key: "S",
  },
  sounds6: {
    name: "Dsc Oh",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
    track: 1,
    key: "D",
  },
  sounds7: {
    name: "Kick and Hat",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
    track: 1,
    key: "Z",
  },
  sounds8: {
    name: "RP4 Kick 1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
    track: 1,
    key: "X",
  },
  sounds9: {
    name: "Cev H2",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
    track: 1,
    key: "C",
  },
  sounds10: {
    name: "Chord 1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
    track: 1,
    key: "Q",
  },
  sounds11: {
    name: "Chord 2",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
    track: 1,
    key: "W",
  },
  sounds12: {
    name: "Chord 3",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
    track: 1,
    key: "E",
  },
  sounds13: {
    name: "Give us a Light",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
    track: 1,
    key: "A",
  },
  sounds14: {
    name: "Dry Ohh",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
    track: 1,
    key: "S",
  },
  sounds15: {
    name: "Build H1",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
    track: 1,
    key: "D",
  },
  sounds16: {
    name: "Punchy Kick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
    track: 1,
    key: "Z",
  },
  sounds17: {
    name: "Side Stick",
    file: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
    track: 1,
    key: "X",
  },
  sounds18: {
    name: "Brk Snr",
    file: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
    track: 1,
    key: "C",
  },
};

export { drumSounds, soundLookup };
