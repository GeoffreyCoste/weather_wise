/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: [ /* 'media', */ 'class', '[data-theme="dark"]'],
  /* theme: {
    extend: {
      backgroundImage: {
        'footer-clouds-blue': "url('/public/images/clouds_blue.svg')",
        'footer-clouds-light': "url('/public/images/clouds_light.svg')",
      },
    },
  }, */
  plugins: [],
}
