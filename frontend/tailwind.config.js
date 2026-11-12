/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F5F3FF',
          100: '#EDE9FE',
          200: '#DDD6FE',
          300: '#C4B5FD',
          400: '#A78BFA',
          500: '#8B5CF6',
          600: '#7C3AED', // Primary purple
          700: '#6D28D9',
          800: '#5B21B6',
          900: '#4C1D95',
          950: '#2E1065',
        },
        lavender: {
          50: '#FAF8FF',
          100: '#F3EFFF',
          200: '#E7DEFF',
          300: '#D5C4FF',
          400: '#BD9EFF',
          500: '#9E74F8',
          600: '#834EEB',
          700: '#6B35D4',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          subtle: '#FAF9FF',
          muted: '#F8FAFC',
          card: '#FFFFFF',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 2px 10px -2px rgba(99, 102, 241, 0.05), 0 10px 25px -5px rgba(124, 58, 237, 0.06)',
        'soft-lg': '0 10px 30px -5px rgba(124, 58, 237, 0.08), 0 20px 40px -10px rgba(99, 102, 241, 0.05)',
        'purple-glow': '0 0 25px -3px rgba(124, 58, 237, 0.25)',
      }
    },
  },
  plugins: [],
}
