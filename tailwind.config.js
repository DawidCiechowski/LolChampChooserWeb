const plugin = require('tailwindcss');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Kanit: ["Kanit"]
      },
      keyframes: {
        lol: {
          "0%": {opacity: "0"},
          "100%": {opacity: "1"},
        },
        brighten: {
          "0%": {filter: "brightness(0)"},
          "100%": {filter: "brightness(1)"},
        }
      },
      animation: {
        "appear": 'lol 2s ease-in',
        "brighten": "brighten .5s"
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar-hide'),
  ],
}