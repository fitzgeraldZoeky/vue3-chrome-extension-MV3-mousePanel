<template>
  <canvas id="txw-panel" width="200" height="200" class="default-txw-panel" :style="canvasPanel"></canvas>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, reactive, defineProps, watch } from 'vue'
import { getIcon } from '../utils/Tools'
import { useChromeurlStore } from '../store/useChromeurlStore'
import { useFishStore } from '../store/useFishStore'
import { usePanelStore } from '../store/usePanelStore'
import { useWeatherStore } from '../store/useWeatherStore'

let chromeurlStore = null

const fishStore = useFishStore()
const panelStore = usePanelStore()
const weatherStore = useWeatherStore()
// const { funcIcons } = defineProps({
//   funcIcons: {
//     type: Object,
//     required: true
//   }
// });

let clientX = ref()
let clientY = ref()
let canvasPanel = reactive({
  visibility: 'hidden',
  top: 0,
  left: 0
})
let realcanvas = {} // canvas DOM

// 激活的功能类型
let funcType = {
  type: null
}
// 自定义事件位置信息，木鱼功能需要
let position = {
  x: null,
  y: null
}
// 注册自定义事件传递激活的功能
const enableFunc = new CustomEvent('enableFunc', { detail: {funcType, position} })

onBeforeMount(() => {
  chromeurlStore = useChromeurlStore()
// 注册自定义监听器
  document.addEventListener('displayPanel', handleDisplayPanel)
  document.addEventListener('mousemoving', handleMousemoving)
  document.addEventListener('cancelPanel', handleCancelPanel)
})

onMounted(() => {
  realcanvas = document.getElementById('txw-panel')
  drawRing(realcanvas)
})

// 设置面板激活状态
let panelStatus = ref(false)
function handleCancelPanel(event) {
  // 重置绘图的数据信息
  panelStatus.value = false
  clientX.value = null
  clientY.value = null
  canvasPanel.visibility = 'hidden'
  canvasPanel.top = 0
  canvasPanel.left = 0
}

// flag 只绘制一次
let currentQuadrant = ref()
let needDraw = true
watch(currentQuadrant, () => {
  needDraw = true
})
// 判断激活功能区域和交互效果
function handleMousemoving(event) {
  if(!panelStatus.value) return // 没有激活面板，或者面板失效状态时，不做处理
  const current = event.detail
  currentQuadrant.value = quadrantCharge(current)
  if (event.detail.concern) {
    // 最终鼠标抬起的位置，根据这个判断选择的功能
    // 之后隐藏panel，能够判断选择的区域则执行功能，不能判断区域的直接隐藏
    if (currentQuadrant.value > 0) {
      position.x = null
      position.y = null
      // 动效
      switch (currentQuadrant.value) {
        case 1:
          // 激活复制功能
          funcType.type = 'copy'
          break
        case 2:
          funcType.type = 'paste'
          break
        case 3:
          funcType.type = 'hangingon'
          position.x = current.x
          position.y = current.y
          break
        case 4:
          // funcType.type = 'snap'
          funcType.type = 'weather'
          position.x = current.x
          position.y = current.y
          break
      }
      document.dispatchEvent(enableFunc)
    }
    // 重置
    handleCancelPanel()
  } else {
    // 鼠标在移动，实现互动效果
    // 🦖🦖🦖选择困难中.......
    if (!needDraw) return
    const canvas = document.getElementById('txw-panel')
    drawScale(currentQuadrant.value, realcanvas)
    needDraw = false
  }
}

// 绘制特定象限的动效
function drawScale(quadrant, canvas) {
  const ctx = canvas.getContext('2d')
  switch (quadrant) {
    case 1:
      scaleQuadrant(quadrant, ctx)
      break
    case 2:
      scaleQuadrant(quadrant, ctx)
      break
    case 3:
      scaleQuadrant(quadrant, ctx)
      break
    case 4:
      scaleQuadrant(quadrant, ctx)
      break
  }

  function scaleQuadrant(index, ctx) {
    drawRing(realcanvas) //执行顺序很有趣
    let i = getScaleIndex(index)
    // const img = getIcon(funcIcons[i])11111111111111111
    const img = getIcon(chromeurlStore.funcs[i])   
    console.log()
    img.onload = function onloadScale() {
      clearQuadrant(index, ctx)
      // 顺时针绘制，所以象限和index的对应关系 Q1--3, Q2---0, Q3---1, Q4---2
      ctx.strokeStyle = '#FFD700'
      ctx.lineWidth = 20
      ctx.lineCap = "round";
      ctx.save()
      ctx.shadowOffsetX = 3;
      ctx.shadowOffsetY = 3;
      ctx.shadowBlur = 2;
      ctx.shadowColor = "#71C671"
      ctx.beginPath()
      let a = 0.5 * (i + 0.2) * Math.PI
      let b = 0.5 * (i + 0.8) * Math.PI
      ctx.arc(100, 100, 50, a, b)
      ctx.scale(1.5, 1.5)
      ctx.stroke()
      // 加上大 icon
      ctx.restore()
      // i --- 象限---> 0--Q2 1--Q3 2--Q4 3--Q1
      let { c, d } = getImageXY(i, 1)
      ctx.drawImage(img, c , d, 20, 20)
    }
    ctx.restore()
  }
}
// 定位
function getScaleIndex(index) {
  let i = 0
    switch (index) {
      case 1:
        i = 3
        break
      case 2:
        i = 0
        break
      case 3:
        i = 1
        break
      case 4:
        i = 2
        break
    }
  return i
}

