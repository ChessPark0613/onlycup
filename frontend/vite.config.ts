import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    proxy: {
      "/api": { target: "http://app:8080", changeOrigin: true } // springboot-app
    }
  },
  build: { outDir: "dist" }
});
