import React from 'react';

/* The Shipped Times masthead — used at the top of every page */
export default function Masthead({ section }) {
  return (
    <div className="pt-24 sm:pt-28 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex justify-between items-center text-[11px] sm:text-xs font-bold uppercase tracking-[0.18em] text-inksoft">
          <span>Vol. I — Lucknow Edition</span>
          <span className="hidden sm:inline">October 2026</span>
          <span>Price: one good job</span>
        </div>
        <p className="font-masthead font-black text-center leading-[0.9] mt-3 tracking-tight text-[14.5vw] sm:text-7xl lg:text-[6.5rem]">
          The Shipped Times
        </p>
        <p className="text-center font-hand text-xl sm:text-2xl text-inksoft mt-2">
          "All the news that's fit to ship" — <span className="font-bold text-ink">Vijay Varma</span>, Editor-in-Chief
        </p>
        {section && (
          <p className="text-center mt-3">
            <span className="inline-block bg-ink text-paper font-bold uppercase tracking-[0.2em] text-xs px-5 py-1.5 -rotate-1">
              {section}
            </span>
          </p>
        )}
        <div className="rule-double mt-4" />
      </div>
    </div>
  );
}
