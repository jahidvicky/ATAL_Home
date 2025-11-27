import path from "path";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(({ mode }) => ({
  plugins: [react(), tailwindcss()],
  assetsInclude: ["**/*.glb"],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },

  server: {
    host: "0.0.0.0",
    port: 5176,
    allowedHosts: ["ataloptical.org", "www.ataloptical.org"],
    strictPort: true,

    hmr:
      mode === "development"
        ? {
          protocol: "ws",
          host: "localhost",
          port: 5176,
        }
        : {
          protocol: "wss",
          host: "ataloptical.org",
          port: 5176,
        },
  },
}))

