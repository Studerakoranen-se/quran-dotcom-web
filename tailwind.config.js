/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        elMessiri: ["El Messiri", "sans-serif"],
        irishGrove: ["Irish Grover", "cursive"],
        amiri: ["Amiri", "serif"],
        lateef: ["Lateef", "serif"],
      },
      colors: {
        color1: "#043B3B",
        color2: "#001D1D",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [],
};
