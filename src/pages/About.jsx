import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Masthead from '../components/Masthead.jsx';

const archives = [
  {
    date: '2025 — Vol. I, No. 1',
    title: 'Student Enrolls at IGNOU, Dreams in Code',
    note: 'Begins BCA (2025–2028), CGPA 6.2. Class 12 (PCM), UP Board, Lucknow — the origin story.',
  },
  {
    date: 'Aug 2025',
    title: 'Cloud Giant Certifies Local Developer in Generative AI',
    note: 'Google Cloud Gen AI Master Certificate, Google Cloud Gen AI Academy. The AI obsession begins.',
  },
  {
    date: 'Jul 2026',
    title: 'Developer Goes Independent, Ships From Lucknow',
    note: 'Frontend Developer (self-employed) — real, deployed web apps with React, Tailwind, and AI inside.',
  },
  {
    date: 'Jul – Aug 2026',
    title: 'Summer of Certificates: Four in Six Weeks',
    note: 'MLOps for Generative AI (Google Digital Academy) · Claude 101 (Anthropic) · SQL Intermediate (HackerRank) · Hackathon (Hack2skill).',
  },
  {
    date: 'Today’s Edition',
    title: 'Grinding DSA in C++, Building With Gemini',
    note: 'Daily problem-solving in C++. AI-integrated apps and agents with Gemini, Claude and Codex.',
  },
];

const pressKit = {
  'Languages': ['JavaScript (ES6)', 'HTML5', 'CSS3', 'C++', 'Python'],
  'Frameworks': ['React.js', 'Tailwind CSS', 'React Router', 'Vite', 'Framer Motion'],
  'AI & Tooling': ['Google Gemini AI', 'LLM APIs', 'Claude', 'OpenAI Codex', 'Git', 'REST APIs', 'npm', 'Vercel', 'GitHub'],
};

export default function About() {
  return (
    <div className="paper-bg min-h-screen">
      <Masthead section="The Story So Far — A Profile" />

      <main className="max-w-6xl mx-auto px-4 pb-16">
        {/* ---------- FEATURE ---------- */}
        <motion.article
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto mt-8"
        >
          <p className="dateline text-coral">★ The Saturday Profile ★</p>
          <h1 className="font-masthead font-black text-4xl sm:text-6xl leading-[1.02] mt-3 tracking-tight">
            From Lucknow, With Code
          </h1>
          <p className="font-medium text-inksoft mt-3">
            By the Staff of The Shipped Times · 4 min read · Filed under: People Who Ship
          </p>
          <div className="rule-thin my-5" />
          <div className="grid sm:grid-cols-2 gap-5 text-[17px] leading-relaxed font-medium text-ink/90">
            <p>
              <span className="font-masthead font-black text-5xl float-left mr-2 leading-[0.85] mt-1">V</span>
              ijay Varma files from Lucknow — and what he files is software.
              BCA student at IGNOU, self-employed frontend developer since
              July 2026: React interfaces, Tailwind systems, AI inside
              everything.
            </p>
            <p>
              The short version: <em>"I ship real web apps, supercharged with
              AI."</em> The record: a Gemini-powered stadium guide, a GitHub
              explorer on live API data, certificates from Google and
              Anthropic, and a daily DSA-in-C++ habit.
            </p>
          </div>
          <blockquote className="my-7 border-y-[3px] border-ink py-4 text-center">
            <p className="font-masthead font-bold text-2xl sm:text-3xl italic">
              "Give me a blank page and a deadline. I'll give you a product."
            </p>
            <cite className="not-italic font-bold text-sm text-inksoft uppercase tracking-widest">— V. Varma, probably, while shipping</cite>
          </blockquote>
          <div className="text-center">
            <a href="/Vijay_Varma_Resume.pdf" download className="btn-chunky bg-sun !py-3">
              Download résumé (PDF)
            </a>
          </div>
        </motion.article>

        <div className="rule-double my-10" />

        {/* ---------- ARCHIVES ---------- */}
        <section className="max-w-4xl mx-auto">
          <h2 className="font-masthead font-black text-3xl sm:text-4xl">From the Archives</h2>
          <p className="font-hand text-2xl text-inksoft mt-1">every edition that mattered —</p>
          <div className="mt-8">
            {archives.map((a, i) => (
              <motion.div
                key={a.date}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: Math.min(i * 0.06, 0.25) }}
                className="grid sm:grid-cols-[190px_1fr] gap-2 sm:gap-6 py-5 border-b-[1.5px] border-ink/25"
              >
                <p className="dateline text-inksoft pt-1">{a.date}</p>
                <div>
                  <h3 className="font-masthead font-bold text-[22px] leading-snug">{a.title}</h3>
                  <p className="text-inksoft font-medium mt-1">{a.note}</p>
                </div>
              </motion.div>
            ))}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4 }}
              className="grid sm:grid-cols-[190px_1fr] gap-2 sm:gap-6 py-5"
            >
              <p className="dateline text-coral pt-1">Next edition</p>
              <div>
                <h3 className="font-masthead font-bold text-[22px] leading-snug">
                  Developer Joins <span className="underline decoration-sun decoration-4 underline-offset-4">Your Team</span>, Everybody Wins
                </h3>
                <p className="text-inksoft font-medium mt-1">This headline is unwritten. It needs a hiring manager.</p>
                <Link to="/contact" className="btn-chunky bg-ink text-paper mt-4 !py-2.5">
                  Write this headline <ArrowRight size={18} strokeWidth={2.75} />
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <div className="rule-double my-10" />

        {/* ---------- PRESS KIT ---------- */}
        <section className="max-w-5xl mx-auto">
          <h2 className="font-masthead font-black text-3xl sm:text-4xl text-center">The Press Kit</h2>
          <p className="text-center font-medium text-inksoft mt-2">Official toolkit, as filed with the newsroom.</p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {Object.entries(pressKit).map(([group, items], gi) => (
              <motion.div
                key={group}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: gi * 0.08 }}
                className="clipping p-5"
              >
                <h3 className="font-masthead font-black text-xl border-b-[2.5px] border-ink pb-2 mb-3">{group}</h3>
                <ul className="space-y-1.5">
                  {items.map((s) => (
                    <li key={s} className="font-medium text-[16px] flex gap-2">
                      <span className="text-coral font-black">▪</span> {s}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
          <p className="text-center mt-8 font-hand text-2xl text-inksoft">
            …plus LLMs &amp; NLP — our correspondent knows what goes on under the hood.
          </p>
          <div className="text-center mt-6">
            <a href="/Vijay_Varma_Resume.pdf" download className="btn-chunky bg-sun !py-3">
              Download résumé (PDF)
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
