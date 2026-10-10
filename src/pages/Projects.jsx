import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink } from 'lucide-react';
import Masthead from '../components/Masthead.jsx';
import { GithubIcon } from '../components/decor.jsx';

const PROJECTS = [
  {
    section: 'World Cup Special',
    headline: 'AI Stadium Guide — World Cup assistant powered by React + Gemini',
    img: '/screenshots/stadium-guide.jpg',
    caption: 'Exhibit A — the stadium guide, live and taking questions.',
    alt: 'AI Stadium Guide live demo screenshot',
    problem: 'Stadium visitors can’t find gates, food, washrooms, or help — static maps fail during live events.',
    features: [
      'Ask in plain words — “Where is Gate B?” “Nearest washroom?” — and get answers',
      'Gate & section finder, food recommendations, parking guidance, emergency help',
      'Multilingual assistance and accessibility info for visitors',
    ],
    hood: 'React 19 + Vite. Google Gemini AI answers questions, with local stadium data as a fast fallback.',
    filed: ['React', 'Vite', 'Google Gemini AI'],
    live: 'https://ai-stadium-guide.vercel.app',
    repo: 'https://github.com/quantumsavant/AI-Stadium-Guide',
  },
  {
    section: 'Technology',
    headline: 'GitHub Profile Explorer — live GitHub data, zero mock data',
    img: '/screenshots/github-explorer.png',
    caption: 'Exhibit B — real API data on screen. Nothing mocked.',
    alt: 'GitHub Profile Explorer live demo screenshot',
    problem: 'GitHub profiles are scattered across tabs — repos, stats, and activity are hard to scan at a glance.',
    features: [
      'Search any GitHub username, get the full profile in one view',
      'Repositories, stats, and activity — pulled live from the GitHub REST API',
      'Client-side routing and a fully responsive layout',
    ],
    hood: 'Every number on screen comes from the live GitHub REST API. React Router handles navigation.',
    filed: ['React', 'Tailwind CSS', 'React Router', 'GitHub REST API'],
    live: 'https://github-profile-explorer-ruddy.vercel.app',
    repo: 'https://github.com/quantumsavant/github-profile-explorer',
  },
  {
    section: 'Craft',
    headline: 'React UI Card — a profile card built the React way',
    img: '/screenshots/react-ui-card.jpg',
    caption: 'Exhibit C — a card, done properly.',
    alt: 'React UI Card live demo screenshot',
    problem: 'Profile cards get messy fast when data, layout, and styles tangle together.',
    features: [
      'Clean, responsive profile cards with hover-polished interactions',
      'Component-based architecture — each piece reusable on its own',
      'Props-driven rendering with dynamic data via array mapping',
    ],
    hood: 'Built the way the React docs intend: components, props, and mapped data. Responsive CSS throughout.',
    filed: ['React.js', 'CSS3'],
    live: 'https://react-ui-card.vercel.app',
    repo: 'https://github.com/quantumsavant/react-ui-card-',
  },
];

export default function Projects() {
  return (
    <div className="paper-bg min-h-screen">
      <Masthead section="The Projects Desk — Shipped & Live" />

      <main className="max-w-5xl mx-auto px-4 pb-16">
        <h1 className="sr-only">Projects by Vijay Varma — shipped and live</h1>
        <p className="text-center font-medium text-inksoft mt-8 max-w-xl mx-auto">
          Three projects. Three screenshots. Every link below opens the real thing.
        </p>

        <div className="mt-10 grid gap-10 md:grid-cols-1">
          {PROJECTS.map((p, i) => (
            <motion.article
              key={p.headline}
              initial={{ opacity: 0, y: 32 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="clipping p-5 sm:p-7"
            >
              <div className="grid md:grid-cols-2 gap-6 items-start">
                {/* screenshot — newspaper photo */}
                <figure className={`${i % 2 ? 'md:order-2' : ''} rotate-[-0.6deg]`}>
                  <div className="bg-[#fffdf7] border-[3px] border-ink p-2 shadow-[4px_4px_0_#22201A]">
                    <img
                      src={p.img}
                      alt={p.alt}
                      loading="lazy"
                      className="w-full h-auto block"
                    />
                  </div>
                  <figcaption className="font-hand text-xl text-inksoft mt-2 text-center">
                    {p.caption}
                  </figcaption>
                </figure>

                {/* details */}
                <div className={i % 2 ? 'md:order-1' : ''}>
                  <p className="dateline text-coral">§ {p.section}</p>
                  <h2 className="font-masthead font-black text-2xl sm:text-[28px] leading-[1.1] mt-2 tracking-tight">
                    {p.headline}
                  </h2>
                  <p className="font-medium text-ink/90 mt-4 text-[16px] leading-relaxed">
                    <strong className="text-coral">Problem:</strong> {p.problem}
                  </p>
                  <ul className="mt-3 space-y-1.5">
                    {p.features.map((f) => (
                      <li key={f} className="font-medium text-[15.5px] text-ink/90 flex gap-2">
                        <span className="text-coral font-black">▪</span> {f}
                      </li>
                    ))}
                  </ul>
                  <p className="font-medium text-inksoft mt-3 text-[14.5px] leading-relaxed border-l-[3px] border-sun pl-3">
                    <strong className="text-ink">Under the hood:</strong> {p.hood}
                  </p>
                  <p className="mt-3 text-[13px] font-bold text-inksoft uppercase tracking-widest">
                    Filed under: {p.filed.join(' · ')}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-3">
                    <a
                      href={p.live}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-chunky bg-ink text-paper !py-3 !px-5 text-[16px]"
                    >
                      <ExternalLink size={17} strokeWidth={2.75} /> Live demo
                    </a>
                    <a
                      href={p.repo}
                      target="_blank"
                      rel="noreferrer"
                      className="btn-chunky bg-cream !py-3 !px-5 text-[16px]"
                    >
                      <GithubIcon size={17} /> Code on GitHub
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <div className="rule-double my-10" />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.5 }}
          className="border-[3px] border-dashed border-ink p-6 text-center"
        >
          <p className="dateline text-inksoft">From the GitHub desk</p>
          <p className="font-medium mt-2 max-w-xl mx-auto">
            More experiments and works in progress live in the archive.
          </p>
          <a href="https://github.com/quantumsavant" target="_blank" rel="noreferrer" className="btn-chunky bg-sun mt-4 !py-3">
            <GithubIcon size={18} /> Full archive on GitHub
          </a>
        </motion.div>
      </main>
    </div>
  );
}
