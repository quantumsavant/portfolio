import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Brain, Play, RotateCcw, ArrowUp, ArrowDown, Check, PartyPopper } from 'lucide-react';

const MIN = 1;
const MAX = 50;

export default function MindReader() {
  const [stage, setStage] = useState('intro'); // intro | guessing | won | cheated
  const [low, setLow] = useState(MIN);
  const [high, setHigh] = useState(MAX);
  const [guess, setGuess] = useState(Math.floor((MIN + MAX) / 2));
  const [tries, setTries] = useState(0);
  const [history, setHistory] = useState([]);

  const start = () => {
    setStage('guessing');
    setLow(MIN);
    setHigh(MAX);
    setGuess(Math.floor((MIN + MAX) / 2));
    setTries(0);
    setHistory([]);
  };

  const answer = (dir) => {
    const nextTries = tries + 1;
    setTries(nextTries);
    setHistory((h) => [...h, guess]);
    if (dir === 'correct') {
      setStage('won');
      return;
    }
    let nl = low, nh = high;
    if (dir === 'higher') nl = guess + 1;
    else nh = guess - 1;
    if (nl > nh) {
      setStage('cheated');
      return;
    }
    setLow(nl);
    setHigh(nh);
    setGuess(Math.floor((nl + nh) / 2));
  };

  return (
    <div className="text-center">
      {stage === 'intro' && (
        <div className="py-6">
          <div className="inline-flex w-20 h-20 rounded-2xl bg-grape border-[3px] border-ink shadow-hard items-center justify-center mb-4 animate-wiggle">
            <Brain size={36} strokeWidth={2.5} />
          </div>
          <p className="font-hand text-3xl font-bold text-inksoft mb-2">think of a number, 1 to 50.</p>
          <p className="font-medium text-inksoft mb-6">Don't tell me. I'll ask a few yes/no-ish questions<br />and read it straight out of your brain.</p>
          <button onClick={start} className="btn-chunky bg-grape text-cream text-lg">
            <Play size={20} strokeWidth={2.75} /> Read my mind
          </button>
        </div>
      )}

      {stage === 'guessing' && (
        <div>
          <p className="font-hand text-3xl font-bold text-inksoft">question #{tries + 1}</p>
          <AnimatePresence mode="wait">
            <motion.div
              key={guess}
              initial={{ scale: 0.7, opacity: 0, rotate: -4 }}
              animate={{ scale: 1, opacity: 1, rotate: 0 }}
              exit={{ scale: 0.7, opacity: 0, rotate: 4 }}
              transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              className="sticker tape tape-mint inline-block px-12 py-8 mt-4 mb-6"
            >
              <p className="font-medium text-inksoft mb-1">Is your number…</p>
              <p className="font-display font-extrabold text-7xl">{guess}</p>
              <p className="font-hand text-2xl text-inksoft mt-1">higher? lower? nailed it?</p>
            </motion.div>
          </AnimatePresence>
          <div className="flex flex-wrap justify-center gap-3">
            <button onClick={() => answer('higher')} className="btn-chunky bg-mint text-[16px]">
              <ArrowUp size={18} strokeWidth={2.75} /> Higher
            </button>
            <button onClick={() => answer('correct')} className="btn-chunky bg-sun text-[16px]">
              <Check size={18} strokeWidth={2.75} /> That's it!
            </button>
            <button onClick={() => answer('lower')} className="btn-chunky bg-sky text-[16px]">
              <ArrowDown size={18} strokeWidth={2.75} /> Lower
            </button>
          </div>
          {history.length > 0 && (
            <p className="mt-5 font-bold text-inksoft text-sm">my guesses so far: {history.join(' → ')}</p>
          )}
        </div>
      )}

      {stage === 'won' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6">
          <PartyPopper size={52} className="mx-auto text-coral mb-3" strokeWidth={2.25} />
          <p className="font-display font-extrabold text-4xl">Got it in {tries + 1} {tries === 0 ? 'try' : 'tries'}!</p>
          <p className="font-hand text-3xl font-bold text-coral mt-2">told you. brains are just slow APIs.</p>
          <button onClick={start} className="btn-chunky bg-grape text-cream text-lg mt-6">
            <RotateCcw size={20} strokeWidth={2.75} /> Fool me again
          </button>
        </motion.div>
      )}

      {stage === 'cheated' && (
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="py-6">
          <p className="font-display font-extrabold text-4xl">Hey!!</p>
          <p className="font-hand text-3xl font-bold text-inksoft mt-2">you changed your number mid-game, didn't you?</p>
          <button onClick={start} className="btn-chunky bg-grape text-cream text-lg mt-6">
            <RotateCcw size={20} strokeWidth={2.75} /> Play fair this time
          </button>
        </motion.div>
      )}
    </div>
  );
}
