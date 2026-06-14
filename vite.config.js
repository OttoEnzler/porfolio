import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// 'base' debe coincidir con el nombre del repositorio de GitHub Pages.
export default defineConfig({
  base: "/porfolio/",
  plugins: [react()],
  test: {
    environment: "node",
    include: ["src/**/*.test.{js,jsx}"],
  },
});
