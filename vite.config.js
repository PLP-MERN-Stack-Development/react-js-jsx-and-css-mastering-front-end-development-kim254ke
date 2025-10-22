import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
// REMOVED: import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // PostCSS will automatically find and run Tailwind
  plugins: [react()], 
});