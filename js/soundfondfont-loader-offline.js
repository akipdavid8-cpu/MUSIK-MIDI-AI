/**
 * soundfont-loader-offline.js
 * Daftar lengkap semua alat musik standar
 * 100% Offline | Kompatibel Smplr + Tone.js
 */
"use strict";

window.samplers = {};
window.suaraSiap = false;

// ==============================================
// 🎹 DAFTAR LENGKAP SEMUA ALAT MUSIK STANDAR GM
// ==============================================
const daftarAlat = {
  // 1-8: Piano
  "acoustic_grand_piano":   { lokasi: "./soundfonts/acoustic_grand_piano.js",   volume: -8, siap: false },
  "bright_acoustic_piano":  { lokasi: "./soundfonts/bright_acoustic_piano.js",  volume: -8, siap: false },
  "electric_grand_piano":   { lokasi: "./soundfonts/electric_grand_piano.js",   volume: -8, siap: false },
  "honkytonk_piano":        { lokasi: "./soundfonts/honkytonk_piano.js",        volume: -8, siap: false },
  "electric_piano_1":       { lokasi: "./soundfonts/electric_piano_1.js",       volume: -8, siap: false },
  "electric_piano_2":       { lokasi: "./soundfonts/electric_piano_2.js",       volume: -8, siap: false },
  "harpsichord":            { lokasi: "./soundfonts/harpsichord.js",            volume: -8, siap: false },
  "clavinet":               { lokasi: "./soundfonts/clavinet.js",               volume: -8, siap: false },

  // 9-16: Chromatic Percussion
  "celesta":                 { lokasi: "./soundfonts/celesta.js",                 volume: -7, siap: false },
  "glockenspiel":            { lokasi: "./soundfonts/glockenspiel.js",            volume: -7, siap: false },
  "music_box":               { lokasi: "./soundfonts/music_box.js",               volume: -7, siap: false },
  "vibraphone":              { lokasi: "./soundfonts/vibraphone.js",              volume: -7, siap: false },
  "marimba":                 { lokasi: "./soundfonts/marimba.js",                 volume: -7, siap: false },
  "xylophone":               { lokasi: "./soundfonts/xylophone.js",               volume: -7, siap: false },
  "tubular_bells":           { lokasi: "./soundfonts/tubular_bells.js",           volume: -7, siap: false },
  "dulcimer":                { lokasi: "./soundfonts/dulcimer.js",                volume: -7, siap: false },

  // 17-24: Organ
  "drawbar_organ":           { lokasi: "./soundfonts/drawbar_organ.js",           volume: -6, siap: false },
  "percussive_organ":        { lokasi: "./soundfonts/percussive_organ.js",        volume: -6, siap: false },
  "rock_organ":              { lokasi: "./soundfonts/rock_organ.js",              volume: -6, siap: false },
  "church_organ":            { lokasi: "./soundfonts/church_organ.js",            volume: -6, siap: false },
  "reed_organ":              { lokasi: "./soundfonts/reed_organ.js",              volume: -6, siap: false },
  "accordion":               { lokasi: "./soundfonts/accordion.js",               volume: -6, siap: false },
  "harmonica":               { lokasi: "./soundfonts/harmonica.js",               volume: -6, siap: false },
  "bandoneon":                { lokasi: "./soundfonts/bandoneon.js",                volume: -6, siap: false },

  // 25-32: Gitar
  "acoustic_guitar_nylon":   { lokasi: "./soundfonts/acoustic_guitar_nylon.js",   volume: -9, siap: false },
  "acoustic_guitar_steel":   { lokasi: "./soundfonts/acoustic_guitar_steel.js",   volume: -9, siap: false },
  "electric_guitar_jazz":     { lokasi: "./soundfonts/electric_guitar_jazz.js",     volume: -9, siap: false },
  "electric_guitar_clean":    { lokasi: "./soundfonts/electric_guitar_clean.js",    volume: -9, siap: false },
  "electric_guitar_muted":    { lokasi: "./soundfonts/electric_guitar_muted.js",    volume: -9, siap: false },
  "overdriven_guitar":        { lokasi: "./soundfonts/overdriven_guitar.js",        volume: -9, siap: false },
  "distortion_guitar":        { lokasi: "./soundfonts/distortion_guitar.js",        volume: -9, siap: false },
  "guitar_harmonics":         { lokasi: "./soundfonts/guitar_harmonics.js",         volume: -9, siap: false },

  // 33-40: Bass
  "acoustic_bass":            { lokasi: "./soundfonts/acoustic_bass.js",            volume: -5, siap: false },
  "electric_bass_finger":     { lokasi: "./soundfonts/electric_bass_finger.js",     volume: -5, siap: false },
  "electric_bass_pick":       { lokasi: "./soundfonts/electric_bass_pick.js",       volume: -5, siap: false },
  "fretless_bass":            { lokasi: "./soundfonts/fretless_bass.js",            volume: -5, siap: false },
  "slap_bass_1":              { lokasi: "./soundfonts/slap_bass_1.js",              volume: -5, siap: false },
  "slap_bass_2":              { lokasi: "./soundfonts/slap_bass_2.js",              volume: -5, siap: false },
  "synth_bass_1":             { lokasi: "./soundfonts/synth_bass_1.js",             volume: -5, siap: false },
  "synth_bass_2":             { lokasi: "./soundfonts/synth_bass_2.js",             volume: -5, siap: false },

  // 41-48: Senar
  "violin":                   { lokasi: "./soundfonts/violin.js",                   volume: -8, siap: false },
  "viola":                    { lokasi: "./soundfonts/viola.js",                    volume: -8, siap: false },
  "cello":                    { lokasi: "./soundfonts/cello.js",                    volume: -8, siap: false },
  "contrabass":               { lokasi: "./soundfonts/contrabass.js",               volume: -8, siap: false },
  "tremolo_strings":          { lokasi: "./soundfonts/tremolo_strings.js",          volume: -8, siap: false },
  "pizzicato_strings":        { lokasi: "./soundfonts/pizzicato_strings.js",        volume: -8, siap: false },
  "orchestral_harp":          { lokasi: "./soundfonts/orchestral_harp.js",          volume: -8, siap: false },
  "timpani":                  { lokasi: "./soundfonts/timpani.js",                  volume: -8, siap: false },

  // 49-56: Ensambel Senar
  "string_ensemble_1":         { lokasi: "./soundfonts/string_ensemble_1.js",         volume: -7, siap: false },
  "string_ensemble_2":         { lokasi: "./soundfonts/string_ensemble_2.js",         volume: -7, siap: false },
  "synth_strings_1":           { lokasi: "./soundfonts/synth_strings_1.js",           volume: -7, siap: false },
  "synth_strings_2":           { lokasi: "./soundfonts/synth_strings_2.js",           volume: -7, siap: false },
  "choir_aahs":                { lokasi: "./soundfonts/choir_aahs.js",                volume: -7, siap: false },
  "voice_oohs":                { lokasi: "./soundfonts/voice_oohs.js",                volume: -7, siap: false },
  "synth_voice":               { lokasi: "./soundfonts/synth_voice.js",               volume: -7, siap: false },
  "orchestra_hit":             { lokasi: "./soundfonts/orchestra_hit.js",             volume: -7, siap: false },

  // 57-64: Kuningan
  "trumpet":                   { lokasi: "./soundfonts/trumpet.js",                   volume: -6, siap: false },
  "trombone":                  { lokasi: "./soundfonts/trombone.js",                  volume: -6, siap: false },
  "tuba":                      { lokasi: "./soundfonts/tuba.js",                      volume: -6, siap: false },
  "muted_trumpet":             { lokasi: "./soundfonts/muted_trumpet.js",             volume: -6, siap: false },
  "french_horn":               { lokasi: "./soundfonts/french_horn.js",               volume: -6, siap: false },
  "brass_section":             { lokasi: "./soundfonts/brass_section.js",             volume: -6, siap: false },
  "synth_brass_1":             { lokasi: "./soundfonts/synth_brass_1.js",             volume: -6, siap: false },
  "synth_brass_2":             { lokasi: "./soundfonts/synth_brass_2.js",             volume: -6, siap: false },

  // 65-72: Alat Tiup Kayu
  "soprano_sax":               { lokasi: "./soundfonts/soprano_sax.js",               volume: -7, siap: false },
  "alto_sax":                  { lokasi: "./soundfonts/alto_sax.js",                  volume: -7, siap: false },
  "tenor_sax":                 { lokasi: "./soundfonts/tenor_sax.js",                 volume: -7, siap: false },
  "baritone_sax":              { lokasi: "./soundfonts/baritone_sax.js",              volume: -7, siap: false },
  "oboe":                      { lokasi: "./soundfonts/oboe.js",                      volume: -7, siap: false },
  "english_horn":              { lokasi: "./soundfonts/english_horn.js",              volume: -7, siap: false },
  "bassoon":                   { lokasi: "./soundfonts/bassoon.js",                   volume: -7, siap: false },
  "clarinet":                  { lokasi: "./soundfonts/clarinet.js",                  volume: -7, siap: false },

  // 73-80: Flute & Tiup
  "piccolo":                   { lokasi: "./soundfonts/piccolo.js",                   volume: -8, siap: false },
  "flute":                     { lokasi: "./soundfonts/flute.js",                     volume: -8, siap: false },
  "recorder":                  { lokasi: "./soundfonts/recorder.js",                  volume: -8, siap: false },
  "pan_flute":                 { lokasi: "./soundfonts/pan_flute.js",                 volume: -8, siap: false },
  "blown_bottle":              { lokasi: "./soundfonts/blown_bottle.js",              volume: -8, siap: false },
  "shakuhachi":                { lokasi: "./soundfonts/shakuhachi.js",                volume: -8, siap: false },
  "whistle":                   { lokasi: "./soundfonts/whistle.js",                   volume: -8, siap: false },
  "ocarina":                   { lokasi: "./soundfonts/ocarina.js",                   volume: -8, siap: false },

  // 81-128: Sintesis, Efek & Tradisional
  "lead_1_square":             { lokasi: "./soundfonts/lead_1_square.js",             volume: -8, siap: false },
  "lead_2_saw":                 { lokasi: "./soundfonts/lead_2_saw.js",                 volume: -8, siap: false },
  "pad_1_new_age":              { lokasi: "./soundfonts/pad_1_new_age.js",              volume: -8, siap: false },
  "pad_2_warm":                 { lokasi: "./soundfonts/pad_2_warm.js",                 volume: -8, siap: false },
  "fx_1_rain":                  { lokasi: "./soundfonts/fx_1_rain.js",                  volume: -8, siap: false },
  "sitar":                      { lokasi: "./soundfonts/sitar.js",                      volume: -7, siap: false },
  "banjo":                      { lokasi: "./soundfonts/banjo.js",                      volume: -7, siap: false },
  "shamisen":                   { lokasi: "./soundfonts/shamisen.js",                   volume: -7, siap: false },
  "koto":                       { lokasi: "./soundfonts/koto.js",                       volume: -7, siap: false },
  "kalimba":                    { lokasi: "./soundfonts/kalimba.js",                    volume: -7, siap: false },
  "bagpipe":                    { lokasi: "./soundfonts/bagpipe.js",                    volume: -7, siap: false },
  "fiddle":                     { lokasi: "./soundfonts/fiddle.js",                     volume: -7, siap: false },
  "shanai":                     { lokasi: "./soundfonts/shanai.js",                     volume: -7, siap: false },

  // 🥁 Drum Kit Lengkap
  "standard_drum_kit":          { lokasi: "./soundfonts/standard_drum_kit.js",          volume: -3, siap: false },
  "room_drum_kit":              { lokasi: "./soundfonts/room_drum_kit.js",              volume: -3, siap: false },
  "power_drum_kit":             { lokasi: "./soundfonts/power_drum_kit.js",             volume: -3, siap: false },
  "electronic_drum_kit":        { lokasi: "./soundfonts/electronic_drum_kit.js",        volume: -3, siap: false },
  "tr808_drum_kit":             { lokasi: "./soundfonts/tr808_drum_kit.js",             volume: -3, siap: false }
};

