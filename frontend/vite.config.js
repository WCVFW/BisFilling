import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    host: true,
    port: 5173,
    hmr: {
      overlay: false, // prevent fullscreen error overlays
    },
    watch: {
      // Enable polling so Vite detects changes in OneDrive
      usePolling: true,
      interval: 1000, // check for changes every second
      ignored: [
        '**/node_modules/**',
        '**/.git/**',
        '**/*.tmp',
        '**/*.TMP',
        '**/desktop.ini',
      ],
    },
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        changeOrigin: true,
        secure: false,
      },
    },
  },

  // ✅ Suppress source map warnings for third-party CSS
  build: {
    sourcemap: true,
    rollupOptions: {
      onwarn(warning, warn) {
        // Suppress warnings about missing source maps for third-party CSS
        if (warning.code === 'SOURCEMAP_ERROR' && warning.message.includes('bootstrap.min.css.map')) {
          return;
        }
        warn(warning);
      },
    },
  },
  css: {
    devSourcemap: false, // disable CSS sourcemap in dev
  },
});
