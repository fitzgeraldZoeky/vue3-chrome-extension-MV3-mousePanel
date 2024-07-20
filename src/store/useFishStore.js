import { defineStore } from 'pinia'

// 摸鱼--坐标
export const useFishStore = defineStore('fish', {
  // 其他配置...
  // 类似data
  state: () => ({
    x: null,
    y: null,
    showFish: false,
  }),
  actions: {
    // 更新定位
    setPosition(x, y) {
        this.x = x
        this.y = y
    },
    // 更新显示状态
    display() {
        this.showFish = true
    },
    hide() {
        this.showFish = false
    }
  }
})