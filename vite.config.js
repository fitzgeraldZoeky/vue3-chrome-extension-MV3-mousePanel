import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// crxjs 配置引入  --- start
import { crx } from '@crxjs/vite-plugin'
import manifest from './manifest.json' // Node 14 & 16
// import manifest from './manifest.json' assert { type: 'json' } // node >= 17
// ---end
// element-plus 按需引入
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
    vue(),
    crx({ manifest })
  ],
})
