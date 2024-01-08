/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: [ /* 'media', */ 'class', '[data-theme="dark"]'],
  theme: {
    extend: {
      rotate: {
          '50': '50deg',
        },
        keyframes: {
          star: {
            '0%': {
              transform: 'rotate(0deg) scale(0)',
              opacity: 0
            },
            '50%': {
              transform: 'rotate(10deg) scale(1.3)'
            }
          },
          scale: {
            '0%': {
              transform: 'scale(0)',
              opacity: 0
            },
            '50%': {
              transform: 'scale(1.2)'
            }
          },
          shake: {
            '0%': {
              transform: 'translate(0)',
            },
            '20%': {
              transform: 'translate(-2px, 2px)',
            },
            '40%': {
              transform: 'translate(-2px, -2px)',
            },
            '60%': {
              transform: 'translate(2px, 2px)',
            },
            '80%': {
              transform: 'translate(2px, -2px)',
            },
            '100%': {
              transform: 'translate(0)',
            }
          }
        },
        animation: {
          'click-star': 'star .5s',
          'click-scale': 'scale .5s',
          'shake': 'shake .3s linear infinite both'
        }
      },
      },
  plugins: [],
}
