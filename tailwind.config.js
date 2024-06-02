const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        lol: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"},
        }
      },
      animation: {
        "appear": 'lol 2s ease-in'
      }
    },
  },
  plugins: [
    plugin(function({addUtilities}) {
      addUtilities({
        '.no-scrollbar::-webkit-scrollbar': {
          'display': 'none'
        },
        '.no-scrollbar': {
          '-ms-overflow-style': 'none',
          'scrollbar-width': 'none',
        }
      })
    })
  ],
}