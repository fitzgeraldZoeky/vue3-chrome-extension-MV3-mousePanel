import { defineStore } from 'pinia'

// 你可以任意命名 `defineStore()` 的返回值，但最好使用 store 的名字，同时以 `use` 开头且以 `Store` 结尾。
// (比如 `useUserStore`，`useCartStore`，`useProductStore`)
// 第一个参数是你的应用中 Store 的唯一 ID。
export const useChromeurlStore = defineStore('chromeurl', {
  // 其他配置...
  // 类似data
  state: () => ({
    iconUrls: {},
    mp3Urls: {},
    funcs: {},
    showPanel: true
  }),
  // // 类似computed
  // getters: {

  // },
  // 可以异步
  actions: {
    /**
     * item 为 icon 对象,保存icon 路径
     * index 为 icon 在 panel 上的位置编号 0-3
     * @param {any} item 
     * @param {Number} index 
     * @returns 
     */
    setChromeURL(item, index, name, type = 'icon') {
      const absUrl = chrome.runtime.getURL(item)
      if (type === 'icon') {
        this.iconUrls[name] = absUrl
        if (index >= 0) { this.funcs[index] = absUrl }
      } else if (type === 'mp3') {
        this.mp3Urls[name] = absUrl
      }
      
    },
    display() {
      this.showPanel = true
    },
    hide() {
      this.showPanel = false
    }
  }
})