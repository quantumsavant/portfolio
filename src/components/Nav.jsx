import React, { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

/* Newspaper section names for the routes */
const links = [
  { to: '/', label: 'Front Page', end: true },
  { to: '/about', label: 'The Story' },
  { to: '/projects', label: 'Stories' },
  { to: '/games', label: 'Fun Pages' },
  { to: '/contact', label: 'Classifieds' },
];

export default function Nav() {
  const [open, setOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="bg-ink text-paper border-b-[3px] border-ink">
        <div className="max-w-6xl mx-auto px-4 py-2 flex items-center justify-between">
          <Link to="/" className="font-masthead font-black text-lg tracking-tight">
            The Shipped <span className="text-sun">Times</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <span className="text-paper/50 text-xs font-bold uppercase tracking-[0.2em] mr-2">Sections:</span>
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                className={({ isActive }) =>
                  `px-3.5 py-1.5 text-sm font-bold transition-all border-b-[3px] ${
                    isActive
                      ? 'text-sun border-sun'
                      : 'text-paper/75 border-transparent hover:text-paper hover:border-paper/40'
                  }`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>

          <button
            className="md:hidden p-1.5"
            onClick={() => setOpen(!open)}
            aria-label="Toggle sections"
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {open && (
          <div className="md:hidden border-t border-paper/20 px-4 py-2 flex flex-col">
            {links.map((l) => (
              <NavLink
                key={l.to}
                to={l.to}
                end={l.end}
                onClick={() => setOpen(false)}
                className={({ isActive }) =>
                  `py-2.5 font-bold border-b border-paper/10 ${isActive ? 'text-sun' : 'text-paper/80'}`
                }
              >
                {l.label}
              </NavLink>
            ))}
          </div>
        )}
      </nav>
    </header>
  );
}
