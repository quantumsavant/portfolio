import React, { useEffect, useRef, useState } from 'react';

const PADS = [
  { id: 'kick', label: 'Kick', key: 'A', color: '#FF6F61' },
  { id: 'snare', label: 'Snare', key: 'S', color: '#53A8FF' },
  { id: 'hat', label: 'Hi-Hat', key: 'D', color: '#FFC531' },
  { id: 'tom', label: 'Tom', key: 'F', color: '#34D399' },
  { id: 'crash', label: 'Crash', key: 'G', color: '#A78BFA' },
  { id: 'clap', label: 'Clap', key: 'H', color: '#F9A8D4' },
];

export default function DrumKit() {
  const ctxRef = useRef(null);
  const noiseRef = useRef(null);
  const [active, setActive] = useState(null);
  const [started, setStarted] = useState(false);
  const timerRef = useRef(null);

  const ensureCtx = () => {
    if (!ctxRef.current) {
      const AC = window.AudioContext || window.webkitAudioContext;
      if (!AC) return null;
      ctxRef.current = new AC();
      // shared noise buffer
      const len = ctxRef.current.sampleRate * 1;
      const buf = ctxRef.current.createBuffer(1, len, ctxRef.current.sampleRate);
      const data = buf.getChannelData(0);
      for (let i = 0; i < len; i++) data[i] = Math.random() * 2 - 1;
      noiseRef.current = buf;
    }
    const ctx = ctxRef.current;
    if (ctx.state === 'suspended') ctx.resume();
    return ctx;
  };

  const playNoise = (ctx, { dur, filterType, freq, q = 1, gain = 1, when = 0 }) => {
    const t = ctx.currentTime + when;
    const src = ctx.createBufferSource();
    src.buffer = noiseRef.current;
    const f = ctx.createBiquadFilter();
    f.type = filterType;
    f.frequency.value = freq;
    f.Q.value = q;
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    src.connect(f).connect(g).connect(ctx.destination);
    src.start(t);
    src.stop(t + dur + 0.05);
  };

  const playTone = (ctx, { from, to, dur, type = 'sine', gain = 1, when = 0 }) => {
    const t = ctx.currentTime + when;
    const o = ctx.createOscillator();
    o.type = type;
    o.frequency.setValueAtTime(from, t);
    o.frequency.exponentialRampToValueAtTime(Math.max(to, 1), t + dur);
    const g = ctx.createGain();
    g.gain.setValueAtTime(gain, t);
    g.gain.exponentialRampToValueAtTime(0.001, t + dur);
    o.connect(g).connect(ctx.destination);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const sounds = {
    kick(ctx) {
      playTone(ctx, { from: 160, to: 42, dur: 0.28, gain: 1 });
      playTone(ctx, { from: 90, to: 30, dur: 0.2, type: 'triangle', gain: 0.6 });
    },
    snare(ctx) {
      playNoise(ctx, { dur: 0.18, filterType: 'bandpass', freq: 1900, q: 0.8, gain: 0.8 });
      playTone(ctx, { from: 190, to: 120, dur: 0.12, type: 'triangle', gain: 0.5 });
    },
    hat(ctx) {
      playNoise(ctx, { dur: 0.06, filterType: 'highpass', freq: 8000, gain: 0.5 });
    },
    tom(ctx) {
      playTone(ctx, { from: 230, to: 95, dur: 0.24, gain: 0.9 });
    },
    crash(ctx) {
      playNoise(ctx, { dur: 0.9, filterType: 'highpass', freq: 5200, gain: 0.6 });
      playNoise(ctx, { dur: 0.5, filterType: 'bandpass', freq: 9000, q: 2, gain: 0.3 });
    },
    clap(ctx) {
      for (let i = 0; i < 3; i++) {
        playNoise(ctx, { dur: 0.09, filterType: 'bandpass', freq: 1300, q: 1.6, gain: 0.7, when: i * 0.028 });
      }
      playNoise(ctx, { dur: 0.22, filterType: 'bandpass', freq: 1300, q: 1.6, gain: 0.5, when: 0.084 });
    },
  };

  const hit = (id) => {
    const ctx = ensureCtx();
    if (!ctx) return;
    setStarted(true);
    sounds[id]?.(ctx);
    setActive(id);
    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => setActive(null), 130);
  };

  useEffect(() => {
    const onKey = (e) => {
      if (e.repeat) return;
      const k = e.key.toUpperCase();
      const pad = PADS.find((p) => p.key === k);
      if (pad) hit(pad.id);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('keydown', onKey);
      clearTimeout(timerRef.current);
      if (ctxRef.current) ctxRef.current.close().catch(() => {});
      ctxRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <div className="text-center py-2">
        <p className="font-hand text-3xl font-bold text-inksoft mb-1">the newsroom drum circle</p>
        <p className="font-medium text-inksoft mb-5">
          Tap the pads — or smash keys A S D F G H. Real synthesized sound, zero
          audio files.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 max-w-xl mx-auto">
        {PADS.map((p) => (
          <button
            key={p.id}
            onPointerDown={(e) => {
              e.preventDefault();
              hit(p.id);
            }}
            className={`rounded-xl border-[3px] border-ink py-8 sm:py-10 px-2 font-masthead font-black text-2xl transition-transform duration-75 select-none ${
              active === p.id ? 'scale-90 shadow-none translate-y-1' : 'shadow-hard'
            }`}
            style={{
              background: p.color,
              touchAction: 'none',
              WebkitTapHighlightColor: 'transparent',
            }}
            aria-label={`Play ${p.label} drum (keyboard ${p.key})`}
          >
            <span className="block">{p.label}</span>
            <kbd className="mt-2 inline-block text-sm font-body font-bold bg-cream/80 border-2 border-ink rounded-md px-2 py-0.5">
              {p.key}
            </kbd>
          </button>
        ))}
      </div>
      <p className="text-center mt-5 font-medium text-inksoft text-sm">
        {started ? 'now you\u2019re cooking. encore!' : 'go on — hit something.'}
      </p>
    </div>
  );
}
