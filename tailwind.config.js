/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ['class', '[data-theme="dark"]'],
  content: [
    './**/*.html',
    './src/**/*.{js,ts}',
    './assets/**/*.{js,ts}'
  ],
  theme: {
    extend: {}
  },
  plugins: []
};