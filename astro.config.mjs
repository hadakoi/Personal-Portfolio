import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://hadakoi.tech',

  build: {
    inlineStylesheets: 'auto',
  },

  compressHTML: true,

  prefetch: {
    prefetchAll: true,
    defaultStrategy: 'viewport',
  },

  server: {
    port: 4321,
    host: true,
  },

  vite: {
    build: {
      sourcemap: false,
      minify: 'esbuild',
      cssCodeSplit: true,
    },
    css: {
      devSourcemap: true,
    },
  },
});
