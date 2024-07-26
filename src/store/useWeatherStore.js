import { defineStore } from 'pinia'

export const useWeatherStore = defineStore('weather', {
  state: () => ({
    showWeather: false,
    city: null,
    day_weather: null,// 白天天气
    max_degree: null, // 最高温度
    min_degree: null, // 最低温度
    aqi_name: null, // 空气指数
    errorMsg: null, // 错误提示
    success: true, // 请求是否成功
    x: null,
    y: null,
    loading: true
  }),
  actions: {
    setWeather(data) {
        // city
        this.success = true
        this.city = data.city.City ? data.city.City : data.city.Province
        this.day_weather = data.condition.day_weather
        this.max_degree = data.condition.max_degree
        this.min_degree = data.condition.min_degree
        this.aqi_name = data.condition.aqi.aqi_name
    },
    setError(e) {
        this.success = false
        this.errorMsg = e
    },
    display() {
        this.showWeather = true
    },
    hide() {
        this.showWeather = false
    },
    // 更新定位
    setPosition(x, y) {
        this.x = x
        this.y = y
    },
    setLoading(status) {
        this.loading = status
    }
  }
})