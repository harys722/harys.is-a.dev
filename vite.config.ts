import { defineConfig, type Plugin } from 'vite';
import {prerender} from './scripts/prerender';

// Collapses the built index.html into a couple of lines (no comments, no extra whitespace).
const squeezeHtml = (): Plugin => ({
  name: 'squeeze-html',
  transformIndexHtml: {
    order: 'post',
    handler: (html) => html.replace(/<!--[\s\S]*?-->/g, '').replace(/>\s+</g, '><').replace(/\s*\n\s*/g, ' ').trim(),
  },
});

export default defineConfig({
  // Built files go in /app so they never collide with the old /assets folder the tool pages still use.
  build: { assetsDir: 'app', target: 'es2020' },
  plugins: [squeezeHtml(), {name:'desktop-prerender',apply:'build',closeBundle:prerender}],
});
