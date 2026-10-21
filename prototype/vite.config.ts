import { readFileSync } from 'node:fs'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

function inlineFavicon(): Plugin {
  const svg = readFileSync(new URL('./src/assets/favicon.svg', import.meta.url), 'utf8')
  return {
    name: 'inline-favicon',
    apply: 'build',
    transformIndexHtml: {
      order: 'pre',
      handler: (html) =>
        html.replace('href="./src/assets/favicon.svg"', `href="data:image/svg+xml,${encodeURIComponent(svg)}"`),
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), inlineFavicon(), viteSingleFile()],
  // so the app opens from any folder
  base: './',
})
