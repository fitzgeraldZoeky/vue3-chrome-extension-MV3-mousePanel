import { createApp } from 'vue'
import App from './App.vue'
import copy from './utils/Func-copy.js'
import paste from './utils/Func-paste.js'
import readme from './utils/Func-readme.js'
import snap from './utils/Func-snap.js'

// 功能路径
const funcs = {
  copy,
  paste,
  readme,
  snap
}

let keyFlag = false
let detail = {
  x: null, //点击的位置---初始化位置
  y: null,
  tab: {}
}
// 鼠标再点击按住后移动的位置
let mousemove = {
  x: null,
  y: null,
  concern: false
}
// 设置鼠标移动判断标志位
let mousemoveable = false 

// 注册自定义监听器，监听 vue 文件传递的激活功能信息
document.addEventListener('enableFunc', handleEnableFunc)
function handleEnableFunc(event) {
  const type = event.detail.type
  console.log('🪠🪠🪠', type)
  funcs[type]()
}


// 注册自定义事件传递鼠标移动数据
const mousemoving = new CustomEvent('mousemoving', { detail: mousemove })
// 注册鼠标移动事件，记录鼠标移动的位置，用于判断激活那个区域的功能和交互效果
document.addEventListener('mousemove', (e) => {
  if (!mousemoveable) return
  // 当按键按下，鼠标移动时，表示正在选择功能
  // 如果松开按键，表示取消选择
  // 如果松开鼠标，表示确认选择
  // console.log('🐰🐰🐰', mousemoveable, e)
  mousemove.x = e.clientX
  mousemove.y = e.clientY
  mousemove.concern = false
  document.dispatchEvent(mousemoving)

})

// 抬起鼠标确定判断
document.addEventListener('mouseup', (e) => {
  if (cancel) return
  mousemoveable = false
  mousemove.x = e.clientX
  mousemove.y = e.clientY
  mousemove.concern = true
  document.dispatchEvent(mousemoving) //最终的数据，用来确定选择的功能
  
})

// 监听鼠标按下事件
document.addEventListener('mousedown', (e) => { 
  keyFlag && !cancel && e.preventDefault()
  if (e.button === 0 && !cancel) { // 如果按下的是左键
    if (keyFlag) {
      // 触发显示,获取鼠标位置信息？
      detail.x = e.clientX
      detail.y = e.clientY
      // 触发自定义事件，将参数传给vue
      document.dispatchEvent(displayPanel)
      // chrome.runtime.sendMessage({ action: 'showPanel' }) // 发送消息到后台，请求显示面板
      mousemoveable = true
      keyFlag = false // 重置flag
      // 重置 detail
      detail.tab = {}
      detail.x = null
      detail.y = null
  }
  }
})

// 注册自定义事件用来给vue组件传递渲染所需要的数据
const displayPanel = new CustomEvent('displayPanel', { detail })

// 添加鼠标点击事件监听器，激活工具环
// 监听键盘组合事件不能这样写，因为这个监听一次只会触发一个事件，不能同时捕捉到 两个键盘的事件
// 监听的事件放到 service-worker 里面，监听浏览器全局的键盘事件，然后通知内容脚本，显示panel

// 需要结合keydown/up 判断按键是否处于按下状态
let down = false
let up = true
// 注册自定义事件取消显示功能panel
const cancelPanel = new CustomEvent('cancelPanel')
document.addEventListener('keydown', (e) => {
  // 用code可以避免大小写问题
  if (e.code === 'KeyZ' || e.key === 'Control' || e.key === 'Shift') {
    down = true
    up = false
  } else {
    down = false
    up = true
  }
})
let cancel = true // 取消面板显示
document.addEventListener('keyup', (e) => {
  if (e.code === 'KeyZ' || e.key === 'Control' || e.key === 'Shift') {
    down = false
    up = true
    // 松开按键表示取消选择功能，这时panel消失。
    document.dispatchEvent(cancelPanel)
    cancel = true
  }
})

chrome.runtime.onMessage.addListener(({action, tab}) => {
  if (action === 'showPanel' && !up && down) {
    keyFlag = true
    cancel = false
    detail.tab = tab
}
})


// 添加一个根元素，这个就是 shadow DOM 的 root element
// 这个根元素就是插件为页面添加的内容
const root = document.createElement('div')
root.id = 'crx-root'
document.body.append(root)

const app = createApp(App)
app.mount(root)

