import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig, searchForWorkspaceRoot } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import dotenv from 'dotenv';

dotenv.config();

export default defineConfig({
  plugins: [sveltekit() /*basicSsl()*/],
  define: {
    'process.env': process.env
  },
  server: {
    fs: {
      // Allow serving files from one level up to the project root
      allow: [searchForWorkspaceRoot(process.cwd()), '/packages/hello_world/dist', '/dist/widget']
    }
    // similar to https://www.storyblok.com/faq/setting-up-https-on-localhost-in-astro
    // (necessary to work with Freighter wallet locally, in conjunction with basicSsl() plugin)
    // https: true
  }
});
