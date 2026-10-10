import React, { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, RotateCcw, Timer, Zap, Crown } from 'lucide-react';

const DURATION = 30;
const COLORS = ['#FF6F61', '#53A8FF', '#FFC531', '#34D399', '#A78BFA', '#F9A8D4'];

export default function ReactionRush() {
  const [playing, setPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState(DURATION);
  const [score, setScore] = useState(0);
  const [target, setTarget] = useState(null);
  const [best, setBest] = useState(() => Number(localStorage.getItem('rr-best') || 0));
  const [done, setDone] = useState(false);
  const idRef = useRef(0);

  const spawnTarget = () => {
    setTarget({
      id: ++idRef.current,
      x: 6 + Math.random() * 80,
      y: 8 + Math.random() * 70,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
      size: 52 + Math.random() * 26,
    });
  };

  useEffect(() => {
    if (!playing) return;
    if (timeLeft <= 0) {
      setPlaying(false);
      setDone(true);
      setTarget(null);
      if (score > best) {
        setBest(score);
        localStorage.setItem('rr-best', String(score));
      }
      return;
    }
    const t = setInterval(() => setTimeLeft((s) => s - 1), 1000);
    return () => clearInterval(t);
  }, [playing, timeLeft, score, best]);

  const start = () => {
    setPlaying(true);
    setDone(false);
    setTimeLeft(DURATION);
    setScore(0);
    spawnTarget();
  };

  const hit = () => {
    if (!playing) return;
    setScore((s) => s + 1);
    spawnTarget();
  };

  return (
    <div>
      {!playing && !done && (
        <div className="text-center py-6">
          <p className="font-hand text-3xl font-bold text-inksoft mb-2">how fast are your fingers, really?</p>
          <p className="font-medium text-inksoft mb-6">Tap every target before time runs out. 30 seconds. No mercy.</p>
          <button onClick={start} className="btn-chunky bg-sun text-lg">
            <Play size={20} strokeWidth={2.75} /> Start rush
          </button>
          {best > 0 && (
            <p className="mt-4 font-bold text-inksoft flex items-center justify-center gap-2">
              <Crown size={18} className="text-sun" strokeWidth={2.75} /> Best: {best}
            </p>
          )}
        </div>
      )}

      {(playing || done) && !done && (
        <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
          <div className="sticker-sm px-4 py-1.5 font-bold flex items-center gap-2">
            <Timer size={18} className="text-coral" strokeWidth={2.75} /> {timeLeft}s
          </div>
          <div className="sticker-sm px-4 py-1.5 font-bold flex items-center gap-2">
            <Zap size={18} className="text-sun" strokeWidth={2.75} /> {score} hits
          </div>
          <button onClick={start} className="btn-chunky bg-cream !py-1.5 !px-4 text-[15px]">
            <RotateCcw size={16} strokeWidth={2.75} /> Restart
          </button>
        </div>
      )}

      {playing && (
        <div className="arena-dot relative h-[340px] sticker overflow-hidden bg-bubble/20 cursor-crosshair">
          <AnimatePresence>
            {target && (
              <motion.button
                key={target.id}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ type: 'spring', stiffness: 500, damping: 20 }}
                onClick={hit}
                className="absolute rounded-full border-[3px] border-ink shadow-hard-sm"
                style={{
                  left: `${target.x}%`,
                  top: `${target.y}%`,
                  width: target.size,
                  height: target.size,
                  background: target.color,
                }}
                aria-label="Hit the target"
              >
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="w-1/2 h-1/2 rounded-full bg-cream/90 border-[2.5px] border-ink" />
                </span>
              </motion.button>
            )}
          </AnimatePresence>
        </div>
      )}

      {done && (
        <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-4">
          <p className="font-display font-extrabold text-4xl">You hit {score}!</p>
          <p className="font-hand text-3xl font-bold mt-1 text-coral">
            {score >= 40 ? 'inhuman reflexes. are you a robot?' : score >= 25 ? 'solid! certified tapper.' : 'the targets are judging you. retry?'}
          </p>
          {score >= best && score > 0 && (
            <p className="mt-2 font-bold text-inksoft flex items-center justify-center gap-2">
              <Crown size={18} className="text-sun" strokeWidth={2.75} /> New best!
            </p>
          )}
          <button onClick={start} className="btn-chunky bg-sun text-lg mt-6">
            <RotateCcw size={20} strokeWidth={2.75} /> Go again
          </button>
        </motion.div>
      )}
    </div>
  );
}
