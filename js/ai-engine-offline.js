/**
 * ai-engine-offline.js
 * Mesin logika pembuat melodi & kerangka lirik
 * Bekerja penuh OFFLINE, terintegrasi dengan genre.js
 */
"use strict";

window.AIEngine = {

  /**
   * Hasilkan data lagu lengkap berdasarkan tema & genre
   * @param {string} tema - Tema/isi lagu
   * @param {string} genreKey - Kunci genre yang dipilih
   * @returns {Object} Objek berisi lirik, nada, bpm, mood
   */
  buatLagu: function(tema, genreKey) {
    // Validasi data genre
    if (!window.genreData || !window.genreData[genreKey]) {
      throw new Error("Genre tidak ditemukan: " + genreKey);
    }

    const dataGenre = window.genreData[genreKey];
    const nadaDasar = dataGenre.notes;
    const bpm = dataGenre.bpm;
    const mood = dataGenre.mood;

    // 1. Hasilkan variasi melodi dari pola dasar
    const melodi = this._variasiMelodi(nadaDasar);

    // 2. Buat kerangka lirik yang cocok dengan tema & suasana
    const lirik = this._buatKerangkaLirik(tema, mood, genreKey);

    return {
      tema: tema,
      genre: genreKey,
      bpm: bpm,
      mood: mood,
      melodi: melodi,
      nadaAsli: nadaDasar
    };
  },

  /**
   * Buat variasi melodi agar tidak terasa sama terus
   * @private
   */
  _variasiMelodi: function(polaNada) {
    let hasil = [...polaNada];

    // Sedikit variasi naik/turun oktaf agar lebih hidup
    const acak = Math.random();
    if (acak > 0.7) {
      hasil = hasil.map(nada => nada.replace(/\d/, num => Math.min(14, Number(num) + 1).toString()));
    } else if (acak < 0.3) {
      hasil = hasil.map(nada => nada.replace(/\d/, num => Math.max(4, Number(num) - 1).toString()));
    }

    // Ulangi pola agar cukup panjang untuk satu bait
    return [...hasil, ...hasil, ...hasil.slice(0, 4)];
  },

  /**
   * Buat kerangka lirik sederhana sesuai tema dan suasana
   * @private
   */
  _buatKerangkaLirik: function(tema, mood, genre) {
    const bait = [];
    const temaBersih = tema.trim() || "perjalanan hidup";

    bait.push(`🎵 Tema: ${temaBersih}`);
    bait.push(`💭 Suasana: ${mood}`);
    bait.push(`🎼 Aliran: ${genre.replace("-", " ")}`);
    bait.push("");

    // Struktur standar lagu
    bait.push("=== Bait 1 ===");
    bait.push(`Di sini terukir kisah ${temaBersih.toLowerCase()},`);
    bait.push(`Mengalir lembut membawa rasa yang tulus,`);
    bait.push(`Melangkah bersama irama yang tercipta,`);
    bait.push(`Menggambarkan hati yang penuh makna.`);
    bait.push("");

    bait.push("=== Reff ===");
    bait.push(`Oh ${temaBersih}, tetaplah bersinar,`);
    bait.push(`Sebagai cahaya yang tak pernah padam,`);
    bait.push(`Dalam setiap irama dan nada yang tercipta,`);
    bait.push(`Terukir indah kenangan abadi selamanya.`);
    bait.push("");

    bait.push("=== Bait 2 ===");
    bait.push(`Lewat suka duka perjalanan yang ditempuh,`);
    bait.push(`Semakin menguatkan rasa yang ada di jiwa,`);
    bait.push(`Semoga kisah ini menjadi pelajaran hidup,`);
    bait.push(`Membawa kedamaian bagi yang mendengarnya.`);

    return bait.join("\n");
  },

  /**
   * Konversi daftar nada ke format mudah dibaca & diputar
   */
  formatNadaUntukTampilan: function(daftarNada) {
    return daftarNada.join("  -  ");
  },

  /**
   * Dapatkan durasi per nada berdasarkan BPM
   */
  dapatkanDurasiNada: function(bpm) {
    return 60 / bpm * 1000; // dalam milidetik
  }

};

console.log("✅ ai-engine-offline.js dimuat: Mesin pembuat lagu siap digunakan.");

