import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src")
    }
  },
  server: {
    proxy: {
      "/login": {
        target: "https://qf5k9fspl0.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/login/, "/default/login")
      }
    }
  }
});