// 擦除象限区域
function clearQuadrant(index, ctx) {
  switch (index) {
    case 1:
      ctx.clearRect(100, 0, 100, 100)
      break
    case 2:
      ctx.clearRect(100, 100, 100, 100)
      break
    case 3:
      ctx.clearRect(0, 100, 100, 100)
      break
    case 4:
      ctx.clearRect(0, 0, 100, 100)
      break
  }
}

// 设置象限 
function quadrantCharge(current) {
  // 第一象限
  if (current.x  > origin.x && current.y < origin.y) {
    return 1
  }
   // 第二象限
   else if (current.x  > origin.x && current.y > origin.y) {
    return 2
  }
   // 第三象限
   else if (current.x  < origin.x && current.y > origin.y) {
    return 3
  }
   // 第四象限
   else if (current.x  < origin.x && current.y < origin.y) {
    return 4
  } else {
    // 走位风骚的不管
    return -1
  }
}

// 原点坐标
let origin = reactive({})
// panel初始位置
function handleDisplayPanel(event) {
  // 激活显示panel
  fishStore.hide()
  weatherStore.hide()
  panelStore.display()
  panelStatus.value = true
  clientX.value = event.detail.x
  clientY.value = event.detail.y
  canvasPanel.visibility = 'visible'
  canvasPanel.top = clientY.value - 100 + 'px'
  canvasPanel.left = clientX.value - 100 + 'px'
  origin.x = event.detail.x
  origin.y = event.detail.y
}

// 绘制工具panel
function drawRing(canvas) {
  const ctx = canvas.getContext('2d')
  ctx.clearRect(0, 0, 200, 200)
  for(let i = 0; i < 4; i++) {
    ctx.strokeStyle = '#CDC8B1'
    ctx.lineWidth = 20
    ctx.lineCap = "round";
    ctx.save() //设置阴影前保存一下,后面图标不需要阴影
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(10, 10, 10, 0.3)";
    ctx.beginPath();
    let a = 0.5 * (i + 0.2) * Math.PI
    let b = 0.5 * (i + 0.8) * Math.PI
    ctx.arc(100, 100, 50, a, b);
    ctx.stroke();
    // 加上icon,不加阴影
    ctx.restore()
    // const img = getIcon(funcIcons[i])1111111111111
    const img = getIcon(chromeurlStore.funcs[i]) 
    img.onload = function onloadRing() {
      // i --- 象限---> 0--Q2 1--Q3 2--Q4 3--Q1
      let { c, d } = getImageXY(i, -1)
      ctx.drawImage(img, c , d, 15, 15)
    }
    // ctx.save() // 保存状态
  }
}

function getImageXY(index, type) {
  let c, d
  if (type === -1) {
    switch(index) {
    case 0:
      c = d = 150 - 22
      break
    case 1:
      c = 50 + 8
      d = 150 - 22
      break
    case 2:
      c = d = 50 + 7
      break
    case 3:
      c = 150 - 22
      d = 50 + 8
      break
    }
    return { c, d }
  } else {
    switch(index) {
    case 0:
      c = d = 150 - 24
      break
    case 1:
      c = 50 + 8
      d = 150 - 24
      break
    case 2:
      c = d = 50 + 4
      break
    case 3:
      c = 150 - 22
      d = 50 + 8
      break
    }
    return { c, d }
  }
  
}

</script>
<style scoped>
.default-txw-panel {
  position: fixed;
  z-index: 999;
}
/* #txw-panel {
  border: 1px solid black;
} */
</style>
