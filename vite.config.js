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
  host: true,   // 0.0.0.0 bhi chalega
  port: 5176,
  strictPort: true,
  allowedHosts: ["ataloptical.org", "www.ataloptical.org"],
  hmr: {
    protocol: "wss",
    host: "ataloptical.org",
    clientPort: 443   // important: browser WSS over HTTPS
  }
}

}));

