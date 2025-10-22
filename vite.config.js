// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  // Use PostCSS configuration instead (which is defined in postcss.config.js)
  plugins: [react()], 
});