/**
 * riwayat.js
 * ✅ Simpan Riwayat Lagu + Catatan + Evaluasi
 * ✅ Struktur Data Lengkap untuk Bahan Pembelajaran AI Core
 * ✅ Tersimpan Permanen di Perangkat
 * ✅ Bisa Dipanggil & Diolah Kembali
 */
"use strict";

window.RiwayatLagu = {

  // Kunci penyimpanan utama
  _kunciUtama: "riwayat_lagu_ai_core",

  /**
   * 📥 Ambil semua data dari penyimpanan
   */
  _ambilSemua: function() {
    try {
      const data = localStorage.getItem(this._kunciUtama);
      return data ? JSON.parse(data) : [];
    } catch (err) {
      console.error("❌ Gagal membaca riwayat:", err);
      return [];
    }
  },

  /**
   * 💾 Simpan kembali seluruh data
   */
  _simpanSemua: function(daftar) {
    localStorage.setItem(this._kunciUtama, JSON.stringify(daftar));
  },

  /**
   * 🚀 Fungsi Utama: Simpan lagu lengkap untuk referensi & pembelajaran
   * @param {Object} dataInput - Data hasil pembuatan lagu
   * @param {Object} evaluasi - Penilaian: enak/sumbang/kecepatan, dll
   * @param {String} catatan - Catatan tambahan
   * @param {Boolean} jadikanReferensi - Jika TRUE = masuk daftar bahan belajar AI
   */
  simpan: function(dataInput, evaluasi = {}, catatan = "", jadikanReferensi = false) {
    if (!dataInput || !dataInput.tema || !dataInput.urutanNada) {
      return { sukses: false, pesan: "Data lagu tidak lengkap, tidak bisa disimpan" };
    }

    const daftar = this._ambilSemua();
    const waktuSekarang = new Date();

    // 📋 Struktur data lengkap untuk AI Core
    const entriBaru = {
      // Identitas dasar
      id: Date.now(),
      waktu: waktuSekarang.toLocaleString("id-ID"),
      timestamp: waktuSekarang.getTime(),

      // Data konten lagu
      tema: dataInput.tema,
      genre: dataInput.genre || "umum",
      mood: dataInput.mood || "netral",
      bpm: dataInput.bpm || 100,
      nadaDasar: dataInput.nadaDasar || [],
      urutanNada: dataInput.urutanNada || [],
      polaMelodi: this._deteksiPolaMelodi(dataInput.urutanNada),
      lirik: dataInput.teksTampilan || "",

      // 📊 Hasil penilaian & catatan
      catatanPengguna: catatan.trim(),
      evaluasi: {
        enakDidengar: evaluasi.enakDidengar ?? null,    // 1=sangat, 0=cukup, -1=kurang
        tidakSumbang: evaluasi.tidakSumbang ?? true,
        kecepatanPas: evaluasi.kecepatanPas ?? true,
        cocokGenre: evaluasi.cocokGenre ?? null,
        ...evaluasi
      },

      // 🧠 Tanda khusus untuk bahan pembelajaran AI
      adalahTerbaik: jadikanReferensi,
      untukPembelajaranAI: jadikanReferensi,
      kualitasSkor: jadikanReferensi ? 9 : 5, // Skor acuan 0-10
    };

    daftar.unshift(entriBaru);
    this._simpanSemua(daftar);

    return {
      sukses: true,
      id: entriBaru.id,
      pesan: jadikanReferensi 
        ? "✅ Disimpan + ditandai sebagai bahan referensi AI" 
        : "✅ Disimpan ke riwayat biasa"
    };
  },

  /**
   * 🔍 Analisis pola melodi sederhana untuk bahan belajar AI
   */
  _deteksiPolaMelodi: function(daftarNada) {
    if (!daftarNada || daftarNada.length < 2) return "terlalu pendek";

    const arah = [];
    for (let i = 1; i < daftarNada.length; i++) {
      const posSebelum = Tone.Frequency(daftarNada[i-1]).toMidi();
      const posSekarang = Tone.Frequency(daftarNada[i]).toMidi();

      if (posSekarang > posSebelum) arah.push("naik");
      else if (posSekarang < posSebelum) arah.push("turun");
      else arah.push("tetap");
    }

    return arah.join(", ");
  },

  /**
   * ⭐ Tandai lagu sebagai PALING BAGUS & BAHAN BELAJAR AI
   */
  tandaiSebagaiReferensi: function(id, status = true) {
    const daftar = this._ambilSemua();
    const ditemukan = daftar.find(item => item.id === parseInt(id));

    if (ditemukan) {
      ditemukan.adalahTerbaik = status;
      ditemukan.untukPembelajaranAI = status;
      ditemukan.kualitasSkor = status ? 9 : 5;
      this._simpanSemua(daftar);
      return { sukses: true, pesan: status ? "✅ Ditandai sebagai referensi AI" : "✅ Dihapus dari daftar referensi" };
    }
    return { sukses: false, pesan: "Data tidak ditemukan" };
  },

  /**
   * 📋 Ambil SEMUA riwayat
   */
  dapatkanSemua: function() {
    return this._ambilSemua();
  },

  /**
   * 🏆 Ambil HANYA data yang ditandai sebagai PALING BAGUS / Referensi AI
   */
  dapatkanUntukPembelajaranAI: function() {
    return this._ambilSemua().filter(item => item.untukPembelajaranAI === true);
  },

  /**
   * 📚 Ekspor semua data ke format JSON siap untuk dilatih AI Core
   */
  eksporDataUntukAICore: function() {
    const dataMentah = this._ambilSemua();
    const dataSiapBelajar = dataMentah.map(item => ({
      genre: item.genre,
      mood: item.mood,
      nadaDasar: item.nadaDasar,
      urutanNada: item.urutanNada,
      polaMelodi: item.polaMelodi,
      bpm: item.bpm,
      kualitasSkor: item.kualitasSkor,
      catatan: item.catatanPengguna,
      cocokSebagaiContoh: item.untukPembelajaranAI
    }));

    return {
      jumlahTotal: dataSiapBelajar.length,
      jumlahReferensi: dataSiapBelajar.filter(d => d.cocokSebagaiContoh).length,
      data: dataSiapBelajar
    };
  },

  /**
   * ✏️ Perbarui catatan & evaluasi
   */
  perbaruiEvaluasi: function(id, catatanBaru, evaluasiBaru = {}) {
    const daftar = this._ambilSemua();
    const ditemukan = daftar.find(item => item.id === parseInt(id));
    if (ditemukan) {
      ditemukan.catatanPengguna = catatanBaru.trim();
      ditemukan.evaluasi = { ...ditemukan.evaluasi, ...evaluasiBaru };
      this._simpanSemua(daftar);
      return { sukses: true, pesan: "✅ Evaluasi diperbarui" };
    }
    return { sukses: false, pesan: "❌ Tidak ditemukan" };
  },

  /**
   * 📄 Tampilkan ringkasan untuk pengguna
   */
  tampilkanRingkasan: function() {
    const daftar = this._ambilSemua();
    if (daftar.length === 0) return "📂 Belum ada riwayat lagu.";

    return daftar.map(item => {
      const tanda = item.untukPembelajaranAI ? "⭐ PALING BAGUS | REFERENSI AI" : "📝 Riwayat";
      const skor = item.kualitasSkor ? ` | Skor: ${item.kualitasSkor}/10` : "";
      const cat = item.catatanPengguna ? ` | Catatan: ${item.catatanPengguna}` : "";

      return `
${tanda}
Waktu   : ${item.waktu}
Tema    : ${item.tema}
Genre   : ${item.genre}${skor}${cat}
ID      : ${item.id}
──────────────────────────────────`;
    }).join("\n");
  },

  /**
   * 🗑️ Hapus data
   */
  hapus: function(id) {
    const baru = this._ambilSemua().filter(item => item.id !== parseInt(id));
    this._simpanSemua(baru);
    return { sukses: true };
  },

  hapusSemua: function() {
    this._simpanSemua([]);
    return { sukses: true };
  }

};

console.log("✅ riwayat.js siap: Riwayat + Catatan + Struktur Data UNTUK PEMBELAJARAN AI CORE");

