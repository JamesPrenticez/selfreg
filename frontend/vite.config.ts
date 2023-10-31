// https://vitejs.dev/config/
/// <reference types="vitest" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import alias from '@rollup/plugin-alias';
import { VitePWA } from 'vite-plugin-pwa'
import svgr from "vite-plugin-svgr";

export default defineConfig({
  server: {
    port: 3000,
  },
  test: {
    globals: true,
    environment: "jsdom",
    coverage: {
      provider: "istanbul", // istanbul or 'c8'
    },
    setupFiles: ["src/setupTest.ts"],
  },
  plugins: [
    react(),
    svgr(),
    VitePWA({
      registerType: 'autoUpdate'
    }),
    alias({
      entries: [
        { find: '@api', replacement: '/src/api' },
        { find: '@components', replacement: '/src/components' },
        { find: '@models', replacement: '/src/models' },
        { find: '@hooks', replacement: '/src/hooks' },
        { find: '@assets', replacement: '/src/assets' },
        { find: '@mocks', replacement: '/src/mocks' },
        { find: '@redux', replacement: '/src/redux' },
        { find: '@utils', replacement: '/src/utils' },
        { find: '@constants', replacement: '/src/constants' },
      ],
    }),
  ],
});
