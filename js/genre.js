/**
 * genre.js - Peta Nada + Pola + BPM + Mood Semua Genre Musik Dunia
 * Rentang: C4 sampai C14 | Strict Mode | 100% Kompatibel
 */
"use strict";

// ==============================================
// 🎵 PETA NADA MIDI: C4 s/d C14
// ==============================================
window.noteMap = {
  "C4":60,"C#4":61,"D4":62,"D#4":63,"E4":64,"F4":65,"F#4":66,"G4":67,"G#4":68,"A4":69,"A#4":70,"B4":71,
  "C5":72,"C#5":73,"D5":74,"D#5":75,"E5":76,"F5":77,"F#5":78,"G5":79,"G#5":80,"A5":81,"A#5":82,"B5":83,
  "C6":84,"C#6":85,"D6":86,"D#6":87,"E6":88,"F6":89,"F#6":90,"G6":91,"G#6":92,"A6":93,"A#6":94,"B6":95,
  "C7":96,"C#7":97,"D7":98,"D#7":99,"E7":100,"F7":101,"F#7":102,"G7":103,"G#7":104,"A7":105,"A#7":106,"B7":107,
  "C8":108,"C#8":109,"D8":110,"D#8":111,"E8":112,"F8":113,"F#8":114,"G8":115,"G#8":116,"A8":117,"A#8":118,"B8":119,
  "C9":120,"C#9":121,"D9":122,"D#9":123,"E9":124,"F9":125,"F#9":126,"G9":127,"G#9":128,"A9":129,"A#9":130,"B9":131,
  "C10":132,"C#10":133,"D10":134,"D#10":135,"E10":136,"F10":137,"F#10":138,"G10":139,"G#10":140,"A10":141,"A#10":142,"B10":143,
  "C11":144,"C#11":145,"D11":146,"D#11":147,"E11":148,"F11":149,"F#11":150,"G11":151,"G#11":152,"A11":153,"A#11":154,"B11":155,
  "C12":156,"C#12":157,"D12":158,"D#12":159,"E12":160,"F12":161,"F#12":162,"G12":163,"G#12":164,"A12":165,"A#12":166,"B12":167,
  "C13":168,"C#13":169,"D13":170,"D#13":171,"E13":172,"F13":173,"F#13":174,"G13":175,"G#13":176,"A13":177,"A#13":178,"B13":179,
  "C14":180
};

