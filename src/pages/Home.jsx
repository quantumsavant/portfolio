import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, CloudSun, Mail, MessageCircle } from 'lucide-react';
import Masthead from '../components/Masthead.jsx';

const EMAIL = 'vijayvarma769685@gmail.com';
const WHATSAPP = 'https://wa.me/918052768604';

export default function Home() {
  return (
    <div className="paper-bg min-h-screen">
      <Masthead section="Front Page — Late City Edition" />

      {/* recruiter strip — plain words, first screen */}
      <div className="max-w-6xl mx-auto px-4">
        <div className="mt-6 border-[3px] border-ink bg-sun px-4 py-3 text-center font-bold text-[15px] sm:text-lg -rotate-[0.3deg] shadow-[4px_4px_0_#22201A]">
          Vijay Varma · Frontend Developer | React | AI Integrations ·{' '}
          <span className="underline decoration-ink decoration-[3px] underline-offset-4">open to work</span>
        </div>
      </div>

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* ---------- LEAD STORY + SIDEBAR ---------- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          <motion.article
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-2"
          >
            <p className="dateline text-coral">★ Exclusive ★ Lucknow, Oct 2026</p>
            <h1 className="font-masthead font-black text-4xl sm:text-6xl leading-[1.02] mt-3 tracking-tight">
              AI Stadium Guide — World Cup assistant powered by React + Gemini
            </h1>
            <p className="font-hand text-2xl text-inksoft mt-3 -rotate-1">
              "I just kept building until it was live." — the developer, probably
            </p>
            <div className="rule-thin my-5" />
            <div className="grid sm:grid-cols-2 gap-5 text-[17px] leading-relaxed font-medium text-ink/90">
              <p>
                <span className="font-masthead font-black text-5xl float-left mr-2 leading-[0.85] mt-1">V</span>
                ijay Varma, a frontend developer from Lucknow, shipped it for
                the FIFA World Cup 2026 — tickets, seats, food delivery,
                booking. React, Vite, Google Gemini AI.
              </p>
              <p>
                The latest in a run of real, deployed products — all live,
                all clickable, no "coming soon" pages.
                <Link to="/projects" className="inline-flex items-center gap-1 font-bold text-coral hover:gap-2 transition-all ml-1">
                  See the projects <ArrowRight size={17} strokeWidth={3} />
                </Link>
              </p>
            </div>

            {/* pull quote */}
            <blockquote className="my-7 border-y-[3px] border-ink py-4 text-center">
              <p className="font-masthead font-bold text-2xl sm:text-3xl italic">
                "I ship real web apps — supercharged with AI."
              </p>
              <cite className="not-italic font-bold text-sm text-inksoft uppercase tracking-widest">— Vijay Varma, on the record</cite>
            </blockquote>
          </motion.article>

          {/* sidebar */}
          <motion.aside
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="space-y-6"
          >
            <div className="clipping p-5 relative">
              <span className="stamp absolute -top-4 -right-3 bg-paper">Open to work</span>
              <h2 className="font-masthead font-black text-2xl border-b-[2.5px] border-ink pb-2 mb-3">The Short Version</h2>
              <ul className="space-y-2.5 font-medium text-[16px]">
                <li><strong>Who:</strong> Vijay Varma — Frontend Developer, Lucknow, India.</li>
                <li><strong>What:</strong> Deployed React apps with AI inside.</li>
                <li><strong>Why hire:</strong> Ships fast, learns faster. Google Cloud Gen AI certified.</li>
              </ul>
              <a href={`mailto:${EMAIL}?subject=Frontend developer role`} className="btn-chunky bg-sun mt-4 w-full justify-center !py-3.5">
                <Mail size={18} strokeWidth={2.75} /> Hire via email
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-chunky bg-cream mt-2.5 w-full justify-center !py-3.5">
                <MessageCircle size={18} strokeWidth={2.75} /> WhatsApp me
              </a>
              <a href="/Vijay_Varma_Resume.pdf" download className="btn-chunky bg-paper mt-2.5 w-full justify-center !py-2.5 text-[15px]">
                Download résumé
              </a>
            </div>

            <div className="clipping p-5">
              <h2 className="font-masthead font-black text-2xl border-b-[2.5px] border-ink pb-2 mb-3 flex items-center gap-2">
                <CloudSun size={24} strokeWidth={2.5} /> The Weather
              </h2>
              <p className="font-medium text-[16px]">
                Currently: <strong>DSA in C++</strong> with a strong chance of
                shipping, scattered <strong>Gemini API</strong> experiments
                through the week.
              </p>
              <p className="font-hand text-xl text-inksoft mt-2">— the forecast never lies</p>
            </div>
          </motion.aside>
        </div>

        <div className="rule-double my-10" />

        {/* ---------- MORE HEADLINES ---------- */}
        <section>
          <h2 className="font-masthead font-black text-3xl mb-6">More Headlines</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                k: 'Technology',
                h: 'GitHub Profile Explorer — live GitHub data, zero mock data',
                d: 'Profiles, repos and stats from the real GitHub API. React + Tailwind.',
                to: '/projects',
              },
              {
                k: 'Craft',
                h: 'React UI Card — a profile card built the React way',
                d: 'Components, props, clean CSS. Responsive and hover-polished.',
                to: '/projects',
              },
              {
                k: 'Leisure',
                h: 'An arcade inside a portfolio — 4 playable games',
                d: 'Critter Catch, Truth & Dare, Reaction Rush, AI Mind Reader.',
                to: '/games',
              },
            ].map((s, i) => (
              <motion.div
                key={s.h}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
              >
                <Link to={s.to} className="block group">
                  <p className="dateline text-inksoft">{s.k}</p>
                  <h3 className="font-masthead font-bold text-[22px] leading-snug mt-1.5 group-hover:underline decoration-coral decoration-[3px] underline-offset-4">
                    {s.h}
                  </h3>
                  <p className="text-inksoft font-medium mt-2 text-[15px]">{s.d}</p>
                  <span className="inline-block mt-2 text-sm font-bold text-coral">Read story →</span>
                </Link>
                {i < 2 && <div className="col-rule md:hidden h-px my-2" />}
              </motion.div>
            ))}
          </div>
        </section>

        <div className="rule-double my-10" />

        {/* ---------- CLASSIFIEDS TEASER ---------- */}
        <motion.section
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="border-[3px] border-dashed border-ink p-6 sm:p-8 text-center bg-paperdeep/60"
        >
          <p className="dateline text-inksoft">From the Classifieds desk</p>
          <h2 className="font-masthead font-black text-3xl sm:text-4xl mt-2">
            SITUATIONS VACANT: Frontend Developer seeks brilliant team
          </h2>
          <p className="font-medium text-inksoft mt-3 max-w-xl mx-auto">
            Will bring: shipped products, AI fluency, unreasonable enthusiasm.
            Will accept: interesting problems and a decent chair.
          </p>
          <Link to="/contact" className="btn-chunky bg-coral text-cream mt-5">
            Place your reply <ArrowRight size={18} strokeWidth={2.75} />
          </Link>
        </motion.section>
      </main>
    </div>
  );
}
