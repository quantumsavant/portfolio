import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { HelpCircle, Flame, Shuffle, RotateCcw } from 'lucide-react';

const TRUTHS = [
  'What is the weirdest bug you ever shipped to production?',
  'Which programming language would you delete from existence, and why?',
  'What is a tech opinion you hold that most developers disagree with?',
  'Have you ever Googled something embarrassingly basic at work?',
  'What is the longest you have stared at code before realizing the bug was a typo?',
  'Which app on your phone are you slightly addicted to?',
  'What is one skill totally unrelated to coding that you are secretly proud of?',
  'Have you ever pretended to understand a standup update? Be honest.',
  'What is the most overrated tech trend right now?',
  'If your code had a smell, what would it be?',
  'What is the funniest variable name you have ever used?',
  'Which fictional character would make the worst code reviewer?',
];

const DARES = [
  'Explain recursion using only food analogies. No code words allowed.',
  'Do your best impression of a loading spinner. Hold it for 10 seconds.',
  'Write a haiku about JavaScript. Read it out loud dramatically.',
  'Describe your current project as if it is a movie trailer.',
  'Teach an imaginary 5-year-old what an API is, in 30 seconds.',
  'Do 10 jumping jacks while naming CSS properties. Go!',
  'Sing the chorus of your favorite song but replace every noun with "bug".',
  'Explain what you do for a living to someone as if they are a cat.',
  'Draw your dream setup with your eyes closed. Show the group.',
  'Give a 30-second motivational speech to a broken laptop.',
  'Invent a new programming language name and its one killer feature.',
  'Act out "merge conflict" without using any words.',
];

function pick(arr, used) {
  const avail = arr.filter((x) => !used.includes(x));
  const pool = avail.length ? avail : arr;
  return pool[Math.floor(Math.random() * pool.length)];
}

export default function TruthDare() {
  const [card, setCard] = useState(null); // {kind:'truth'|'dare', text}
  const [used, setUsed] = useState([]);
  const [flips, setFlips] = useState(0);

  const draw = (kind) => {
    const k = kind === 'random' ? (Math.random() < 0.5 ? 'truth' : 'dare') : kind;
    const text = pick(k === 'truth' ? TRUTHS : DARES, used);
    setUsed((u) => [...u, text].slice(-40));
    setCard({ kind: k, text, key: flips });
    setFlips((f) => f + 1);
  };

  const reset = () => {
    setCard(null);
    setUsed([]);
    setFlips(0);
  };

  const isTruth = card?.kind === 'truth';

  return (
    <div className="text-center">
      <p className="font-hand text-3xl font-bold text-inksoft mb-5">pick your poison —</p>
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button onClick={() => draw('truth')} className="btn-chunky bg-sky text-[16px]">
          <HelpCircle size={18} strokeWidth={2.75} /> Truth
        </button>
        <button onClick={() => draw('dare')} className="btn-chunky bg-coral text-cream text-[16px]">
          <Flame size={18} strokeWidth={2.75} /> Dare
        </button>
        <button onClick={() => draw('random')} className="btn-chunky bg-sun text-[16px]">
          <Shuffle size={18} strokeWidth={2.75} /> Surprise me
        </button>
      </div>

      <div className="max-w-md mx-auto min-h-[220px]">
        <AnimatePresence mode="wait">
          {card ? (
            <motion.div
              key={card.key}
              initial={{ rotateY: 90, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -90, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className={`sticker tape p-7 ${isTruth ? 'tape-sky' : 'tape-coral'}`}
            >
              <span className={`inline-block border-[3px] border-ink rounded-full px-4 py-1 font-hand text-2xl font-bold mb-4 -rotate-2 ${isTruth ? 'bg-sky' : 'bg-coral text-cream'}`}>
                {isTruth ? 'truth' : 'dare'}
              </span>
              <p className="font-display font-bold text-2xl leading-snug">“{card.text}”</p>
            </motion.div>
          ) : (
            <motion.div
              key="empty"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="sticker-sm p-10 border-dashed"
            >
              <p className="font-hand text-3xl text-inksoft">your card appears here…</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {flips > 0 && (
        <div className="mt-6 flex items-center justify-center gap-4">
          <p className="font-bold text-inksoft">{flips} card{flips > 1 ? 's' : ''} drawn</p>
          <button onClick={reset} className="btn-chunky bg-cream !py-1.5 !px-4 text-[15px]">
            <RotateCcw size={16} strokeWidth={2.75} /> Reshuffle
          </button>
        </div>
      )}
    </div>
  );
}
