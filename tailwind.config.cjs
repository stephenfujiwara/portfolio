/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        silka: ["Silka", "serif"],
        lato: ["Lato", "sans-serif"],
        roadgeek: ["Roadgeek", "sans-serif"],
        japan: ["hiraki", "sans-serif"],
      },
    },
  },
  plugins: [],
};
