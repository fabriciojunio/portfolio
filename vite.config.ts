import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  esbuild: {
    drop: ["console", "debugger"],
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor-react':  ['react', 'react-dom'],
          'vendor-motion': ['framer-motion'],
        },
      },
    },
  },
});
