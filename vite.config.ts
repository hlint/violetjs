import path from "node:path";
import { lingui } from "@lingui/vite-plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import { VitePWA } from "vite-plugin-pwa";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    VitePWA({
      registerType: "autoUpdate",
      pwaAssets: {
        image: "public/favicon.png",
        preset: {
          transparent: {
            sizes: [64, 192, 512],
            favicons: [[48, "favicon.ico"]],
            padding: 0,
          },
          maskable: {
            sizes: [512],
            padding: 0,
          },
          apple: {
            sizes: [180],
            padding: 0,
          },
        },
      },
      devOptions: {
        enabled: true,
      },
      manifest: {
        name: "VioletJS",
        short_name: "VioletJS",
        start_url: "/",
        display: "standalone",
        background_color: "#392449",
        theme_color: "#392449",
      },
      workbox: {
        globPatterns: ["**/*.{js,css,wasm,ico,png,svg,ttf,woff,woff2}"],
        navigateFallback: null,
      },
    }),
    react({
      plugins: [["@lingui/swc-plugin", {}]],
    }),
    tailwindcss(),
    lingui(),
  ],
  server: {
    hmr: {
      overlay: true,
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    copyPublicDir: false,
  },
});
