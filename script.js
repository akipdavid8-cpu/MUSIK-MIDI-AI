const themeInput = document.getElementById("theme");
    const genreInput = document.getElementById("genre");
    const generateBtn = document.getElementById("generateBtn");
    const playBtn = document.getElementById("playBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const lyricsOutput = document.getElementById("lyricsOutput");
    const notesOutput = document.getElementById("notesOutput");

    let generatedNotes = [];
    let midiData = null;
    let songStructure = null;

    // Function untuk konversi Scale ke MIDI Note Number
    const NOTE_BASE = {
      C: 0,
      D: 2,
      E: 4,
      F: 5,
      G: 7,
      A: 9,
      B: 11
    };

    function noteToMidi(note) {
      const match = note.match(/([A-G])(\d)/);
      if (!match) return 60;

      const pitch = match[1];
      const octave = parseInt(match[2]);

      return 12 * (octave + 1) + NOTE_BASE[pitch];
    }

    const genrePatterns = {
      "slow-edm": ["C4", "E4", "G4", "A4", "G4", "E4"],
      "pop-edm": ["C4", "D4", "E4", "G4", "A4", "G4", "E4", "D4"],
      "koplo-edm": ["C4", "E4", "F4", "G4", "A4", "G4", "F4", "E4"],
      "rock-edm": ["E5", "G5", "A5", "C6", "A5", "G5", "E5"]
    };

    const bassPatterns = {
      "slow-edm": ["C4", "C4", "G4", "G4", "C4", "C4"],
      "pop-edm": ["C4", "G4", "C4", "D4", "E4", "D4", "C4", "G4"],
      "koplo-edm": ["C4", "E4", "F4", "G4", "F4", "E4", "C4", "G4"],
      "rock-edm": ["E5", "G5", "A5", "C6", "A5", "G5", "E5", "G5"]
    };

    const drumPatterns = {
      "slow-edm": ["kick", "rest", "kick", "rest", "snare", "rest", "kick", "rest"],
      "pop-edm": ["kick", "rest", "snare", "rest", "kick", "rest", "snare", "rest"],
      "koplo-edm": ["kick", "kick", "snare", "kick", "kick", "snare", "kick", "snare"],
      "rock-edm": ["kick", "snare", "kick", "snare", "kick", "snare", "kick", "snare"]
    };

    const guitarPatterns = {
      "slow-edm": ["E4", "G4", "E4", "A4", "E4", "G4"],
      "pop-edm": ["C4", "E4", "G4", "C5", "G4", "E4", "C4", "G4"],
      "koplo-edm": ["E4", "G4", "F4", "A4", "E4", "G4", "F4", "E4"],
      "rock-edm": ["G5", "A5", "E5", "G5", "A5", "E5", "G5", "A5"]
    };

    const trumpetPatterns = {
      "slow-edm": ["G4", "A4", "G4", "E4", "G4", "A4"],
      "pop-edm": ["D4", "E4", "F4", "G4", "A4", "G4", "F4", "E4"],
      "koplo-edm": ["F4", "G4", "A4", "B4", "A4", "G4", "F4", "G4"],
      "rock-edm": ["A5", "B5", "C6", "D6", "C6", "B5", "A5", "B5"]
    };

    const saxophonePatterns = {
      "slow-edm": ["A4", "B4", "A4", "G4", "A4", "B4"],
      "pop-edm": ["E4", "F4", "G4", "A4", "B4", "A4", "G4", "F4"],
      "koplo-edm": ["G4", "A4", "B4", "C5", "B4", "A4", "G4", "A4"],
      "rock-edm": ["B5", "C6", "D6", "E6", "D6", "C6", "B5", "C6"]
    };

    const organPatterns = {
      "slow-edm": ["C3", "E3", "G3", "A3", "G3", "E3"],
      "pop-edm": ["C3", "D3", "E3", "G3", "A3", "G3", "E3", "D3"],
      "koplo-edm": ["C3", "E3", "F3", "G3", "A3", "G3", "F3", "E3"],
      "rock-edm": ["E5", "G5", "A5", "C6", "A5", "G5", "E5", "G5"]
    };

    const klaksonBansuriPatterns = {
      "slow-edm": ["D5", "E5", "D5", "C5", "D5", "E5"],
      "pop-edm": ["E5", "F5", "G5", "A5", "G5", "F5", "E5", "F5"],
      "koplo-edm": ["F5", "G5", "A5", "B5", "A5", "G5", "F5", "G5"],
      "rock-edm": ["G6", "A6", "B6", "C7", "B6", "A6", "G6", "A6"]
    };

    const lyricPatterns = {
      "slow-edm": {
        intro: "Di malam yang sunyi dan sepi\nKu dengarkan bisikan langit",
        verse1: "Hati membeku dalam kesunyian\nNada lembut mengalun perlahan\nSetiap napas terasa dalam\nBersatu dengan ketenangan malam",
        preChorus: "Waktu berjalan seperti mimpi\nRasa membuncah perlahan-lahan\nDalam irama yang mendalam\nKu cari diri dalam keheningan",
        chorus: "Lagu EDM yang lembut ini\nMembawa pesan dari jiwa\n${theme}\nTerwujud dalam nada halus",
        verse2: "Cahaya redup menemani\nSuara lembek di hati\nSetiap kata jadi keluh kesah\nBermain dalam kepedihan",
        bridge: "Jika dunia terasa berat\nBiarkan musik menenangkan\nKita berdiam dalam gelap\nMenemukan kedamaian abadi",
        outro: "Nada perlahan menghilang\nHanya rasa yang tertinggal\n${theme}\nBersatu dalam kesunyian"
      },
      "pop-edm": {
        intro: "Pagi yang cerah penuh energi\nMari kita ciptakan keajaiban",
        verse1: "Langkah cepat membawa semangat\nNada catchy berisi kegembiraan\nAku mengikuti irama detak\nMenjadi gerakan yang tak henti",
        preChorus: "Biar suara terus menggelegar\nBiar mimpi semakin besar\nDalam beat yang memukul dada\nKita menari dengan penuh gaya",
        chorus: "Ini lagu pop-edm yang menggerak\nDari hati untuk berdansa\n${theme}\nMenjadi nada yang meledak",
        verse2: "Musik mengalun memukul bass\nSemua orang menyatu bersama\nSetiap kata jadi hook yang catchy\nMembuat semua tergoyang jiwa",
        bridge: "Jika energi mulai berkurang\nBiarkan beat menyemangati\nKita bangkit dengan gembira\nDalam ritme yang terus berlanjut",
        outro: "Musik terus bergema jaya\nEnergi masih menggelegar\n${theme}\nHidup dalam setiap beat"
      },
      "koplo-edm": {
        intro: "Malam dangdutan penuh kemerahan\nKu rasakan goyang dalam dada",
        verse1: "Langkah gemulai membawa rasa\nBeat dangdut berpadu dengan nada\nAku mengikuti irama tradisi\nMenjadi lagu yang bersahut-sahutan",
        preChorus: "Biar tubuh terus bergoyang\nBiar mimpi jadi kenyataan\nDalam koplo yang meriah\nKita berdansa dengan gairah",
        chorus: "Ini lagu koplo-edm yang menggeleng\nDari hati untuk bergembira\n${theme}\nMenjadi nada penuh semangat",
        verse2: "Gendang berdetak dalam jiwa\nSemua orang merasakan ledakan\nSetiap kata jadi pergaulan\nMembawa semua dalam tarian",
        bridge: "Jika malam terasa meriah\nBiarkan musik merayu\nKita bergoyangan bersama\nDalam dangdut yang abadi",
        outro: "Gendang masih terus berdenyut\nSemangat tak pernah hilang\n${theme}\nHidup dalam setiap goyang"
      },
      "rock-edm": {
        intro: "Malam yang panas membakar rasa\nGitar keras menggelegar angkasa",
        verse1: "Langkah kasar membawa ledakan\nNada keras membawa pemberontakan\nAku mengikuti irama yang garang\nMenjadi lagu yang melukai hati",
        preChorus: "Biar suara terus meledak\nBiar batas semakin terhapus\nDalam rock yang menggelegar\nKita menyanyi dengan kebebasan",
        chorus: "Ini lagu rock-edm yang membara\nDari hati untuk berkelahi\n${theme}\nMenjadi nada penuh kebencian",
        verse2: "Gitar berdentam dalam dada\nAmplifier menggelegar keras\nSetiap kata jadi seruan\nMembawa semua dalam kemenangan",
        bridge: "Jika dunia terasa salah\nBiarkan musik membebaskan\nKita berteriak dengan keras\nDalam rock yang paling ganas",
        outro: "Gitar masih terus menggelegar\nSemangat api tak pernah padam\n${theme}\nHidup dalam setiap nada keras"
      }
    };

    function createLyrics(theme, genre) {
      const cleanTheme = theme.trim() || "cerita hati yang penuh warna";
      const genreName = genreInput.options[genreInput.selectedIndex].text;
      const lyrics = lyricPatterns[genre];

      if (!lyrics) {
        return "[Error] Genre tidak ditemukan";
      }

      return `[Intro]
${lyrics.intro}
Tentang ${cleanTheme}

[Verse 1]
${lyrics.verse1}

[Pre-Chorus]
${lyrics.preChorus}

[Chorus]
${lyrics.chorus.replace("${theme}", cleanTheme)}

[Verse 2]
${lyrics.verse2}

[Bridge]
${lyrics.bridge}

[Outro]
${lyrics.outro.replace("${theme}", cleanTheme)}`;
    }

    function createNotesFromLyrics(lyrics, genre) {
      const pattern = genrePatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createBassNotes(lyrics, genre) {
      const pattern = bassPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createDrumNotes(lyrics, genre) {
      const pattern = drumPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const drums = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        drums.push(pattern[i % pattern.length]);
      }

      return drums;
    }

    function createGuitarNotes(lyrics, genre) {
      const pattern = guitarPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createTrumpetNotes(lyrics, genre) {
      const pattern = trumpetPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createSaxophoneNotes(lyrics, genre) {
      const pattern = saxophonePatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createOrganNotes(lyrics, genre) {
      const pattern = organPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    function createKlaaksonBansuriNotes(lyrics, genre) {
      const pattern = klaksonBansuriPatterns[genre];
      const words = lyrics.split(/\s+/).filter(Boolean);
      const notes = [];

      for (let i = 0; i < Math.min(words.length, 64); i++) {
        notes.push(pattern[i % pattern.length]);
      }

      return notes;
    }

    // ===== MELODY ENGINE =====
    
    const chordProgressions = {
      "slow-edm": ["C", "Am", "F", "G"],
      "pop-edm": ["C", "G", "Am", "F"],
      "koplo-edm": ["C", "F", "G", "C"],
      "rock-edm": ["D", "A", "Bm", "G"]
    };

    const chordNotes = {
      "C": ["C4", "E4", "G4"], "Am": ["A4", "C5", "E5"], "F": ["F4", "A4", "C5"], "G": ["G4", "B4", "D5"],
      "D": ["D4", "F#4", "A4"], "A": ["A4", "C#5", "E5"], "Bm": ["B4", "D5", "F#5"]
    };

    function generateMelody(lyrics, genre) {
      const words = lyrics.split(/\s+/).filter(Boolean);
      const genrePattern = genrePatterns[genre];
      const melody = [];

      for (let i = 0; i < Math.min(words.length, 32); i++) {
        melody.push(genrePattern[i % genrePattern.length]);
      }

      return melody;
    }

    function generateHarmony(melody, type = "third") {
      const noteValues = { C: 0, D: 2, E: 4, F: 5, G: 7, A: 9, B: 11 };
      const valueToNote = { 0: "C", 2: "D", 4: "E", 5: "F", 7: "G", 9: "A", 11: "B" };
      
      return melody.map(note => {
        const match = note.match(/([A-G])(#?)(\d)/);
        if (!match) return "C4";
        
        const [_, pitch, sharp, octave] = match;
        const midiNote = noteToMidi(note);
        let harmonyMidi;

        if (type === "third") {
          // Minor third = +3 semitone
          harmonyMidi = midiNote + 3;
        } else if (type === "fifth") {
          // Perfect fifth = +7 semitone
          harmonyMidi = midiNote + 7;
        } else if (type === "octave") {
          // Octave = +12 semitone
          harmonyMidi = midiNote + 12;
        } else if (type === "random") {
          // Random interval (3-12 semitone)
          const intervals = [3, 4, 5, 7, 9, 12];
          const randomInterval = intervals[Math.floor(Math.random() * intervals.length)];
          harmonyMidi = midiNote + randomInterval;
        } else if (type === "genre") {
          // Genre-specific harmony (default: third)
          harmonyMidi = midiNote + 3;
        }

        // Clamp MIDI note dalam range C4-C7
        harmonyMidi = Math.max(60, Math.min(96, harmonyMidi));

        // Convert MIDI kembali ke note string
        const harmonyOctave = Math.floor(harmonyMidi / 12) - 1;
        const harmonySemitone = harmonyMidi % 12;
        const harmonyPitch = valueToNote[harmonySemitone] || "C";

        return `${harmonyPitch}${harmonyOctave}`;
      });
    }

    function generateChord(genre, bars = 8) {
      const progression = chordProgressions[genre];
      const chords = [];

      for (let i = 0; i < bars; i++) {
        chords.push(progression[i % progression.length]);
      }

      return chords;
    }

    function generateBass(chords) {
      return chords.map(chord => {
        const notes = chordNotes[chord] || ["C4"];
        // Return root note, minimal C4
        return notes[0];
      });
    }

    function generateDrums(genre, bars = 8) {
      const drumPattern = drumPatterns[genre];
      const drums = [];

      for (let i = 0; i < bars * 8; i++) {
        drums.push(drumPattern[i % drumPattern.length]);
      }

      return drums;
    }

    function generateVelocity(notes) {
      return notes.map((note, index) => {
        const baseVel = 80;
        const variation = Math.sin(index * 0.5) * 20;
        return Math.max(40, Math.min(127, baseVel + variation));
      });
    }

    function generateDuration(notes, genre) {
      const tempoMultiplier = { "slow-edm": 1.5, "pop-edm": 1, "koplo-edm": 1.2, "rock-edm": 0.8 };
      const multiplier = tempoMultiplier[genre] || 1;

      return notes.map((note, index) => {
        const baseDuration = 0.5;
        const variation = index % 3 === 0 ? 0.2 : 0;
        return (baseDuration + variation) * multiplier;
      });
    }

    function generateSongStructure(lyrics, genre) {
      const lines = lyrics.split("\n").filter(l => l.trim());
      const melody = generateMelody(lyrics, genre);
      const chords = generateChord(genre, 4);
      const bass = generateBass(chords);
      const drums = generateDrums(genre, 4);
      const harmony = generateHarmony(melody);
      const velocity = generateVelocity(melody);
      const duration = generateDuration(melody, genre);

      return {
        intro: { melody: melody.slice(0, 4), harmony: harmony.slice(0, 4), drums: drums.slice(0, 32) },
        verse: { melody: melody.slice(4, 16), harmony: harmony.slice(4, 16), drums: drums.slice(32, 96) },
        chorus: { melody: melody.slice(16, 24), harmony: harmony.slice(16, 24), drums: drums.slice(96, 160) },
        bridge: { melody: melody.slice(24, 28), harmony: harmony.slice(24, 28), drums: drums.slice(160, 192) },
        outro: { melody: melody.slice(28, 32), harmony: harmony.slice(28, 32), drums: drums.slice(192, 224) },
        chords: chords,
        bass: bass,
        velocity: velocity,
        duration: duration
      };
    }

    function playMelody(melodyData) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      const tempo = 0.25;

      const playSection = (notes, startTime) => {
        notes.forEach((note, index) => {
          const osc = audioContext.createOscillator();
          const gain = audioContext.createGain();
          const noteStartTime = startTime + index * tempo;

          osc.type = "sine";
          osc.frequency.value = midiNoteToFrequency(noteToMidi(note));

          gain.gain.setValueAtTime(0.15, noteStartTime);
          gain.gain.exponentialRampToValueAtTime(0.001, noteStartTime + tempo * 0.9);

          osc.connect(gain);
          gain.connect(audioContext.destination);

          osc.start(noteStartTime);
          osc.stop(noteStartTime + tempo * 0.9);
        });
      };

      let currentTime = audioContext.currentTime;
      playSection(melodyData.intro.melody, currentTime);
      currentTime += melodyData.intro.melody.length * tempo;
      playSection(melodyData.verse.melody, currentTime);
      currentTime += melodyData.verse.melody.length * tempo;
      playSection(melodyData.chorus.melody, currentTime);
    }

    function exportMidi() {
      if (!midiData || midiData.length === 0) {
        alert("Buat musik terlebih dahulu!");
        return;
      }

      const midiArray = new Uint8Array(midiData);
      const blob = new Blob([midiArray], { type: "audio/midi" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      
      a.href = url;
      a.download = `musik-${Date.now()}.mid`;
      a.click();

      URL.revokeObjectURL(url);
    }

    // ===== END MELODY ENGINE =====

    function midiNoteToFrequency(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }

    function playPreview(notes, bassNotes, drumNotes, guitarNotes, trumpetNotes, saxophoneNotes, organNotes, klaksonBansuriNotes) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      const tempo = 0.28;

      // Piano
      notes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "sine";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.12, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo);
      });

      // Bass
      bassNotes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "sine";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.15, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo);
      });

      // Drum
      drumNotes.forEach((drum, index) => {
        const startTime = audioContext.currentTime + index * tempo;

        if (drum === "kick") {
          const osc = audioContext.createOscillator();
          const gainNode = audioContext.createGain();
          osc.frequency.setValueAtTime(150, startTime);
          osc.frequency.exponentialRampToValueAtTime(0.01, startTime + 0.1);
          gainNode.gain.setValueAtTime(0.3, startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
          osc.connect(gainNode);
          gainNode.connect(audioContext.destination);
          osc.start(startTime);
          osc.stop(startTime + 0.1);
        } else if (drum === "snare") {
          const noise = audioContext.createBufferSource();
          const buffer = audioContext.createBuffer(1, audioContext.sampleRate * 0.1, audioContext.sampleRate);
          const data = buffer.getChannelData(0);
          for (let i = 0; i < buffer.length; i++) {
            data[i] = Math.random() * 2 - 1;
          }
          noise.buffer = buffer;
          const gainNode = audioContext.createGain();
          gainNode.gain.setValueAtTime(0.15, startTime);
          gainNode.gain.exponentialRampToValueAtTime(0.01, startTime + 0.1);
          noise.connect(gainNode);
          gainNode.connect(audioContext.destination);
          noise.start(startTime);
        }
      });

      // Guitar
      guitarNotes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "triangle";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.8);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo * 0.8);
      });

      // Trumpet
      trumpetNotes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "sawtooth";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.1, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.7);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo * 0.7);
      });

      // Saxophone
      saxophoneNotes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "square";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.09, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.75);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo * 0.75);
      });

      // Organ
      organNotes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "sine";
        oscillator.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain.gain.setValueAtTime(0.07, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo);
      });

      // Klakson Bansuri
      klaksonBansuriNotes.forEach((note, index) => {
        // Klakson layer (square wave, bright)
        const oscillator1 = audioContext.createOscillator();
        const gain1 = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator1.type = "square";
        oscillator1.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain1.gain.setValueAtTime(0.06, startTime);
        gain1.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.7);

        oscillator1.connect(gain1);
        gain1.connect(audioContext.destination);

        oscillator1.start(startTime);
        oscillator1.stop(startTime + tempo * 0.7);

        // Bansuri layer (sine wave, mellow) 
        const oscillator2 = audioContext.createOscillator();
        const gain2 = audioContext.createGain();

        oscillator2.type = "sine";
        oscillator2.frequency.value = midiNoteToFrequency(noteToMidi(note));

        gain2.gain.setValueAtTime(0.05, startTime);
        gain2.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.8);

        oscillator2.connect(gain2);
        gain2.connect(audioContext.destination);

        oscillator2.start(startTime);
        oscillator2.stop(startTime + tempo * 0.8);
      });
    }

    function createMidiFile(notes) {
      const header = [
        0x4d, 0x54, 0x68, 0x64,
        0x00, 0x00, 0x00, 0x06,
        0x00, 0x00,
        0x00, 0x04,
        0x00, 0x60
      ];

      // Track 1: Piano
      let pianoTrack = [
        0x00, 0xff, 0x51, 0x03, 0x07, 0xa1, 0x20,
        0x00, 0xc0, 0x00
      ];

      notes.forEach(note => {
        const midiNote = noteToMidi(note);
        pianoTrack.push(0x00, 0x90, midiNote, 0x64);
        pianoTrack.push(0x60, 0x80, midiNote, 0x40);
      });

      pianoTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 2: Bass
      let bassTrack = [
        0x00, 0xc1, 0x20
      ];

      notes.forEach((note, idx) => {
        const bassNoteMap = { C4: 48, D4: 50, E4: 52, F4: 53, G4: 55, A4: 57, B4: 59, C5: 60 };
        const bassMidiNote = bassNoteMap[note] || 48;
        if (idx % 2 === 0) {
          bassTrack.push(0x00, 0x91, bassMidiNote, 0x50);
          bassTrack.push(0x60, 0x81, bassMidiNote, 0x40);
        }
      });

      bassTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 3: Electric Guitar
      let guitarTrack = [
        0x00, 0xc2, 0x19
      ];

      notes.forEach((note, idx) => {
        const midiNote = noteToMidi(note);
        if (idx % 3 !== 0) {
          guitarTrack.push(0x00, 0x92, midiNote + 12, 0x48);
          guitarTrack.push(0x30, 0x82, midiNote + 12, 0x40);
        }
      });

      guitarTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 5: Trumpet
      let trumpetTrack = [
        0x00, 0xc3, 0x38
      ];

      notes.forEach((note, idx) => {
        const midiNote = noteToMidi(note);
        if (idx % 2 === 0) {
          trumpetTrack.push(0x00, 0x93, midiNote, 0x55);
          trumpetTrack.push(0x50, 0x83, midiNote, 0x40);
        }
      });

      trumpetTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 6: Saxophone
      let saxophoneTrack = [
        0x00, 0xc4, 0x40
      ];

      notes.forEach((note, idx) => {
        const midiNote = noteToMidi(note);
        if (idx % 3 !== 1) {
          saxophoneTrack.push(0x00, 0x94, midiNote, 0x50);
          saxophoneTrack.push(0x48, 0x84, midiNote, 0x40);
        }
      });

      saxophoneTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 7: Organ
      let organTrack = [
        0x00, 0xc5, 0x10
      ];

      notes.forEach((note, idx) => {
        const organNoteMap = { C2: 36, D2: 38, E2: 40, F2: 41, G2: 43, A2: 45, B2: 47, C3: 48, D3: 50, E3: 52, F3: 53, G3: 55, A3: 57, B3: 59 };
        const organMidiNote = organNoteMap[note] || 48;
        organTrack.push(0x00, 0x95, organMidiNote, 0x4a);
        organTrack.push(0x60, 0x85, organMidiNote, 0x40);
      });

      organTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 8: Klakson Bansuri
      let klaksonBansuriTrack = [
        0x00, 0xc6, 0x50
      ];

      notes.forEach((note, idx) => {
        const midiNote = noteToMidi(note);
        klaksonBansuriTrack.push(0x00, 0x96, midiNote, 0x5a);
        klaksonBansuriTrack.push(0x60, 0x86, midiNote, 0x40);
      });

      klaksonBansuriTrack.push(0x00, 0xff, 0x2f, 0x00);

      // Track 4: Drum
      let drumTrack = [
        0x00, 0xb9, 0x07, 0x64
      ];

      const kickDrum = 36;
      const snare = 38;
      const hihat = 42;

      for (let i = 0; i < notes.length; i++) {
        if (i % 4 === 0) {
          drumTrack.push(0x00, 0x99, kickDrum, 0x60);
          drumTrack.push(0x30, 0x89, kickDrum, 0x40);
        }
        if (i % 4 === 2) {
          drumTrack.push(0x00, 0x99, snare, 0x60);
          drumTrack.push(0x30, 0x89, snare, 0x40);
        }
        if (i % 2 === 0) {
          drumTrack.push(0x00, 0x99, hihat, 0x40);
          drumTrack.push(0x18, 0x89, hihat, 0x40);
        }
      }

      drumTrack.push(0x00, 0xff, 0x2f, 0x00);

      const tracks = [
        { data: pianoTrack, name: "Piano Track" },
        { data: bassTrack, name: "Bass Track" },
        { data: guitarTrack, name: "Guitar Track" },
        { data: drumTrack, name: "Drum Track" },
        { data: trumpetTrack, name: "Trumpet Track" },
        { data: saxophoneTrack, name: "Saxophone Track" },
        { data: organTrack, name: "Organ Track" },
        { data: klaksonBansuriTrack, name: "Klakson Bansuri Track" }
      ];

      let midiData = [...header];

      tracks.forEach(track => {
        const trackLength = track.data.length;
        const trackHeader = [
          0x4d, 0x54, 0x72, 0x6b,
          (trackLength >> 24) & 0xff,
          (trackLength >> 16) & 0xff,
          (trackLength >> 8) & 0xff,
          trackLength & 0xff
        ];
        midiData = [...midiData, ...trackHeader, ...track.data];
      });

      return new Uint8Array(midiData);
    }

    let generatedBassNotes = [];
    let generatedDrumNotes = [];
    let generatedGuitarNotes = [];
    let generatedTrumpetNotes = [];
    let generatedSaxophoneNotes = [];
    let generatedOrganNotes = [];
    let generatedKlaaksonBansuriNotes = [];

    generateBtn.addEventListener("click", () => {
      const theme = themeInput.value;
      const genre = genreInput.value;

      const lyrics = createLyrics(theme, genre);
      generatedNotes = createNotesFromLyrics(lyrics, genre);
      generatedBassNotes = createBassNotes(lyrics, genre);
      generatedDrumNotes = createDrumNotes(lyrics, genre);
      generatedGuitarNotes = createGuitarNotes(lyrics, genre);
      generatedTrumpetNotes = createTrumpetNotes(lyrics, genre);
      generatedSaxophoneNotes = createSaxophoneNotes(lyrics, genre);
      generatedOrganNotes = createOrganNotes(lyrics, genre);
      generatedKlaaksonBansuriNotes = createKlaaksonBansuriNotes(lyrics, genre);
      songStructure = generateSongStructure(lyrics, genre);
      midiData = createMidiFile(generatedNotes);

      lyricsOutput.textContent = lyrics;
      notesOutput.textContent = generatedNotes.join(" - ");

      playBtn.disabled = false;
      downloadBtn.disabled = false;
      
      console.log("🎵 Song Structure Generated:", songStructure);
    });

    playBtn.addEventListener("click", () => {
      if (generatedNotes.length > 0) {
        playPreview(generatedNotes, generatedBassNotes, generatedDrumNotes, generatedGuitarNotes, generatedTrumpetNotes, generatedSaxophoneNotes, generatedOrganNotes, generatedKlaaksonBansuriNotes);
      }
    });

    downloadBtn.addEventListener("click", () => {
      if (!midiData) return;

      const blob = new Blob([midiData], { type: "audio/midi" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = "musik-midi-ai.mid";
      a.click();

      URL.revokeObjectURL(url);
    });

    // ===== MELODY ENGINE EVENT LISTENERS =====
    
    // Play Melody dengan Song Structure
    window.playMelodyStructure = function() {
      if (!songStructure) {
        alert("Generate musik terlebih dahulu!");
        return;
      }
      playMelody(songStructure);
      console.log("▶️ Playing Melody Structure");
    };

    // Export MIDI
    window.exportMidiFile = function() {
      exportMidi();
      console.log("📥 Exporting MIDI");
    };

    // Show Harmony dengan berbagai tipe
    window.showHarmony = function(type = "third") {
      if (!generatedNotes.length) {
        alert("Generate musik terlebih dahulu!");
        return;
      }
      const harmony = generateHarmony(generatedNotes, type);
      console.log(`🎼 Harmony (${type}):`, harmony.join(" - "));
      alert(`Harmoni ${type}:\n` + harmony.join(" - "));
    };

    // Show Harmony berdasarkan pilihan dropdown
    window.showSelectedHarmony = function() {
      const harmonyTypeSelect = document.getElementById("harmonyType");
      if (!harmonyTypeSelect) {
        alert("Harmony type selector tidak ditemukan!");
        return;
      }
      const selectedType = harmonyTypeSelect.value;
      showHarmony(selectedType);
    };

    // Harmony types shortcuts
    window.harmonyThird = function() {
      return showHarmony("third");
    };

    window.harmonyFifth = function() {
      return showHarmony("fifth");
    };

    window.harmonyOctave = function() {
      return showHarmony("octave");
    };

    window.harmonyRandom = function() {
      return showHarmony("random");
    };

    window.harmonyGenre = function() {
      return showHarmony("genre");
    };

    // Show Chords
    window.showChords = function() {
      if (!songStructure) {
        alert("Generate musik terlebih dahulu!");
        return;
      }
      console.log("🎸 Chords:", songStructure.chords.join(" - "));
      alert("Chord Progression:\n" + songStructure.chords.join(" - "));
    };

    // Show Bass
    window.showBass = function() {
      if (!songStructure) {
        alert("Generate musik terlebih dahulu!");
        return;
      }
      console.log("🎸 Bass:", songStructure.bass.join(" - "));
      alert("Bass Line:\n" + songStructure.bass.join(" - "));
    };

    // ===== END MELODY ENGINE EVENT LISTENERS =====

