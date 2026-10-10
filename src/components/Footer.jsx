import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="relative z-10 bg-ink text-paper border-t-[3px] border-ink">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <p className="font-masthead font-black text-center text-2xl">The Shipped Times</p>
        <p className="text-center text-paper/60 text-sm mt-2 font-medium">
          Printed on 100% recycled pixels in Lucknow, India · No AI slop was used in the making of this newspaper
        </p>
        <div className="flex items-center justify-center flex-wrap gap-x-6 gap-y-2 mt-4 text-sm font-bold text-paper/70 px-2">
          <Link to="/" className="hover:text-sun transition-colors">Front Page</Link>
          <Link to="/projects" className="hover:text-sun transition-colors">Stories</Link>
          <Link to="/games" className="hover:text-sun transition-colors">Fun Pages</Link>
          <Link to="/contact" className="hover:text-sun transition-colors">Classifieds</Link>
        </div>
        <p className="text-center text-paper/40 text-xs mt-4">© 2026 Vijay Varma — Editor-in-Chief, reporter, and printing press</p>
      </div>
    </footer>
  );
}
