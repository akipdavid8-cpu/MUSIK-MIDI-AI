/**
 * lirik.js
 * ✅ 3-4 Nada per Bait | Melodi Mengalir | Format Rapi
 * Genre + Mood + Lirik + Nada
 * Bekerja penuh OFFLINE
 */
"use strict";

window.LirikGenerator = {

  // 🎹 NADA DASAR: 3-4 nada per genre (tidak sumbang, cocok)
  gayaPerGenre: {
    "pop":          { nada: ["C4", "F4", "G4", "A4"] },
    "pop-ballad":   { nada: ["F3", "Bb3", "C4", "F4"] },
    "soft-pop":     { nada: ["C4", "D4", "F4", "G4"] },
    "dangdut":      { nada: ["D4", "F#4", "G4", "A4"] },
    "koplo":        { nada: ["C4", "E4", "F4", "G4"] },
    "orkes-melayu": { nada: ["E4", "A4", "B4", "C#5"] },
    "rock":         { nada: ["E3", "G3", "A3", "D4"] },
    "jazz":         { nada: ["C4", "Eb4", "F4", "Bb4"] },
    "reggae":       { nada: ["G3", "C4", "D4", "E4"] },
    "folk":         { nada: ["C4", "D4", "G4", "A4"] },
    "default":      { nada: ["C4", "D4", "F4", "G4"] }
  },

  // 🎭 Bait & Reff per suasana
  gayaMood: {
    "romantis": {
      bait: [
        "hari ini aku jatuh cinta",
        "rasa ini hadir begitu saja",
        "sejak pertama kali bertemu",
        "hatiku hanya untukmu saja"
      ],
      reff: [
        "kau bawa bahagia di hidupku",
        "jadikan mimpi jadi nyata",
        "takkan ada yang bisa gantikan",
        "cintaku abadi selamanya"
      ]
    },
    "ceria": {
      bait: [
        "hari ini terasa begitu indah",
        "senyum mengembang di setiap wajah",
        "semua terasa ringan menyenangkan",
        "bahagia takkan pernah berakhir"
      ],
      reff: [
        "rasakan sukacita di dalam hati",
        "semangat melangkah ke depan hari",
        "dunia terasa ceria penuh warna",
        "nikmati indahnya waktu bersama"
      ]
    },
    "semangat": {
      bait: [
        "kobarkan api semangat di dada",
        "hadapi tantangan dengan kepala tegak",
        "jangan lelah menggapai mimpi tinggi",
        "percaya diri pasti bisa meraihnya"
      ],
      reff: [
        "terbanglah tinggi melampaui awan",
        "gapai bintang meski terasa jauh",
        "semangat adalah kekuatan sejati",
        "masa depan cerah menantimu nanti"
      ]
    },
    "melankolis": {
      bait: [
        "senja perlahan tenggelam di barat",
        "bawa kenangan yang terasa dekat",
        "rindu terasa menyelimuti jiwa",
        "menanti kabar dari tempat jauh"
      ],
      reff: [
        "walau terpisah jarak dan waktu",
        "kenangan tetap hidup di hati",
        "semoga takdir mempertemukan lagi",
        "lanjutkan kisah cinta kita berdua"
      ]
    },
    "damai": {
      bait: [
        "angin berhembus lembut di pagi",
        "menyejukkan hati dan ketenangan",
        "lupakan segala beban dan resah",
        "hidup terasa indah bersyukur"
      ],
      reff: [
        "damai hati adalah harta berharga",
        "mengalir tenang bagai air sungai",
        "semoga selalu menyertai langkahmu",
        "sepanjang perjalanan hidup ini"
      ]
    },
    "default": {
      bait: [
        "setiap hari adalah anugerah hidup",
        "mengalir membentuk cerita perjalanan",
        "ada pelajaran di setiap kejadian",
        "membuat diri menjadi lebih baik lagi"
      ],
      reff: [
        "inilah lagu tercipta dari hati",
        "bawa pesan semangat dan harapan",
        "semoga memberi makna ketenangan",
        "mengiringi langkahmu selamanya"
      ]
    }
  },

  // 🧠 Tentukan jenis mood dari teks
  _ambilJenisMood: function(teks) {
    teks = teks.toLowerCase();
    if (teks.includes("cinta") || teks.includes("rindu") || teks.includes("sayang")) return "romantis";
    if (teks.includes("ceria") || teks.includes("gembira") || teks.includes("bahagia")) return "ceria";
    if (teks.includes("semangat") || teks.includes("juang") || teks.includes("mimpi")) return "semangat";
    if (teks.includes("senja") || teks.includes("kenangan") || teks.includes("duka")) return "melankolis";
    if (teks.includes("damai") || teks.includes("tenang") || teks.includes("syukur")) return "damai";
    return "default";
  },

  // 🎵 Pola melodi agar mengalir enak (tetap pakai nada yang sama)
  _pilihNada: function(posisi, skala) {
    const pola = [0, 1, 2, 3, 2, 1, 0, 2, 3, 1]; // Pola naik-turun
    const indeks = pola[posisi % pola.length];
    return skala[indeks];
  },

  // 🔗 Pasangkan nada ke setiap huruf
  _pasangNadaPerHuruf: function(teks, skalaNada) {
    const hasil = [];
    let posisi = 0;

    for (const karakter of teks) {
      if (karakter.trim() === "") {
        hasil.push({ huruf: " ", nada: "" });
      } else {
        const nada = this._pilihNada(posisi, skalaNada);
        hasil.push({ huruf: karakter, nada: nada });
        posisi++;
      }
    }
    return hasil;
  },

  // 📝 Format tampilan: Nada di atas huruf, rapi
  _formatBaris: function(data) {
    let barisNada = "";
    let barisTeks = "";

    data.forEach(item => {
      if (item.nada) {
        barisNada += item.nada.padEnd(4, " ");
        barisTeks += item.huruf.padEnd(4, " ");
      } else {
        barisNada += "    ";
        barisTeks += "    ";
      }
    });

    return `${barisNada.trimEnd()}\n${barisTeks.trimEnd()}`;
  },

  // 📚 Susun satu bagian bait atau reff
  _susunBagian: function(judul, daftarKalimat, nadaDasar) {
    let teks = `=== ${judul} ===\n`;
    daftarKalimat.forEach(kalimat => {
      const pasangan = this._pasangNadaPerHuruf(kalimat, nadaDasar);
      teks += this._formatBaris(pasangan) + "\n\n";
    });
    return teks;
  },

  // 📋 Kumpulkan semua nada untuk diputar & MIDI
  _kumpulkanSemuaNada: function(daftarKalimat, nadaDasar) {
    let daftar = [];
    daftarKalimat.forEach(kalimat => {
      const pasangan = this._pasangNadaPerHuruf(kalimat, nadaDasar);
      daftar = daftar.concat(pasangan.filter(x => x.nada).map(x => x.nada));
    });
    return daftar;
  },

  // 🚀 Fungsi utama dipanggil dari mesin AI
  buatLirik: function(tema, mood, genreKey) {
    tema = tema.trim() || "kehidupan";

    // Ambil data yang sesuai
    const dataGenre = this.gayaPerGenre[genreKey] || this.gayaPerGenre.default;
    const nadaDasar = dataGenre.nada;
    const jenisMood = this._ambilJenisMood(tema + " " + mood);
    const dataMood = this.gayaMood[jenisMood];

    // Susun tampilan lengkap
    const teksTampilan = `🎵 LIRIK + NADA 🎵
Tema      : ${tema}
Genre     : ${genreKey.replace("-", " ").toUpperCase()}
Suasana   : ${jenisMood}
Nada Dasar: ${nadaDasar.join(", ")}

──────────────────────────────────
${this._susunBagian("BAIT 1", dataMood.bait, nadaDasar)}
${this._susunBagian("REFF", dataMood.reff, nadaDasar)}
──────────────────────────────────`;

    // Urutan nada siap diputar
    const urutanNada = [
      ...this._kumpulkanSemuaNada(dataMood.bait, nadaDasar),
      ...this._kumpulkanSemuaNada(dataMood.reff, nadaDasar)
    ];

    return {
      teksTampilan: teksTampilan,
      urutanNada: urutanNada
    };
  }

};

console.log("✅ lirik.js RAPI: 3-4 nada | Melodi mengalir | Siap pakai!");

