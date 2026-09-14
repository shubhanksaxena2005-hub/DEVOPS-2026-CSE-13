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
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        earth: {
          50: '#faf6f0',
          100: '#f3ece0',
          200: '#e5d5bd',
          300: '#d4b894',
          400: '#c29a6b',
          500: '#b07f50',
          600: '#9e6a42',
          700: '#7d5235',
          800: '#65432d',
          900: '#523826',
        },
        gold: {
          400: '#d4a843',
          500: '#bf9435',
          600: '#a67c2c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}