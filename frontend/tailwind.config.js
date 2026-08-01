/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#07070A',
        surface: '#101014',
        card: '#101014',
        primary: '#FFFFFF',
        secondary: '#9ca3af',
        accent: '#3B82F6', // Blue
        purple: '#8B5CF6',
        emerald: '#10B981',
        gold: '#FBBF24',
        border: 'rgba(255, 255, 255, 0.08)',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        heading: ['Geist', 'sans-serif'],
        mono: ['IBM Plex Mono', 'monospace'],
      },
      boxShadow: {
        'glow': '0 0 40px -10px rgba(59, 130, 246, 0.3)',
        'glow-purple': '0 0 40px -10px rgba(139, 92, 246, 0.3)',
        'premium': '0 20px 80px rgba(0, 0, 0, 0.5)',
        'glass': '0 8px 32px 0 rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'aurora': 'linear-gradient(120deg, rgba(59,130,246,0.15) 0%, rgba(0,0,0,0) 50%, rgba(139,92,246,0.15) 100%)',
        'mesh': 'radial-gradient(at 40% 20%, rgba(59, 130, 246, 0.1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(139, 92, 246, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.1) 0px, transparent 50%)',
      },
      animation: {
        'aurora-shift': 'aurora-shift 15s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        'aurora-shift': {
          '0%': { backgroundPosition: '0% 50%' },
          '100%': { backgroundPosition: '100% 50%' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      }
    },
  },
  plugins: [],
}
