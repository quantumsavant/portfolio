import React from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Copy, Check, MessageCircle } from 'lucide-react';
import Masthead from '../components/Masthead.jsx';
import { GithubIcon, LinkedinIcon } from '../components/decor.jsx';

const EMAIL = 'vijayvarma769685@gmail.com';
const WHATSAPP = 'https://wa.me/918052768604';

function CopyEmail() {
  const [copied, setCopied] = React.useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };
  return (
    <button onClick={copy} className="btn-chunky bg-cream !py-2 !px-4 text-[15px]" aria-label="Copy email address">
      {copied ? <Check size={17} strokeWidth={2.75} /> : <Copy size={17} strokeWidth={2.75} />}
      {copied ? 'Copied!' : 'Copy address'}
    </button>
  );
}

function Ad({ kicker, children, big }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.45 }}
      className={`border-[2.5px] border-dashed border-ink p-6 ${big ? 'sm:p-8 bg-paperdeep/70' : 'bg-cream/60'}`}
    >
      <p className="dateline text-coral mb-3">■ {kicker}</p>
      {children}
    </motion.div>
  );
}

export default function Contact() {
  return (
    <div className="paper-bg min-h-screen">
      <Masthead section="Classifieds — Announcements & Notices" />

      <main className="max-w-4xl mx-auto px-4 pb-16">
        <p className="text-center font-medium text-inksoft mt-8">
          Rates: one email. Circulation: the entire internet. Deadline: whenever you're ready.
        </p>

        <div className="mt-8 space-y-6">
          <Ad kicker="Situations Vacant" big>
            <h1 className="font-masthead font-black text-3xl sm:text-5xl leading-tight">
              FRONTEND DEVELOPER seeks brilliant team
            </h1>
            <p className="font-medium text-[17px] mt-4 max-w-2xl">
              Shipped React products. AI fluency — Gemini, LLMs, AI coding
              tools. Google Cloud Gen AI certified. Daily DSA in C++. Seeks
              interesting problems and a non-wobbly chair. Replies fast.
            </p>
            <div className="mt-5 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}?subject=Let's talk — frontend developer role`} className="btn-chunky bg-coral text-cream text-lg !py-3.5 w-full sm:w-auto justify-center">
                <Mail size={19} strokeWidth={2.75} /> Reply to this ad
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-chunky bg-sun !py-3.5 w-full sm:w-auto justify-center">
                <MessageCircle size={19} strokeWidth={2.75} /> WhatsApp
              </a>
              <CopyEmail />
            </div>
          </Ad>

          <div className="grid sm:grid-cols-2 gap-6">
            <Ad kicker="Announcements">
              <h2 className="font-masthead font-black text-2xl">Direct line</h2>
              <a href={`mailto:${EMAIL}`} className="font-bold text-lg break-all hover:text-coral transition-colors">
                {EMAIL}
              </a>
              <p className="text-inksoft font-medium mt-2 text-[15px]">Fastest route. Monitored more closely than the front page.</p>
            </Ad>
            <Ad kicker="Personals">
              <h2 className="font-masthead font-black text-2xl">Elsewhere in print</h2>
              <div className="mt-3 space-y-2.5">
                <a href="https://github.com/quantumsavant" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 font-bold hover:text-coral transition-colors">
                  <GithubIcon size={20} /> github.com/quantumsavant
                </a>
                <a href="https://www.linkedin.com/in/viijayverma" target="_blank" rel="noreferrer" className="flex items-center gap-2.5 font-bold hover:text-coral transition-colors">
                  <LinkedinIcon size={20} /> LinkedIn — Vijay Varma
                </a>
              </div>
              <p className="text-inksoft font-medium mt-3 text-[15px] flex items-center gap-1.5">
                <MapPin size={16} strokeWidth={2.75} /> Lucknow, India — remote worldwide
              </p>
            </Ad>
          </div>

          <Ad kicker="Lost & Found">
            <h2 className="font-masthead font-black text-2xl">FOUND: one (1) recruiter reading this page</h2>
            <p className="font-medium mt-2">
              If this is you — you've reached the end of the paper, which most
              readers never do. Reward for claiming: a great hire.
            </p>
            <div className="mt-4 flex flex-wrap gap-3">
              <a href={`mailto:${EMAIL}?subject=Found your portfolio`} className="btn-chunky bg-sun !py-3.5 w-full sm:w-auto justify-center">
                <Mail size={18} strokeWidth={2.75} /> Claim reward
              </a>
              <a href={WHATSAPP} target="_blank" rel="noreferrer" className="btn-chunky bg-cream !py-3.5 w-full sm:w-auto justify-center">
                <MessageCircle size={18} strokeWidth={2.75} /> WhatsApp
              </a>
            </div>
          </Ad>
        </div>

        <p className="text-center mt-10 font-hand text-2xl text-inksoft">
          the editor reads every letter personally. write soon.
        </p>
      </main>
    </div>
  );
}
