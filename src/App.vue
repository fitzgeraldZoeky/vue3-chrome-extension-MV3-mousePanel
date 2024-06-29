<script setup>
import HelloWorld from './components/HelloWorld.vue'
import logo from './assets/icons/icon-128.png'
import copy from './assets/icons/copy-32.png'
import paste from './assets/icons/paste-32.png'
import weather from './assets/icons/weather-32.png'
import snap from './assets/icons/snap-32.png'

const logoUrl = chrome.runtime.getURL(logo)
// 注册 icons
// 直接用src的存放路径浏览器是解析不到资源的
// 加载资源会有问题 
// 同时注册了使用的功能,为以后拓展功能做准备
const funcs = {}
funcs[0] = chrome.runtime.getURL(paste)
funcs[1] = chrome.runtime.getURL(weather)
funcs[2] = chrome.runtime.getURL(snap)
funcs[3] = chrome.runtime.getURL(copy)

</script>

<template>
  <!-- <div>
    <img :src="logoUrl" alt="logo-supre-mouse"/>

  </div> -->
  <HelloWorld :func-icons="funcs"/>
</template>

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
</style>
