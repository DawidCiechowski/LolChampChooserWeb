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
        "appear": 'lol 8s ease-in-out'
      }
    },
  },
  plugins: [],
}