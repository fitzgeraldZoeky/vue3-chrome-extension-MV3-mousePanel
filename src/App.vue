
<template>
  <!-- <div>
    <img :src="logoUrl" alt="logo-supre-mouse"/>

  </div> -->
  <!-- <HelloWorld :func-icons="funcs" :transform-icons="tfuncs" /> -->
  <HelloWorld v-if="panelStore.showPanel" />
  <Fish v-if="fishStore.showFish" />
  <Weather v-if="weatherStore.showWeather" />
</template>
<script setup>
import HelloWorld from './components/HelloWorld.vue'
import Fish from './components/Funcs/Woodenfish.vue'
import Weather from './components/Funcs/Weather.vue'

// import { onBeforeMount, ref } from 'vue'

import logo from './assets/icons/icon-128.png'
import copy from './assets/icons/copy-32.png'
import paste from './assets/icons/paste-32.png'
import weather from './assets/icons/weather-32.png'
import hangingon from './assets/icons/hanging-32.png'
// import woodfish from './assets/icons/woodfish-32.png'
import woodfish from './assets/icons/woodfish-200.svg'
import woodfishMp3 from './assets/mp3/woodfish.mp3'
import snap from './assets/icons/snap-32.png'

import { useChromeurlStore } from './store/useChromeurlStore'
import { useFishStore } from './store/useFishStore'
import { usePanelStore } from './store/usePanelStore'
import { useWeatherStore } from './store/useWeatherStore'

// 扩展中  content.js 相当于 main.js 
// main.js 实际上不会被执行，可能可以通过设置 manifest 来执行
// main.js 引入 app.vue 之后执行 app.vue，所以在这里调用 pinia 会有问题，这个时候 pinia 还没有创建实例
const chromeurlStore = useChromeurlStore()
const fishStore = useFishStore()
const panelStore = usePanelStore()
const weatherStore = useWeatherStore()

// // 试验 pinia 是否可行
// // 不行，pinia 注册有问题
chromeurlStore.setChromeURL(paste, 0, 'paste')
chromeurlStore.setChromeURL(hangingon, 1, 'hangingon')
// chromeurlStore.setChromeURL(snap, 2, 'snap')
chromeurlStore.setChromeURL(weather, 2, 'weather')
chromeurlStore.setChromeURL(copy, 3, 'copy')
chromeurlStore.setChromeURL(woodfish, -1, 'woodfish')
chromeurlStore.setChromeURL(woodfishMp3, -1, 'woodfish', 'mp3') // 添加 MP3 资源
// const logoUrl = chrome.runtime.getURL(logo)
// const woodenfish = chrome.runtime.getURL(woodfish)
// // chromeurlStore.setChromeURL(paste, 0)
// // chromeurlStore.setChromeURL(hangingon, 1)
// // chromeurlStore.setChromeURL(snap, 2)
// // chromeurlStore.setChromeURL(copy, 3)
// 注册 icons
// 直接用src的存放路径浏览器是解析不到资源的
// 加载资源会有问题 
// 同时注册了使用的功能,为以后拓展功能做准备
// const funcs = {}
// const tfuncs = {} // 互动变化的 icon
// funcs[0] = chrome.runtime.getURL(paste)
// // funcs[1] = chrome.runtime.getURL(weather)
// funcs[1] = chrome.runtime.getURL(hangingon)
// funcs[2] = chrome.runtime.getURL(snap)
// funcs[3] = chrome.runtime.getURL(copy)

// onBeforeMount(() => {
//   setChromeURL(paste, 0)
//   setChromeURL(hangingon, 1)
//   setChromeURL(snap, 2)
//   setChromeURL(copy, 3)
//   setChromeURL(woodfish, -1)
//   console.log('🐟', funcs, tfuncs)
// })


// function setChromeURL(item, index) {
//   const absUrl = chrome.runtime.getURL(item)
//   tfuncs.item = absUrl
//   if (index >= 0) { funcs[index] = absUrl }
// }

</script>


<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>./store/useChromeurlStore.js
