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
      },
      "/balance": {
        target: "https://2k0ic4z7s5.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/balance/, "/default/balance")
      },
      "/transferList": {
        target: "https://n0qaa2fx3c.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/transferList/, "/default/transferList")
      },
      "/transfer": {
        target: "https://ofqx4zxgcf.execute-api.us-east-1.amazonaws.com",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/transfer/, "/default/transfer")
      }
    }
  }
});
