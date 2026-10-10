import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PawPrint, HelpCircle, Zap, Brain, ArrowLeft } from 'lucide-react';
import CritterCatch from '../games/CritterCatch.jsx';
import TruthDare from '../games/TruthDare.jsx';
import ReactionRush from '../games/ReactionRush.jsx';
import MindReader from '../games/MindReader.jsx';
import Masthead from '../components/Masthead.jsx';

const GAMES = [
  {
    id: 'critter',
    icon: PawPrint,
    title: 'Critter Catch',
    teaser: 'Wild critters loose in the meadow. Catch ’em all for the Critterdex.',
    comp: CritterCatch,
  },
  {
    id: 'truthdare',
    icon: HelpCircle,
    title: 'Truth & Dare',
    teaser: 'The newsroom’s deck of gloriously silly cards. Pick your poison.',
    comp: TruthDare,
  },
  {
    id: 'reaction',
    icon: Zap,
    title: 'Reaction Rush',
    teaser: '30 seconds. Targets everywhere. How fast are you, really?',
    comp: ReactionRush,
  },
  {
    id: 'mindreader',
    icon: Brain,
    title: 'AI Mind Reader',
    teaser: 'Think of a number 1–50. The machine reads it out of your brain.',
    comp: MindReader,
  },
];

export default function Games() {
  const [active, setActive] = useState(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const t = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(t);
  }, []);
  const current = GAMES.find((g) => g.id === active);

  if (!ready) {
    return (
      <div className="paper-bg min-h-screen">
        <Masthead section="The Fun Pages — Comics & Puzzles" />
        <main className="max-w-5xl mx-auto px-4 pb-16" aria-busy="true" aria-label="Loading games">
          <p className="text-center font-hand text-3xl text-inksoft mt-16 animate-pulse">
            setting up the puzzles page…
          </p>
        </main>
      </div>
    );
  }

  return (
    <div className="paper-bg min-h-screen">
      <Masthead section="The Fun Pages — Comics & Puzzles" />

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <AnimatePresence mode="wait">
          {!current ? (
            <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
              <h1 className="sr-only">Playable games by Vijay Varma</h1>
              <p className="text-center font-medium text-inksoft mt-8 max-w-xl mx-auto">
                Every great newspaper has a puzzles page. Ours has four. No
                pencils required — just a mouse, a finger, and mild
                competitiveness.
              </p>

              <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-10">
                {GAMES.map((g, i) => (
                  <motion.button
                    key={g.id}
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-40px' }}
                    transition={{ duration: 0.45, delay: i * 0.07 }}
                    onClick={() => setActive(g.id)}
                    className="text-left group"
                  >
                    <div className="flex items-start gap-4">
                      <span className="font-masthead font-black text-5xl text-ink/15 leading-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                      <div className="flex-1 border-b-[1.5px] border-ink/25 pb-6">
                        <div className="flex items-center gap-2.5">
                          <g.icon size={22} strokeWidth={2.5} className="text-coral" />
                          <h3 className="font-masthead font-black text-2xl group-hover:underline decoration-sun decoration-4 underline-offset-4">
                            {g.title}
                          </h3>
                        </div>
                        <p className="text-inksoft font-medium mt-1.5">{g.teaser}</p>
                        <span className="inline-block mt-2 text-sm font-bold uppercase tracking-widest text-ink group-hover:text-coral transition-colors">
                          Play today's puzzle →
                        </span>
                      </div>
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-center mt-12 font-hand text-2xl text-inksoft">
                solutions upside-down below. (there are none. it's a website.)
              </p>
            </motion.div>
          ) : (
            <motion.div key={current.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <button onClick={() => setActive(null)} className="btn-chunky bg-cream !py-2 !px-4 text-[15px] mt-8 mb-6">
                <ArrowLeft size={17} strokeWidth={2.75} /> Back to the Fun Pages
              </button>
              <div className="clipping p-5 sm:p-8 max-w-3xl mx-auto">
                <div className="flex items-center gap-3 mb-6 border-b-[2.5px] border-ink pb-4">
                  <current.icon size={26} strokeWidth={2.5} className="text-coral" />
                  <h2 className="font-masthead font-black text-3xl">{current.title}</h2>
                </div>
                <current.comp />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>
    </div>
  );
}
