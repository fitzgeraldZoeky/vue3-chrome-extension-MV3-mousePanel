import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import screenShort from "vue-web-screen-shot";

// 这个元素并不存在，也就是用的是 shadow DOM，一个独立的DOM树。不会和其他页面的样式结构产生影响，同时构建了JS的保护区域
// Chrome 扩展开发者而言，利用 Shadow DOM 可以构建出用户界面组件，
// 这些组件能够在不同的页面环境中保持一致的表现，而不用担心页面本身的 CSS 或 JavaScript 会意外地改变组件的行为或外观。
// createApp(App).mount('#app')
const app = createApp(App)

// 截图功能注册
app.use(screenShort, { enableWebRtc: false })
// this element doesn't exist
app.mount('#app')
