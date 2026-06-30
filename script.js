const themeInput = document.getElementById("theme");
    const genreInput = document.getElementById("genre");
    const generateBtn = document.getElementById("generateBtn");
    const playBtn = document.getElementById("playBtn");
    const downloadBtn = document.getElementById("downloadBtn");
    const lyricsOutput = document.getElementById("lyricsOutput");
    const notesOutput = document.getElementById("notesOutput");

    let generatedNotes = [];
    let midiData = null;

    const noteMap = {
      C2: 36, D2: 38, E2: 40, F2: 41, G2: 43, A2: 45, B2: 47,
      C3: 48, D3: 50, E3: 52, F3: 53,
      G3: 55, A3: 57, B3: 59,
      C4: 60, D4: 62, E4: 64, F4: 65,
      G4: 67, A4: 69, B4: 71, C5: 72
    };

    const genrePatterns = {
      "slow-edm": ["C4", "E4", "G4", "A4", "G4", "E4"],
      "pop-edm": ["C4", "D4", "E4", "G4", "A4", "G4", "E4", "D4"],
      "koplo-edm": ["C4", "E4", "F4", "G4", "A4", "G4", "F4", "E4"],
      "rock-edm": ["E4", "G4", "A4", "C5", "A4", "G4", "E4"]
    };

    const bassPatterns = {
      "slow-edm": ["C2", "C2", "G2", "G2", "C2", "C2"],
      "pop-edm": ["C2", "G2", "C2", "D2", "E2", "D2", "C2", "G2"],
      "koplo-edm": ["C2", "E2", "F2", "G2", "F2", "E2", "C2", "G2"],
      "rock-edm": ["E2", "G2", "A2", "C3", "A2", "G2", "E2", "G2"]
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
      "rock-edm": ["G4", "A4", "E4", "G4", "A4", "E4", "G4", "A4"]
    };

    function createLyrics(theme, genre) {
      const cleanTheme = theme.trim() || "cerita hati yang penuh warna";
      const genreName = genreInput.options[genreInput.selectedIndex].text;

      return `[Intro]
Di malam sunyi ku mulai bernyanyi
Tentang ${cleanTheme}

[Verse 1]
Langkah kecil membawa rasa
Nada datang bersama cahaya
Aku ikuti suara hati
Menjadi lagu yang tak berhenti

[Pre-Chorus]
Biar waktu terus berputar
Biar mimpi semakin besar
Dalam irama kita menari
Menyatu di dalam harmoni

[Chorus]
Ini lagu ${genreName}
Dari hati untuk dunia
${cleanTheme}
Menjadi nada penuh rasa

[Verse 2]
Lampu kota mulai menyala
Beat berdetak di dalam dada
Setiap kata jadi melodi
Membawa jiwa terbang tinggi

[Bridge]
Jika malam terasa sepi
Biarkan musik menemani
Kita bangkit sekali lagi
Dalam mimpi yang abadi

[Outro]
Nada perlahan mulai menghilang
Namun rasa tetap terkenang
${cleanTheme}
Hidup dalam setiap senandung`;
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

    function midiNoteToFrequency(note) {
      return 440 * Math.pow(2, (note - 69) / 12);
    }

    function playPreview(notes, bassNotes, drumNotes, guitarNotes) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      const audioContext = new AudioCtx();
      const tempo = 0.28;

      // Piano
      notes.forEach((note, index) => {
        const oscillator = audioContext.createOscillator();
        const gain = audioContext.createGain();
        const startTime = audioContext.currentTime + index * tempo;

        oscillator.type = "sine";
        oscillator.frequency.value = midiNoteToFrequency(noteMap[note]);

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
        oscillator.frequency.value = midiNoteToFrequency(noteMap[note]);

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
        oscillator.frequency.value = midiNoteToFrequency(noteMap[note]);

        gain.gain.setValueAtTime(0.08, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + tempo * 0.8);

        oscillator.connect(gain);
        gain.connect(audioContext.destination);

        oscillator.start(startTime);
        oscillator.stop(startTime + tempo * 0.8);
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
        const midiNote = noteMap[note];
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
        const midiNote = noteMap[note];
        if (idx % 3 !== 0) {
          guitarTrack.push(0x00, 0x92, midiNote + 12, 0x48);
          guitarTrack.push(0x30, 0x82, midiNote + 12, 0x40);
        }
      });

      guitarTrack.push(0x00, 0xff, 0x2f, 0x00);

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
        { data: drumTrack, name: "Drum Track" }
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

    generateBtn.addEventListener("click", () => {
      const theme = themeInput.value;
      const genre = genreInput.value;

      const lyrics = createLyrics(theme, genre);
      generatedNotes = createNotesFromLyrics(lyrics, genre);
      generatedBassNotes = createBassNotes(lyrics, genre);
      generatedDrumNotes = createDrumNotes(lyrics, genre);
      generatedGuitarNotes = createGuitarNotes(lyrics, genre);
      midiData = createMidiFile(generatedNotes);

      lyricsOutput.textContent = lyrics;
      notesOutput.textContent = generatedNotes.join(" - ");

      playBtn.disabled = false;
      downloadBtn.disabled = false;
    });

    playBtn.addEventListener("click", () => {
      if (generatedNotes.length > 0) {
        playPreview(generatedNotes, generatedBassNotes, generatedDrumNotes, generatedGuitarNotes);
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
