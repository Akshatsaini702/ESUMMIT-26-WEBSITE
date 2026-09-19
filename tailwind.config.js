/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        // Dark neon "console" palette (Thomso-inspired)
        ink: '#0a0a14',
        ink2: '#10101d',
        panel: '#14141f',
        pink: '#ff2fa4',
        magenta: '#ec4899',
        cyan: '#22d3ee',
        lime: '#a3e635',
        green: '#4ade80',
        purple: '#a855f7',
        violet: '#8b5cf6',
        orange: '#ff7a1a',
        yellow: '#ffd166',
        // legacy tokens repointed to neon so stray refs resolve
        cream: '#0a0a14',
        ivory: '#14141f',
        espresso: '#f4f3f8',
        royal: '#7c5cff',
        electric: '#22d3ee',
        peach: '#ff7a1a',
        gold: '#ff2fa4',
        goldl: '#a855f7',
        champagne: '#22d3ee',
        dcrust: '#4aa32e',
      },
      fontFamily: {
        sans: ['"Space Grotesk"', 'system-ui', 'sans-serif'],
        display: ['Anton', '"Space Grotesk"', 'sans-serif'],
        mono: ['"Space Mono"', 'ui-monospace', 'monospace'],
      },
      boxShadow: {
        glow: '0 0 40px -6px rgba(255,47,164,0.5)',
        card: '0 24px 60px -24px rgba(0,0,0,0.7)',
        neon: '0 0 0 1px rgba(255,255,255,0.06), 0 18px 50px -22px rgba(124,92,255,0.6)',
      },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-12px)' } },
        shimmer: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
        spinSlow: { to: { transform: 'rotate(360deg)' } },
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '50%': { transform: 'translate(5%,-4%) scale(1.12)' },
        },
        borderpan: { '0%': { backgroundPosition: '0% 50%' }, '100%': { backgroundPosition: '200% 50%' } },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        spinSlow: 'spinSlow 8s linear infinite',
        drift: 'drift 20s ease-in-out infinite',
        borderpan: 'borderpan 6s linear infinite',
      },
    },
  },
  plugins: [],
}
