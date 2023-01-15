/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        "spotify-green" : "#1DB945",
        "neon-blue" : "#00f2ff",
        "neon-pink" : "#ff00ffd9",
      },
    },
  },
  plugins: [],
}
