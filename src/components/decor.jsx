import React from 'react';

/* Hand-drawn squiggle underline — wrap any word: <Squiggle color="#FF6F61">word</Squiggle> */
export function Squiggle({ children, color = '#FF6F61' }) {
  return (
    <span className="squiggle">
      {children}
      <svg viewBox="0 0 200 20" preserveAspectRatio="none" aria-hidden="true">
        <path
          d="M3 13 C 40 4, 70 18, 105 10 S 170 5, 197 12"
          fill="none"
          stroke={color}
          strokeWidth="7"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

/* Starburst badge */
export function Starburst({ className = '', color = '#FFC531', size = 84 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 100 100" className={className} aria-hidden="true">
      <path
        d="M50 2 L58 30 L88 22 L66 44 L96 52 L66 60 L88 82 L58 74 L50 102 L42 74 L12 82 L34 60 L4 52 L34 44 L12 22 L42 30 Z"
        fill={color}
        stroke="#22201A"
        strokeWidth="4"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Curvy hand-drawn arrow */
export function ArrowDoodle({ className = '', color = '#22201A', flip = false }) {
  return (
    <svg
      viewBox="0 0 120 80"
      className={className}
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
      aria-hidden="true"
    >
      <path
        d="M8 10 C 50 12, 90 25, 100 55 M 100 55 l -14 -4 M 100 55 l 2 -15"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/* Little sparkle cluster */
export function Sparkles({ className = '', color = '#FFC531' }) {
  const s = (x, y, r, d = 0) => (
    <path
      key={`${x}-${y}`}
      d={`M ${x} ${y - r} Q ${x + r * 0.18} ${y - r * 0.18} ${x + r} ${y} Q ${x + r * 0.18} ${y + r * 0.18} ${x} ${y + r} Q ${x - r * 0.18} ${y + r * 0.18} ${x - r} ${y} Q ${x - r * 0.18} ${y - r * 0.18} ${x} ${y - r} Z`}
      fill={color}
      stroke="#22201A"
      strokeWidth="2.5"
      transform={`rotate(${d} ${x} ${y})`}
    />
  );
  return (
    <svg viewBox="0 0 120 90" className={className} aria-hidden="true">
      {s(28, 30, 16)}
      {s(78, 20, 10, 20)}
      {s(95, 62, 14, -15)}
      {s(45, 68, 8, 30)}
    </svg>
  );
}

/* Wobbly hand-drawn circle around content */
export function ScribbleCircle({ className = '', color = '#53A8FF' }) {
  return (
    <svg viewBox="0 0 200 200" className={className} aria-hidden="true">
      <path
        d="M100 12 C 150 8, 188 40, 186 100 C 184 160, 145 190, 95 188 C 45 186, 12 150, 14 98 C 16 45, 55 16, 102 14"
        fill="none"
        stroke={color}
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Section kicker: small sticker label */
export function Kicker({ children, color = 'bg-sun' }) {
  return (
    <span
      className={`inline-block ${color} border-[3px] border-ink rounded-full px-4 py-1 font-hand text-2xl font-bold shadow-hard-sm -rotate-2`}
    >
      {children}
    </span>
  );
}

/* Brand icons (lucide no longer ships brand marks) */
export function GithubIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

export function LinkedinIcon({ size = 24, className = '' }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}
