// 天气
import { useFishStore } from '../store/useFishStore'
import { usePanelStore } from '../store/usePanelStore'
import { useWeatherStore } from '../store/useWeatherStore'

export default function(payload) {
    const weatherStore = useWeatherStore()
    const fishStore = useFishStore()
    const panelStore = usePanelStore()
    const url = 'https://api.oioweb.cn/api/weather/GetWeather'
    // 监听 天气 激活事件，更新位置参数
    weatherStore.setPosition(payload.x, payload.y)
    panelStore.hide()
    // 处理天气请求
    async function getWeather() {
        try {
            weatherStore.setLoading(true)
            const res = await fetch(url)
            const response = await res.json()
            if (response.code === 500) {
                throw new Error(`HTTP error! status: ${response.msg}`)
            }
            // 由于返回的是文本信息，展示以文字的方式，更新 pinia 天气信息
            weatherStore.setWeather(response.result)
            weatherStore.display()
        } catch (e) {
            console.log(e)
            weatherStore.setError('请求过于频繁')
            weatherStore.display()
        } finally {
            weatherStore.setLoading(false)
        }
    }
    getWeather()
}