// ==============================================
// 🎼 POLA + BPM + MOOD TIAP GENRE
// ==============================================
window.genreData = {
  // Pop & Balada
  "pop":               { notes: ["C4","D4","E4","G4","A4","G4","E4","D4"], bpm: 100, mood: "ceria, mudah diingat, santai" },
  "pop-ballad":        { notes: ["C4","E4","G4","A4","B4","A4","G4","E4"], bpm: 75, mood: "menyentuh hati, romantis, emosional" },
  "power-ballad":      { notes: ["C4","F4","G4","C5","D5","B4","G4","F4"], bpm: 85, mood: "penuh semangat, megah, penuh harapan" },
  "soft-pop":          { notes: ["C4","E4","F4","G4","A4","G4","F4","E4"], bpm: 90, mood: "lembut, damai, menenangkan" },

  // EDM & Elektronik
  "edm":               { notes: ["C4","G4","A4","B4","C5","B4","A4","G4"], bpm: 128, mood: "bersemangat, energik, pesta" },
  "slow-edm":          { notes: ["C4","E4","G4","A4","G4","E4","C5","E5"], bpm: 95, mood: "rileks, melankolis, mengalir tenang" },
  "pop-edm":           { notes: ["C4","D4","E4","G4","A4","G4","E4","D4"], bpm: 122, mood: "asik, ceria, modern dan segar" },
  "progressive-house": { notes: ["C4","D4","F4","G4","A4","G4","F4","D4"], bpm: 126, mood: "mengalir, dinamis, membangun suasana" },
  "deep-house":        { notes: ["C4","D#4","F4","G#4","A#4","G#4","F4","D#4"], bpm: 120, mood: "rileks, santai, dalam dan hangat" },
  "techno":            { notes: ["C4","G4","C5","G4","D4","A4","D5","A4"], bpm: 130, mood: "tegas, berirama, futuristik" },
  "trance":            { notes: ["C4","E4","G4","A4","B4","C5","D5","E5"], bpm: 138, mood: "melayang, magis, penuh energi positif" },
  "dubstep":           { notes: ["C4","G4","C5","A#4","A4","G4","F4","D#4"], bpm: 140, mood: "kuat, berat, tegas dan berkarakter" },
  "trap":              { notes: ["C4","D#4","F4","G#4","A#4","G#4","F4","D#4"], bpm: 145, mood: "keren, santai tapi berwibawa, modern" },
  "drum-and-bass":     { notes: ["C4","E4","G4","A4","C5","D5","E5","G5"], bpm: 174, mood: "cepat, dinamis, penuh semangat tinggi" },

  // Dangdut & Koplo Indonesia
  "dangdut":           { notes: ["C4","E4","F4","G4","A4","G4","F4","E4"], bpm: 115, mood: "gembira, hangat, akrab dan merakyat" },
  "koplo":             { notes: ["C4","E4","F4","G4","A4","G4","F4","E4"], bpm: 125, mood: "riang, semangat, menggoyang dan hidup" },
  "dangdut-koplo":     { notes: ["C4","E4","F4","G4","A4","G4","F4","E4"], bpm: 132, mood: "meriah, cepat, penuh keceriaan" },
  "orkes-melayu":      { notes: ["C4","D4","E4","F#4","G4","A4","B4","C5"], bpm: 105, mood: "romantis, anggun, bernuansa tradisional" },

  // Rock & Metal
  "rock":              { notes: ["E4","G4","A4","C5","A4","G4","E4","D4"], bpm: 110, mood: "berani, bebas, penuh semangat juang" },
  "rock-edm":          { notes: ["E4","G4","A4","C5","A4","G4","E4","E5"], bpm: 125, mood: "energik, padat, perpaduan kuat dan modern" },
  "hard-rock":         { notes: ["C4","D#4","F4","G#4","A#4","G#4","F4","D#4"], bpm: 120, mood: "kuat, tegas, penuh kekuatan" },
  "punk":              { notes: ["C4","F4","G4","A4","G4","F4","C4","D4"], bpm: 160, mood: "cepat, semangat, bebas dan berani" },
  "heavy-metal":       { notes: ["E4","G#4","B4","E5","D#5","B4","G#4","E4"], bpm: 140, mood: "berat, intens, penuh kekuatan dan emosi" },
  "blues-rock":        { notes: ["C4","D#4","F4","G4","A#4","G4","F4","D#4"], bpm: 95, mood: "hangat, mendalam, santai tapi berkarakter" },

  // Jazz, Blues & Swing
  "jazz":              { notes: ["C4","D#4","F4","F#4","G4","A#4","B4","C5"], bpm: 110, mood: "elegan, luwes, santai dan cerdas" },
  "smooth-jazz":       { notes: ["C4","E4","F#4","A4","B4","A4","G4","F#4"], bpm: 85, mood: "halus, lembut, menenangkan dan mewah" },
  "blues":             { notes: ["C4","D#4","F4","G4","G4","A#4","G4","F4"], bpm: 90, mood: "jujur, mendalam, penuh perasaan dan cerita" },
  "swing":             { notes: ["C4","E4","G4","A4","B4","C5","B4","A4"], bpm: 120, mood: "riang, asik, membuat ingin bergoyang" },
  "bebop":             { notes: ["C4","D4","E4","F#4","G4","A4","B4","C5"], bpm: 170, mood: "cepat, lincah, cerdas dan dinamis" },

  // Folk, Akustik & Tradisional
  "folk":              { notes: ["C4","D4","E4","G4","A4","G4","E4","D4"], bpm: 90, mood: "sederhana, alami, hangat dan bernuansa cerita" },
  "acoustic":          { notes: ["C4","E4","G4","C5","G4","E4","A4","F4"], bpm: 85, mood: "akrab, tenang, jujur dan menenangkan" },
  "country":           { notes: ["C4","D4","E4","G4","A4","B4","A4","G4"], bpm: 112, mood: "santai, hangat, ceria dan penuh kisah" },
  "bluegrass":         { notes: ["C4","D4","E4","G4","A4","B4","C5","B4"], bpm: 145, mood: "cepat, lincah, ceria dan penuh semangat" },
  "celtic":            { notes: ["C4","D4","F4","G4","A4","B4","D5","B4"], bpm: 110, mood: "mistis, damai, indah dan bernuansa alam" },

  // Latin, Salsa & Reggae
  "latin":             { notes: ["C4","D4","E4","G4","A4","B4","A4","G4"], bpm: 120, mood: "panas, ceria, menggairahkan dan meriah" },
  "salsa":             { notes: ["C4","D#4","F4","G4","A#4","G4","F4","D#4"], bpm: 180, mood: "cepat, semangat, penuh irama dan pesta" },
  "bossa-nova":        { notes: ["C4","D#4","F4","G4","A4","B4","A4","G4"], bpm: 120, mood: "lembut, santai, romantis dan mengalir" },
  "samba":             { notes: ["C4","E4","F#4","G4","A4","B4","C5","B4"], bpm: 105, mood: "riang, meriah, penuh warna dan semangat" },
  "reggae":            { notes: ["C4","G4","A4","G4","F4","E4","D4","C4"], bpm: 75, mood: "rileks, santai, damai dan positif" },

  // Hip-Hop, R&B & Soul
  "hip-hop":           { notes: ["C4","D#4","F4","G#4","A#4","G#4","F4","D#4"], bpm: 85, mood: "keren, santai, penuh percaya diri" },
  "rnb":               { notes: ["C4","E4","F#4","A4","B4","A4","G4","F#4"], bpm: 95, mood: "halus, romantis, lembut dan berkelas" },
  "soul":              { notes: ["C4","E4","G4","A4","B4","C5","B4","A4"], bpm: 90, mood: "penuh perasaan, hangat dan menyentuh jiwa" },
  "funk":              { notes: ["C4","D#4","F4","G4","A4","G4","F4","D#4"], bpm: 115, mood: "berirama, asik, menggoyang dan ceria" },

  // Genre Global Lainnya
  "disco":             { notes: ["C4","E4","G4","A4","B4","C5","D5","E5"], bpm: 120, mood: "meriah, ceria, klasik dan semangat pesta" },
  "gospel":            { notes: ["C4","F4","G4","A4","C5","B4","A4","G4"], bpm: 95, mood: "penuh harapan, damai, syukur dan menguatkan" },
  "classical":         { notes: ["C4","D4","E4","F4","G4","A4","B4","C5"], bpm: 80, mood: "anggun, megah, tenang dan abadi" },
  "orchestral":        { notes: ["C4","E4","G4","C5","E5","G5","A5","G5"], bpm: 70, mood: "luas, megah, emosional dan memukau" },
  "ambient":           { notes: ["C4","F4","A4","C5","F5","A5","F5","C5"], bpm: 65, mood: "menenangkan, luas, damai dan rileks" },
  "new-age":           { notes: ["C4","D4","F4","G4","A4","C5","D5","A4"], bpm: 80, mood: "damai, menyegarkan, penuh ketenangan jiwa" }
};

// Tetap kompatibel sepenuhnya dengan kode lama kamu
window.genrePatterns = {};
window.genreBpm = {};
window.genreMood = {};

for (var genre in window.genreData) {
  if (window.genreData.hasOwnProperty(genre)) {
    window.genrePatterns[genre] = window.genreData[genre].notes;
    window.genreBpm[genre] = window.genreData[genre].bpm;
    window.genreMood[genre] = window.genreData[genre].mood;
  }
}

console.log("✅ genre.js Lengkap: Pola + BPM + Mood Semua Genre Dunia | C4 - C14");
