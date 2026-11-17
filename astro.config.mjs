// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import sitemap from '@astrojs/sitemap';
import icon from 'astro-icon';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://proxima-immigration.vercel.app',
  integrations: [react(), sitemap(), icon()],
  devToolbar: { enabled: false },
  vite: {
    plugins: [tailwindcss()],
  },
});
