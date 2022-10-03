/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      minHeight: {
        '10': '40px',
      },
      fontFamily: {
        modern: 'Inter, sans-serif'
      }
    },
  },
  plugins: [],
}
