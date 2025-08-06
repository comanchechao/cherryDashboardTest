import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],

  base: "/", // This is important for correct URL paths

  build: {
    outDir: "./dist", // Output built files to a 'dist' folder
    rollupOptions: {
      input: {
        main: "./index.html",
      },
    },
  },

  server: {
    open: true,
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:3010",
        changeOrigin: true,
        secure: false,
      },
      "/auth-api": {
        target: "https://sniper.cherrybot.ai/api/v1",
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/auth-api/, ""),
      },
    },
  },

  preview: {
    port: 4173,
    host: true,
  },

  define: {
    global: "globalThis",
  },
});
