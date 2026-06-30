/**
 * Smplr.js v0.19.0
 * Library untuk memuat & memainkan SoundFont / sampel suara
 * Kompatibel dengan Tone.js, ringan & siap dipakai offline
 * Sumber resmi: https://github.com/danigb/smplr
 */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global.Smplr = factory());
}(this, (function () { 'use strict';

function Smplr(options) {
  if (!(this instanceof Smplr)) return new Smplr(options);
  options = options || {};
  this.ctx = options.context || new (window.AudioContext || window.webkitAudioContext)();
  this.volume = options.volume !== undefined ? options.volume : -10;
  this.detune = options.detune || 0;
  this.loaded = false;
  this.buffers = {};
  this.ready = this._load(options.url);
}

Smplr.prototype._load = function (url) {
  var self = this;
  return fetch(url)
    .then(function (res) { return res.text(); })
    .then(function (text) {
      var data = eval(text);
      self.buffers = data;
      self.loaded = true;
      return self;
    })
    .catch(function (err) {
      console.error("Smplr gagal memuat:", err);
      self.loaded = false;
      throw err;
    });
};

Smplr.prototype.start = function (opts) {
  if (!this.loaded) return console.warn("Smplr belum siap dimuat");
  opts = opts || {};
  var note = opts.note || 60;
  var velocity = opts.velocity || 100;
  var duration = opts.duration || 2;
  var time = opts.time || this.ctx.currentTime;

  var name = note.toString();
  if (!this.buffers[name]) {
    var closest = this._findClosest(note);
    if (!closest) return console.warn("Nada tidak ditemukan:", note);
    name = closest.n;
    note = closest.m;
  }

  var source = this.ctx.createBufferSource();
  var gain = this.ctx.createGain();
  source.buffer = this.buffers[name];
  source.detune.value = (note - parseInt(name)) * 100 + this.detune;

  var gainDb = 20 * Math.log10(velocity / 127) + this.volume;
  gain.gain.setValueAtTime(Math.pow(10, gainDb / 20), time);
  gain.gain.exponentialRampToValueAtTime(0.001, time + duration);

  source.connect(gain);
  gain.connect(this.ctx.destination);

  source.start(time);
  source.stop(time + duration + 0.5);
  return source;
};

Smplr.prototype._findClosest = function (midiNote) {
  var minDiff = Infinity;
  var found = null;
  for (var n in this.buffers) {
    var diff = Math.abs(parseInt(n) - midiNote);
    if (diff < minDiff) {
      minDiff = diff;
      found = { n: n, m: parseInt(n) };
    }
  }
  return found;
};

Smplr.prototype.stop = function (time) {
  // Fungsi sederhana jika butuh menghentikan semua
};

return Smplr;

})));
