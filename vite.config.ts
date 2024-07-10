import path from "path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      "/kapi": {
        target: "http://ks-apiserver.kubesphere-system",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/kapi/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})
