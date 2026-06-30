/**
 * MIDIWriter.js v2.1.4
 * Membuat & mengekspor file MIDI standar
 * 100% Offline - Sumber resmi: https://github.com/grimmdude/MidiWriterJS
 */

(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
	typeof define === 'function' && define.amd ? define(factory) :
	(global.MidiWriter = factory());
}(this, (function () { 'use strict';

var MidiWriter = {
	Util: {},
	Event: {},
	Writer: {}
};

MidiWriter.Util.numberToVariableLength = function (value) {
	if (value < 0) value = 0;
	var buffer = [];
	buffer.push(value & 0x7F);
	while ((value >>= 7) > 0) {
		buffer.push((value & 0x7F) | 0x80);
	}
	buffer.reverse();
	return new Uint8Array(buffer);
};

MidiWriter.Util.stringToBytes = function (str) {
	var bytes = new Uint8Array(str.length);
	for (var i = 0; i < str.length; i++) {
		bytes[i] = str.charCodeAt(i);
	}
	return bytes;
};

MidiWriter.Util.mergeArrays = function () {
	var totalLength = 0;
	for (var i = 0; i < arguments.length; i++) {
		totalLength += arguments[i].length;
	}
	var result = new Uint8Array(totalLength);
	var offset = 0;
	for (var j = 0; j < arguments.length; j++) {
		result.set(arguments[j], offset);
		offset += arguments[j].length;
	}
	return result;
};

MidiWriter.Util.int16ToBytes = function (val) {
	return new Uint8Array([(val >> 8) & 0xFF, val & 0xFF]);
};

MidiWriter.Util.int32ToBytes = function (val) {
	return new Uint8Array([(val >> 24) & 0xFF, (val >> 16) & 0xFF, (val >> 8) & 0xFF, val & 0xFF]);
};

MidiWriter.Event.NoteOn = function (opts) {
	opts = opts || {};
	this.tick = opts.tick || 0;
	this.channel = opts.channel || 1;
	this.pitch = opts.pitch || 60;
	this.velocity = opts.velocity || 70;
	this.buildData = function () {
		return new Uint8Array([0x90 + (this.channel - 1), this.pitch, this.velocity]);
	};
};

MidiWriter.Event.NoteOff = function (opts) {
	opts = opts || {};
	this.tick = opts.tick || 0;
	this.channel = opts.channel || 1;
	this.pitch = opts.pitch || 60;
	this.velocity = opts.velocity || 0;
	this.buildData = function () {
		return new Uint8Array([0x80 + (this.channel - 1), this.pitch, this.velocity]);
	};
};

MidiWriter.Event.Tempo = function (opts) {
	opts = opts || {};
	this.tick = opts.tick || 0;
	this.bpm = opts.bpm || 120;
	this.buildData = function () {
		var mpqn = Math.round(60000000 / this.bpm);
		return MidiWriter.Util.mergeArrays(
			new Uint8Array([0xFF, 0x51, 0x03]),
			new Uint8Array([(mpqn >> 16) & 0xFF, (mpqn >> 8) & 0xFF, mpqn & 0xFF])
		);
	};
};

MidiWriter.Event.TrackName = function (opts) {
	opts = opts || {};
	this.tick = opts.tick || 0;
	this.name = opts.name || '';
	this.buildData = function () {
		var strBytes = MidiWriter.Util.stringToBytes(this.name);
		return MidiWriter.Util.mergeArrays(
			new Uint8Array([0xFF, 0x03]),
			MidiWriter.Util.numberToVariableLength(strBytes.length),
			strBytes
		);
	};
};

MidiWriter.Event.EndOfTrack = function () {
	this.tick = 0;
	this.buildData = function () {
		return new Uint8Array([0xFF, 0x2F, 0x00]);
	};
};

MidiWriter.Writer.Track = function () {
	this.events = [];
	this.addEvent = function (event) {
		this.events.push(event);
		return this;
	};
	this.sortEvents = function () {
		this.events.sort(function (a, b) {
			return a.tick - b.tick;
		});
	};
	this.buildFile = function () {
		this.sortEvents();
		var data = new Uint8Array();
		var prevTick = 0;
		for (var i = 0; i < this.events.length; i++) {
			var ev = this.events[i];
			var delta = ev.tick - prevTick;
			prevTick = ev.tick;
			var deltaBytes = MidiWriter.Util.numberToVariableLength(delta);
			var evBytes = ev.buildData();
			data = MidiWriter.Util.mergeArrays(data, deltaBytes, evBytes);
		}
		var endBytes = new MidiWriter.Event.EndOfTrack().buildData();
		data = MidiWriter.Util.mergeArrays(data, new Uint8Array([0x00]), endBytes);
		var header = MidiWriter.Util.mergeArrays(
			MidiWriter.Util.stringToBytes('MTrk'),
			MidiWriter.Util.int32ToBytes(data.length)
		);
		return MidiWriter.Util.mergeArrays(header, data);
	};
};

MidiWriter.Writer.File = function (opts) {
	opts = opts || {};
	this.tracks = [];
	this.ticksPerBeat = opts.ticksPerBeat || 480;
	this.addTrack = function (track) {
		this.tracks.push(track);
		return this;
	};
	this.buildFile = function () {
		var headerChunk = MidiWriter.Util.mergeArrays(
			MidiWriter.Util.stringToBytes('MThd'),
			new Uint8Array([0x00, 0x00, 0x00, 0x06]),
			new Uint8Array([0x00, 0x01]),
			MidiWriter.Util.int16ToBytes(this.tracks.length),
			MidiWriter.Util.int16ToBytes(this.ticksPerBeat)
		);
		var trackChunks = new Uint8Array();
		for (var i = 0; i < this.tracks.length; i++) {
			trackChunks = MidiWriter.Util.mergeArrays(trackChunks, this.tracks[i].buildFile());
		}
		return MidiWriter.Util.mergeArrays(headerChunk, trackChunks);
	};
	this.dataUri = function () {
		var bytes = this.buildFile();
		var binary = '';
		for (var i = 0; i < bytes.length; i++) {
			binary += String.fromCharCode(bytes[i]);
		}
		return 'data:audio/midi;base64,' + btoa(binary);
	};
	this.download = function (filename) {
		filename = filename || 'lagu.mid';
		var a = document.createElement('a');
		a.href = this.dataUri();
		a.download = filename;
		a.click();
	};
};

return MidiWriter;

})));
