/**
 * app.js
 * Pusat Kendali Utama Aplikasi Pembuat Lagu
 * Mengintegrasikan: Genre → AI Engine → Lirik Generator → Riwayat
 * Fitur: Buat, Tampilkan, Putar, Simpan, Kelola Riwayat & Referensi AI
 * Bekerja penuh OFFLINE
 */
"use strict";

window.AppPembuatLagu = {

  // Status aplikasi
  status: {
    sedangMemutar: false,
    laguTerakhir: null,
    pemutarAudio: null
  },

  /**
   * Inisialisasi aplikasi saat halaman dimuat
   */
  inisialisasi: function() {
    console.log("🚀 Memulai Aplikasi Pembuat Lagu...");

    // Cek semua modul yang dibutuhkan
    if (!window.genreData || !window.AIEngine || !window.LirikGenerator || !window.RiwayatLagu) {
      console.error("❌ Modul belum lengkap! Pastikan urutan pemuatan: genre.js → ai-engine-offline.js → lirik.js → riwayat.js → app.js");
      return;
    }

    // Siapkan daftar genre untuk pilihan
    this._muatDaftarGenre();
    console.log("✅ Aplikasi siap digunakan!");
  },

  /**
   * Muat daftar genre ke elemen pilihan
   */
  _muatDaftarGenre: function() {
    const elemenPilihan = document.getElementById("pilihanGenre");
    if (!elemenPilihan) return;

    elemenPilihan.innerHTML = "";
    Object.keys(window.genreData).forEach(kunci => {
      const opsi = document.createElement("option");
      opsi.value = kunci;
      opsi.textContent = window.genreData[kunci].nama || kunci.replace("-", " ").toUpperCase();
      elemenPilihan.appendChild(opsi);
    });
  },

  /**
   * Fungsi utama: Buat lagu baru
   */
  buatLaguBaru: function(tema, genreKey, mood = "") {
    try {
      if (!tema.trim()) throw new Error("Silakan masukkan tema lagu terlebih dahulu!");

      const hasil = AIEngine.buatLagu(tema, genreKey, mood);
      this.status.laguTerakhir = hasil;

      // Tampilkan hasil ke halaman
      this._tampilkanHasil(hasil);

      return { sukses: true, data: hasil };
    } catch (err) {
      console.error("❌ Gagal membuat lagu:", err.message);
      this._tampilkanPesan(err.message, "error");
      return { sukses: false, pesan: err.message };
    }
  },

  /**
   * Simpan lagu terakhir ke riwayat
   */
  simpanLagu: function(catatan = "", jadikanReferensi = false) {
    if (!this.status.laguTerakhir) {
      this._tampilkanPesan("Belum ada lagu yang dibuat untuk disimpan!", "peringatan");
      return false;
    }

    const hasil = AIEngine.simpanKeRiwayat(
      this.status.laguTerakhir,
      catatan,
      jadikanReferensi
    );

    if (hasil.sukses) {
      this._tampilkanPesan(jadikanReferensi 
        ? "✅ Lagu disimpan & ditandai sebagai bahan referensi AI!" 
        : "✅ Lagu berhasil disimpan ke riwayat!", "sukses");
    } else {
      this._tampilkanPesan("❌ Gagal menyimpan lagu", "error");
    }

    return hasil.sukses;
  },

  /**
   * Putar melodi lagu yang sedang aktif
   */
  putarMelodi: function() {
    if (!this.status.laguTerakhir || !this.status.laguTerakhir.melodi) {
      this._tampilkanPesan("Belum ada melodi untuk diputar!", "peringatan");
      return;
    }

    if (this.status.sedangMemutar) {
      this.hentikanPemutaran();
      return;
    }

    this.status.sedangMemutar = true;
    this._tampilkanPesan("🎵 Sedang memutar melodi...", "info");

    // Jika menggunakan Tone.js untuk pemutaran
    if (window.Tone) {
      Tone.start();
      const synth = new Tone.Synth().toDestination();
      const durasi = AIEngine.dapatkanDurasiNada(this.status.laguTerakhir.bpm, "16n") / 1000;

      let waktu = Tone.now();
      this.status.pemutarAudio = synth;

      this.status.laguTerakhir.melodi.forEach(nada => {
        synth.triggerAttackRelease(nada, durasi, waktu);
        waktu += durasi;
      });

      // Tandai selesai
      setTimeout(() => {
        this.status.sedangMemutar = false;
        this._tampilkanPesan("✅ Selesai diputar", "info");
      }, waktu * 1000);

    } else {
      console.warn("ℹ️ Tone.js belum dimuat, hanya urutan nada tersedia.");
      this._tampilkanPesan("ℹ️ Tone.js belum tersedia, tampilkan nada saja: " + this.status.laguTerakhir.melodi.join(" "), "info");
    }
  },

  /**
   * Hentikan pemutaran
   */
  hentikanPemutaran: function() {
    if (this.status.pemutarAudio && this.status.pemutarAudio.dispose) {
      this.status.pemutarAudio.dispose();
    }
    this.status.sedangMemutar = false;
    this._tampilkanPesan("⏹️ Pemutaran dihentikan", "info");
  },

  /**
   * Tampilkan seluruh riwayat lagu
   */
  tampilkanRiwayat: function(hanyaTerbaik = false) {
    let daftar = hanyaTerbaik 
      ? RiwayatLagu.dapatkanUntukPembelajaranAI() 
      : RiwayatLagu.dapatkanSemua();

    const teksTampilan = RiwayatLagu.formatDaftar 
      ? RiwayatLagu.formatDaftar(daftar) 
      : RiwayatLagu.tampilkanRingkasan();

    const elemenRiwayat = document.getElementById("areaRiwayat");
    if (elemenRiwayat) elemenRiwayat.innerHTML = `<pre>${teksTampilan}</pre>`;

    return daftar;
  },

  /**
   * Ekspor data untuk bahan pembelajaran AI Core
   */
  eksporDataAICore: function() {
    const data = RiwayatLagu.eksporDataUntukAICore();
    const teksJSON = JSON.stringify(data, null, 2);

    // Buat unduhan file
    const berkas = new Blob([teksJSON], { type: "application/json" });
    const tautan = document.createElement("a");
    tautan.href = URL.createObjectURL(berkas);
    tautan.download = `data_pembelajaran_ai_${Date.now()}.json`;
    tautan.click();

    this._tampilkanPesan("📂 Data untuk AI berhasil diunduh!", "sukses");
    return data;
  },

  // --- Fungsi Bantuan Internal ---

  _tampilkanHasil: function(dataLagu) {
    const elemenHasil = document.getElementById("areaHasil");
    if (!elemenHasil) return;

    elemenHasil.innerHTML = `
      <div class="kartu-hasil">
        <h3>🎵 Hasil Lagu Dibuat</h3>
        <pre class="lirik-nada">${dataLagu.lirik}</pre>
        <p><strong>Urutan Nada:</strong> ${AIEngine.formatNadaUntukTampilan(dataLagu.melodi)}</p>
        <p><strong>BPM:</strong> ${dataLagu.bpm} | <strong>Suasana:</strong> ${dataLagu.mood}</p>
      </div>
    `;
  },

  _tampilkanPesan: function(teks, jenis = "info") {
    const elemenPesan = document.getElementById("areaPesan");
    if (!elemenPesan) return;

    elemenPesan.textContent = teks;
    elemenPesan.className = `pesan ${jenis}`;
    setTimeout(() => elemenPesan.textContent = "", 5000);
  }

};

// Jalankan inisialisasi setelah halaman siap dimuat
window.addEventListener("load", () => {
  AppPembuatLagu.inisialisasi();
});

console.log("✅ app.js dimuat: Pusat kendali aplikasi siap!");

