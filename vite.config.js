import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'node:path';

// Multi-page app: every root-level .html file is its own entry, so URLs match the original GitHub Pages site.
const pages = [
  'index',
  'CareFlow_Login',
  'CareFlow_Setup',
  'CareFlow_Prototype_v3',
  'CareFlow_Rostering',
  'CareFlow_Clients',
  'CareFlow_Finance',
  'CareFlow_Mobile',
];

export default defineConfig({
  base: './',
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(pages.map(p => [p, resolve(import.meta.dirname, `${p}.html`)])),
    },
  },
});
