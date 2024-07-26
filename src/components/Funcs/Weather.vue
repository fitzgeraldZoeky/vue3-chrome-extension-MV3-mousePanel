<template>
    <Loading v-if="loading || weatherStore.loading || weatherStore.success" class="weather" :style="loadingStyle" />
    <div v-if="weatherStore.success" class="weather text-focus-in" :style="weatherStyle">
        <span class="text-line">天气：{{day_weather}}</span>
        <span class="text-line">最高温：{{ max_degree }}°</span>
        <span class="text-line">最低温：{{ min_degree }}°</span>
        <span class="text-line">空气指数：{{ aqi_name }}</span>
    </div>
    <div v-else-if="!weatherStore.success" class="weather-error text-focus-in" :style="weatherStyle">
        <span class="text-line error">{{ errorMsg }}</span>
    </div>
    
</template>
  
  <script setup>
  import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
  import { useWeatherStore } from '../../store/useWeatherStore'
  import Loading from '../../assets/uieffects/Loading.vue'
  
  const url = 'https://api.oioweb.cn/api/weather/GetWeather'
  let loading = true
  let success = false
  let iserror = false
  let weatherStyle = {}
  let loadingStyle = {}
  let weatherStore = ref()
  let day_weather = ref()
  let max_degree = ref()
  let min_degree = ref()
  let aqi_name = ref()
  let errorMsg = ref()

    onBeforeMount(() => {
      weatherStore = useWeatherStore()
      weatherStyle.top = weatherStore.y + 'px'
      weatherStyle.left = weatherStore.x + 'px'
      loadingStyle.top = weatherStore.y + 'px'
      loadingStyle.left = weatherStore.x + 5 + 'px'
      day_weather = weatherStore.day_weather
      max_degree = weatherStore.max_degree
      min_degree = weatherStore.min_degree
      aqi_name = weatherStore.aqi_name
      errorMsg = weatherStore.errorMsg || ''
    })

  </script>
  
  <style scoped>
  .weather, .weather-error {
    position: fixed;
    z-index: 999;
    font-size: 20px;
    height: 40px;
    width: 150px;
  }

  .text-line {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    opacity: 0;
  }

@keyframes text-focus-in {
  0% {
    filter: blur(12px);
    opacity: 0;
  }
  60% {
    filter: blur(0px);
    opacity: 1;
  }
  61% {
    filter: blur(0.01);
  }
  100% {
    filter: blur(12px) opacity(0%);
  }
}


.text-line:nth-child(1) {
    animation: text-focus-in 3s ease-in-out 0s forwards;
  }
  .text-line:nth-child(2) {
    animation: text-focus-in 3s ease-in-out 3s forwards;
  }
  .text-line:nth-child(3) {
    animation: text-focus-in 3s ease-in-out 6s forwards;
  }
  .text-line:nth-child(4) {
    animation: text-focus-in 3s ease-in-out 9s forwards;
  }

.text-line.error {
    color: rgb(223, 101, 93);
}
  </style>