/**
 * ai-engine-offline.js
 * Mesin logika pembuat melodi & kerangka lirik
 * Diperbarui: Terintegrasi Lirik + Nada + Riwayat AI
 * Bekerja penuh OFFLINE
 */
"use strict";

window.AIEngine = {

  /**
   * Hasilkan data lagu lengkap berdasarkan tema, mood & genre
   * @param {string} tema - Tema/isi lagu
   * @param {string} genreKey - Kunci genre yang dipilih
   * @param {string} mood - Suasana lagu (opsional)
   * @returns {Object} Objek lengkap siap tampil, putar & simpan
   */
  buatLagu: function(tema, genreKey, mood = "") {
    // Validasi data genre
    if (!window.genreData || !window.genreData[genreKey]) {
      throw new Error("❌ Genre tidak ditemukan: " + genreKey);
    }
    if (!window.LirikGenerator) {
      throw new Error("❌ Modul LirikGenerator belum dimuat!");
    }

    const dataGenre = window.genreData[genreKey];
    const bpm = dataGenre.bpm || 100;
    const moodAkhir = mood || dataGenre.mood || "netral";

    // 1. Buat lirik + nada lengkap dari generator
    const hasilLirik = LirikGenerator.buatLirik(tema, moodAkhir, genreKey);

    // 2. Variasi kecil pada melodi agar lebih hidup
    const melodiAkhir = this._variasiMelodi(hasilLirik.urutanNada);

    // 3. Susun data lengkap terstruktur
    const dataLaguLengkap = {
      tema: tema.trim(),
      genre: genreKey,
      namaGenre: genreKey.replace("-", " ").toUpperCase(),
      bpm: bpm,
      mood: moodAkhir,
      nadaDasar: dataGenre.notes || [],
      melodi: melodiAkhir,
      urutanNadaAsli: hasilLirik.urutanNada,
      lirik: hasilLirik.teksTampilan,
      durasiPerNada: this.dapatkanDurasiNada(bpm),
      timestamp: Date.now()
    };

    return dataLaguLengkap;
  },

  /**
   * Buat variasi melodi agar lebih hidup & mengalir
   * @private
   */
  _variasiMelodi: function(daftarNada) {
    if (!daftarNada || daftarNada.length === 0) return [];

    let hasil = [...daftarNada];

    // Variasi oktaf secara halus saja
    const acak = Math.random();
    if (acak > 0.85) {
      hasil = hasil.map(nada => nada.replace(/\d/, num => Math.min(6, Number(num) + 1).toString()));
    } else if (acak < 0.15) {
      hasil = hasil.map(nada => nada.replace(/\d/, num => Math.max(3, Number(num) - 1).toString()));
    }

    return hasil;
  },

  /**
   * Konversi nada ke format mudah dibaca
   */
  formatNadaUntukTampilan: function(daftarNada) {
    if (!daftarNada || daftarNada.length === 0) return "Belum ada nada";
    return daftarNada.join(" • ");
  },

  /**
   * Hitung durasi nada dalam milidetik berdasarkan BPM
   */
  dapatkanDurasiNada: function(bpm, jenis = "16n") {
    const ketukanPerMenit = bpm;
    const durasiKetukan = 60000 / ketukanPerMenit;

    switch(jenis) {
      case "4n": return durasiKetukan;
      case "8n": return durasiKetukan / 2;
      case "16n": return durasiKetukan / 4;
      default: return durasiKetukan / 4;
    }
  },

  /**
   * Simpan hasil langsung ke riwayat (siap untuk catatan & AI Core)
   */
  simpanKeRiwayat: function(dataLagu, catatan = "", jadikanReferensi = false) {
    if (!window.RiwayatLagu) {
      console.warn("⚠️ RiwayatLagu belum tersedia, data tidak disimpan");
      return false;
    }

    return RiwayatLagu.simpan(
      dataLagu,
      {
        enakDidengar: null,
        cocokGenre: true,
        variasiMelodi: "standar"
      },
      catatan,
      jadikanReferensi
    );
  }

};

console.log("✅ ai-engine-offline.js DIPERBARUI: Terhubung Lirik + Nada + Riwayat AI");
