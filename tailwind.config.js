/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: '#FFF7E6',
        paperdeep: '#FBEED3',
        ink: '#22201A',
        inksoft: '#4A453A',
        coral: '#FF6F61',
        sun: '#FFC531',
        sky: '#53A8FF',
        mint: '#34D399',
        grape: '#A78BFA',
        bubble: '#F9A8D4',
        cream: '#FFFDF6',
      },
      fontFamily: {
        display: ['"Bricolage Grotesque"', '"Space Grotesk"', 'sans-serif'],
        masthead: ['"Playfair Display"', 'Georgia', 'serif'],
        body: ['"Space Grotesk"', 'sans-serif'],
        hand: ['Caveat', 'cursive'],
      },
      boxShadow: {
        hard: '6px 6px 0 #22201A',
        'hard-sm': '4px 4px 0 #22201A',
        'hard-lg': '10px 10px 0 #22201A',
        'hard-coral': '6px 6px 0 #FF6F61',
        'hard-sky': '6px 6px 0 #53A8FF',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-2deg)' },
          '50%': { transform: 'rotate(2deg)' },
        },
        floaty: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'spin-slow': {
          to: { transform: 'rotate(360deg)' },
        },
        pop: {
          '0%': { transform: 'scale(0.6)', opacity: '0' },
          '70%': { transform: 'scale(1.08)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        marquee: {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        wiggle: 'wiggle 2.4s ease-in-out infinite',
        floaty: 'floaty 4s ease-in-out infinite',
        'spin-slow': 'spin-slow 14s linear infinite',
        pop: 'pop 0.35s ease-out both',
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}
