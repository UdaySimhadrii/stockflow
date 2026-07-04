/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#14213D',
        paper: '#F4F6F5',
        surface: '#FFFFFF',
        muted: '#5B6B66',
        border: '#E1E6E3',
        brand: {
          50: '#EAF5F2',
          100: '#CFE8E1',
          300: '#7FBFB0',
          500: '#147D6F',
          600: '#0F6459',
          700: '#0B4C44',
        },
        alert: {
          50: '#FBEAE6',
          300: '#E29785',
          500: '#C4432B',
          600: '#9E3521',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      boxShadow: {
        card: '0 1px 2px rgba(20, 33, 61, 0.06), 0 1px 3px rgba(20, 33, 61, 0.08)',
      },
    },
  },
  plugins: [],
};
