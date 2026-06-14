/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        space: { 900: "#07040f", 800: "#0e0a1f", 700: "#160f2e" },
        sun: { core: "#fff4d6", DEFAULT: "#ff8a00", edge: "#ff5e3a" },
        nebula: { magenta: "#d6409f", violet: "#7c4dff" },
        planet: "#7aa2ff",
      },
      fontFamily: {
        display: ["'Space Grotesk'", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px rgba(255,138,0,0.45)",
        "glow-planet": "0 0 24px rgba(122,162,255,0.6)",
      },
    },
  },
  plugins: [],
};
