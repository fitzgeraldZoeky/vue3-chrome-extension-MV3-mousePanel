<script setup>
import HelloWorld from './components/HelloWorld.vue'
import logo from './assets/icons/icon-128.png'

const logoUrl = chrome.runtime.getURL(logo)
console.log('....🤣🤣app.vue', logo, logoUrl)
</script>

<template>
  <!-- <div>
    <img :src="logoUrl" alt="logo-supre-mouse"/>
    直接用src的存放路径浏览器是解析不到资源的
    <img src="./assets/icons/icon-128.png" alt="logo"/>
  </div> -->
  <HelloWorld />
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
