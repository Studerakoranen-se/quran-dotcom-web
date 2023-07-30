/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        elMessiri: ["El Messiri", "sans-serif"],
        irishGrove: ["Irish Grover", "cursive"],
        amiri: ["Amiri", "serif"],
        lateef: ["Lateef", "serif"],
        nunito: ["Nunito", "sans-serif"],
        scheherazade: ["Scheherazade New", "serif"],
        sans: ["Noto Sans SC", "sans-serif"],
      },

      colors: {
        color1: "#043B3B",
        color2: "#001D1D",
        primary: {
          DEFAULT: "#4361ee",
          light: "#eaf1ff",
          "dark-light": "rgba(67,97,238,.15)",
        },
        secondary: {
          DEFAULT: "#805dca",
          light: "#ebe4f7",
          "dark-light": "rgb(128 93 202 / 15%)",
        },
        success: {
          DEFAULT: "#00ab55",
          light: "#ddf5f0",
          "dark-light": "rgba(0,171,85,.15)",
        },
        danger: {
          DEFAULT: "#e7515a",
          light: "#fff5f5",
          "dark-light": "rgba(231,81,90,.15)",
        },
        warning: {
          DEFAULT: "#e2a03f",
          light: "#fff9ed",
          "dark-light": "rgba(226,160,63,.15)",
        },
        info: {
          DEFAULT: "#2196f3",
          light: "#e7f7ff",
          "dark-light": "rgba(33,150,243,.15)",
        },
        dark: {
          DEFAULT: "#3b3f5c",
          light: "#eaeaec",
          "dark-light": "rgba(59,63,92,.15)",
        },
        black: {
          DEFAULT: "#0e1726",
          light: "#e3e4eb",
          "dark-light": "rgba(14,23,38,.15)",
        },
        white: {
          DEFAULT: "#ffffff",
          light: "#e0e6ed",
          dark: "#888ea8",
        },
      },
      spacing: {
        4.5: "18px",
      },
      boxShadow: {
        "3xl":
          "0 2px 2px rgb(224 230 237 / 46%), 1px 6px 7px rgb(224 230 237 / 46%)",
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            "--tw-prose-invert-headings": theme("colors.white.dark"),
            "--tw-prose-invert-links": theme("colors.white.dark"),
            h1: { fontSize: "40px", marginBottom: "0.5rem", marginTop: 0 },
            h2: { fontSize: "32px", marginBottom: "0.5rem", marginTop: 0 },
            h3: { fontSize: "28px", marginBottom: "0.5rem", marginTop: 0 },
            h4: { fontSize: "24px", marginBottom: "0.5rem", marginTop: 0 },
            h5: { fontSize: "20px", marginBottom: "0.5rem", marginTop: 0 },
            h6: { fontSize: "16px", marginBottom: "0.5rem", marginTop: 0 },
            p: { marginBottom: "0.5rem", fontFamily: ["Inter", "sans-serif"] },
            li: { margin: 0 },
            img: { margin: 0 },
          },
        },
      }),
      backgroundImage: {
        "hero-pattern":
          "linear-gradient(180deg, #043B3B 0%, rgba(4, 59, 59, 0.5) 53.47%, #043B3B 100%), url('/assets/bg-2.png')",
          "bgarabic": "linear-gradient(180deg, rgba(4, 59, 59, 0) 50%, rgba(4, 59, 59, 0.7) 80%, #043B3B 100%), url('/assets/bg-arbic.png')",
          "bottomPic": "linear-gradient(180deg, #043B3B 0%, rgba(4, 59, 59, 0.5) 53.47%, #043B3B 100%), url('/assets/bottomPic.png')",
        
        },
      container: {
        center: true,
        padding: {
          DEFAULT: "4rem",
          sm: "12rem",
          lg: "5rem",
          xl: "10rem",
        },
        screens: {
          lg: "90.375rem",
        },
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],

};
