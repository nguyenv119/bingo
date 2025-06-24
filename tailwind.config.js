/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'game-blue': '#D97757',
        'game-gold': '#F0EEE6',
        'anthropic-purple': '#D97757',
        'anthropic-light': '#F0EEE6',
        'anthropic-dark': '#F7F7F8',
        'black': '#141413',
        'anthropic-accent': '#D97757',
      },
      animation: {
        'flip': 'flip 0.5s ease-in-out',
        'bounce-once': 'bounce 1s ease-in-out 1',
        'glitch': 'glitch 0.3s ease-in-out',
        'spin-slow': 'spin 15s linear infinite',
        'soundwave': 'soundwave 0.5s ease-in-out infinite alternate',
      },
      keyframes: {
        flip: {
          '0%': { transform: 'rotateY(0deg)' },
          '100%': { transform: 'rotateY(180deg)' },
        },
        glitch: {
          '0%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-5px, 5px)' },
          '40%': { transform: 'translate(-5px, -5px)' },
          '60%': { transform: 'translate(5px, 5px)' },
          '80%': { transform: 'translate(5px, -5px)' },
          '100%': { transform: 'translate(0)' },
        },
        soundwave: {
          '0%': { height: '2px' },
          '100%': { height: '12px' },
        }
      }
    },
  },
  plugins: [],
} 