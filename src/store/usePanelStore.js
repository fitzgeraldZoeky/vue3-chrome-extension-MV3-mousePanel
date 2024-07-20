import { defineStore } from 'pinia'

export const usePanelStore = defineStore('panel', {
  state: () => ({
    showPanel: true
  }),
  actions: {
    display() {
      this.showPanel = true
    },
    hide() {
      this.showPanel = false
    }
  }
})