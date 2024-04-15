import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    strictPort: true,
    port: 5000,
  },
  root: ".", // Make sure this points to the directory containing `index.html`
  build: {
    rollupOptions: {
      input: "./index.html", // Path to your entry file
    },
  },
});
