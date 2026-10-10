import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Timer, Trophy, Sparkles } from 'lucide-react';

const TYPES = [
  { name: 'Blobby', color: '#FF6F61', points: 10, rarity: 'common', shape: 'rounded-full' },
  { name: 'Sprouty', color: '#34D399', points: 10, rarity: 'common', shape: 'rounded-[40%]' },
  { name: 'Droppy', color: '#53A8FF', points: 15, rarity: 'common', shape: 'rounded-full' },
  { name: 'Puffball', color: '#A78BFA', points: 20, rarity: 'rare', shape: 'rounded-[30%]' },
  { name: 'Zapper', color: '#F9A8D4', points: 20, rarity: 'rare', shape: 'rounded-full' },
  { name: 'Goldie', color: '#FFC531', points: 50, rarity: 'LEGENDARY', shape: 'rounded-[35%]' },
];

const DURATION = 45;

function CritterFace({ type }) {
  return (
    <div
      className={`relative border-[3px] border-ink shadow-hard-sm ${type.shape}`}
      style={{ width: 64, height: 64, background: type.color }}
    >
      {/* eyes */}
      <div className="absolute top-[18px] left-[14px] w-3.5 h-4.5 bg-ink rounded-full" style={{ height: 18 }} />
      <div className="absolute top-[18px] right-[14px] w-3.5 bg-ink rounded-full" style={{ height: 18 }} />
      <div className="absolute top-[22px] left-[17px] w-1.5 h-1.5 bg-white rounded-full" />
      <div className="absolute top-[22px] right-[17px] w-1.5 h-1.5 bg-white rounded-full" />
      {/* mouth */}
      <div className="absolute bottom-[12px] left-1/2 -translate-x-1/2 w-6 h-3 border-b-[3px] border-ink rounded-b-full" />
      {type.rarity === 'LEGENDARY' && (
        <Sparkles size={18} className="absolute -top-3 -right-3 text-sun fill-sun" strokeWidth={2} />
      )}
    </div>
  );
}

let idc = 0;

export default function CritterCatch() {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [critters, setCritters] = useState([]);
  const [caught, setCaught] = useState([]);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);
  const arenaRef = useRef(null);

  const spawn = () => {
    setCritters((prev) => {
      if (prev.length >= 4) return prev;
      const roll = Math.random();
      const type = roll < 0.06 ? TYPES[5] : roll < 0.3 ? TYPES[Math.floor(Math.random() * 2) + 3] : TYPES[Math.floor(Math.random() * 3)];
      return [...prev, { id: ++idc, type, x: 8 + Math.random() * 78, y: 10 + Math.random() * 68 }];
    });
  };

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) {
      setPlaying(false);
      setDone(true);
      setCritters([]);
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [playing, timeLeft]);

  useEffect(() => {
    if (!playing) return;
    spawn();
    const s = setInterval(spawn, 1100);
    return () => clearInterval(s);
  }, [playing]);

  const start = () => {
    setPlaying(true);
    setDone(false);
    setTimeLeft(DURATION);
    setCritters([]);
    setCaught([]);
    setScore(0);
  };

  const catchCritter = (id) => {
    setCritters((prev) => {
      const c = prev.find((x) => x.id === id);
      if (c) {
        setCaught((cc) => [...cc, c.type]);
        setScore((s) => s + c.type.points);
      }
      return prev.filter((x) => x.id !== id);
    });
  };

  const dex = TYPES.map((t) => ({ ...t, count: caught.filter((c) => c.name === t.name).length }));

  return (
    <div>
      {!playing && !done && (
        <div className="text-center py-6">
          <p className="font-hand text-3xl font-bold text-inksoft mb-2">they're hiding in the meadow…</p>
          <p className="font-medium text-inksoft mb-6">Tap critters to catch them. Goldie is worth 50!</p>
          <button onClick={start} className="btn-chunky bg-coral text-cream text-lg">
            <Play size={20} strokeWidth={2.75} /> Start catching
          </button>
        </div>
      )}

      {(playing || done) && (
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="sticker-sm px-4 py-1.5 font-bold flex items-center gap-2">
            <Timer size={18} className="text-coral" strokeWidth={2.75} /> {timeLeft}s
          </div>
          <div className="sticker-sm px-4 py-1.5 font-bold flex items-center gap-2">
            <Trophy size={18} className="text-sun" strokeWidth={2.75} /> {score} pts
          </div>
          <button onClick={start} className="btn-chunky bg-cream !py-1.5 !px-4 text-[15px]">
            <RotateCcw size={16} strokeWidth={2.75} /> Restart
          </button>
        </div>
      )}

      {playing && (
        <div ref={arenaRef} className="arena-dot relative h-[340px] sticker overflow-hidden bg-mint/20">
          <AnimatePresence>
            {critters.map((c) => (
              <motion.button
                key={c.id}
                initial={{ scale: 0, rotate: -20 }}
                animate={{ scale: 1, rotate: 0 }}
                exit={{ scale: 0, rotate: 20 }}
                transition={{ type: 'spring', stiffness: 400, damping: 18 }}
                onClick={() => catchCritter(c.id)}
                className="absolute cursor-pointer animate-wiggle"
                style={{ left: `${c.x}%`, top: `${c.y}%` }}
                aria-label={`Catch ${c.type.name}`}
              >
                <CritterFace type={c.type} />
              </motion.button>
            ))}
          </AnimatePresence>
          {critters.length === 0 && (
            <p className="absolute inset-0 flex items-center justify-center font-hand text-3xl text-inksoft">wait for it…</p>
          )}
        </div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
          <p className="font-display font-extrabold text-4xl">Time's up!</p>
          <p className="font-hand text-3xl text-coral font-bold mt-1">you scored {score} points</p>
          <div className="mt-6">
            <p className="font-bold text-lg mb-3">Your Critterdex</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {dex.map((t) => (
                <div key={t.name} className={`sticker-sm p-3 ${t.count === 0 ? 'opacity-40 grayscale' : ''}`}>
                  <div className="flex justify-center mb-2 scale-90"><CritterFace type={t} /></div>
                  <p className="font-bold">{t.name}</p>
                  <p className="text-xs font-bold text-inksoft">{t.rarity} · ×{t.count}</p>
                </div>
              ))}
            </div>
          </div>
          <button onClick={start} className="btn-chunky bg-coral text-cream text-lg mt-6">
            <RotateCcw size={20} strokeWidth={2.75} /> Play again
          </button>
        </motion.div>
      )}
    </div>
  );
}
