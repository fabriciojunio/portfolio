import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
    target: "es2022",
  },
  build: {
    sourcemap: false,
    target: "es2022",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("monaco-editor")) return "vendor-monaco";
          if (id.includes("@monaco-editor")) return "vendor-monaco";
          if (id.includes("react-dom")) return "vendor-react";
          if (id.includes("node_modules/react/")) return "vendor-react";
        },
      },
    },
    chunkSizeWarningLimit: 1200,
  },
  worker: {
    format: "es",
  },
});
