/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        background: {
          light: '#F8FAFC',
          dark: '#080B11',
          surface: {
            light: '#FFFFFF',
            dark: '#0F1523',
          },
          subtle: {
            light: '#F1F5F9',
            dark: '#161D30',
          },
          card: {
            light: 'rgba(255, 255, 255, 0.85)',
            dark: 'rgba(15, 21, 35, 0.75)',
          }
        },
        border: {
          light: '#E2E8F0',
          dark: '#1F293D',
          hover: {
            light: '#CBD5E1',
            dark: '#2E3D5B',
          }
        },
        brand: {
          50: '#EEF2FF',
          100: '#E0E7FF',
          200: '#C7D2FE',
          300: '#A5B4FC',
          400: '#818CF8',
          500: '#6366F1',
          600: '#4F46E5',
          700: '#4338CA',
          800: '#3730A3',
          900: '#312E81',
          accent: '#7C3AED',
          glow: 'rgba(99, 102, 241, 0.35)',
        },
        status: {
          healthy: '#10B981',
          risk: '#F59E0B',
          delayed: '#EF4444',
          completed: '#3B82F6',
        }
      },
      fontFamily: {
        sans: ['Inter', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'glow-sm': '0 0 15px -3px rgba(99, 102, 241, 0.25)',
        'glow-md': '0 0 30px -5px rgba(99, 102, 241, 0.3)',
        'glow-lg': '0 0 50px -10px rgba(99, 102, 241, 0.35)',
        'card-dark': '0 8px 32px 0 rgba(0, 0, 0, 0.37)',
        'card-light': '0 8px 30px 0 rgba(0, 0, 0, 0.04)',
      },
      animation: {
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        }
      }
    },
  },
  plugins: [],
};
