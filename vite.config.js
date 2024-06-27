import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// crxjs 配置引入  --- start
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' // Node 14 & 16
// import manifest from './manifest.json' assert { type: 'json' } // node >= 17
// ---end


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    crx({ manifest })
  ],
})