// ==============================================
// FUNGSI UTAMA
// ==============================================
function muatAlat(namaAlat) {
  return new Promise(function(resolve, reject) {
    if (!daftarAlat.hasOwnProperty(namaAlat)) {
      return reject("Alat tidak terdaftar: " + namaAlat);
    }
    if (window.samplers.hasOwnProperty(namaAlat)) {
      daftarAlat[namaAlat].siap = true;
      return resolve(window.samplers[namaAlat]);
    }

    try {
      window.samplers[namaAlat] = new Smplr({
        url: daftarAlat[namaAlat].lokasi,
        volume: daftarAlat[namaAlat].volume
      });

      window.samplers[namaAlat].ready
        .then(function() {
          daftarAlat[namaAlat].siap = true;
          console.log("✅ Siap: " + namaAlat);
          resolve(window.samplers[namaAlat]);
        })
        .catch(function() {
          console.log("ℹ️ Belum ada file: " + namaAlat + " → pakai suara cadangan");
          resolve(null);
        });

    } catch (err) {
      console.error("❌ Gagal muat: " + namaAlat, err);
      resolve(null);
    }
  });
}

window.muatSemuaSuara = function() {
  if (typeof Tone === "undefined" || typeof Smplr === "undefined") {
    console.error("❌ Tone.js atau Smplr.js belum dimuat!");
    return Promise.resolve(false);
  }

  return Tone.start().then(function() {
    console.log("🔊 Sistem audio aktif");
    window.suaraSiap = true;
    return true;
  });
};

// Fungsi putar nada dengan cadangan aman
window.putarNada = function(namaAlat, namaNada, durasi, kecepatan) {
  durasi = durasi || 0.5;
  kecepatan = kecepatan || 80;

  var nomorMidi = window.noteMap ? window.noteMap[namaNada] : null;
  if (!nomorMidi) { console.warn("⚠️ Nada tidak ada: " + namaNada); return; }

  // Pakai soundfont jika ada
  if (window.samplers.hasOwnProperty(namaAlat) && daftarAlat[namaAlat].siap) {
    window.samplers[namaAlat].start({ note: nomorMidi, duration: durasi, velocity: kecepatan });
    return;
  }

  // Suara cadangan aman
  try {
    var synth = new Tone.Synth().toDestination();
    synth.volume.value = -12;
    synth.triggerAttackRelease(Tone.Frequency(nomorMidi, "midi"), durasi);
  } catch (err) { /* abaikan jika belum siap */ }
};

console.log("📦 soundfont-loader-offline.js dimuat: Daftar lengkap alat musik siap");
