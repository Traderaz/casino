/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        'bg': '#0B0D10',
        'bg-elevated': '#12151B',
        'panel': 'rgba(255,255,255,0.04)',
        'separator': 'rgba(255,255,255,0.08)',
        'text': '#E9EEF5',
        'muted': '#A6B0BF',
        'emerald': '#00E28A',
        'crimson': '#E03B3B',
        'gold': '#D9B45B',
        'warning': '#F9C74F',
        'success': '#2ED573',
      },
      fontFamily: {
        'display': ['var(--font-space-grotesk)', 'system-ui', 'sans-serif'],
        'body': ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'light-band': 'light-band-move 8s ease-in-out infinite',
      },
      keyframes: {
        'light-band-move': {
          '0%, 100%': { transform: 'translateX(-100%)' },
          '50%': { transform: 'translateX(100%)' },
        },
      },
    },
  },
  plugins: [],
}
