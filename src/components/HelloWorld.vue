<template>
  <canvas id="txw-panel" width="200" height="200" class="default-txw-panel" :style="canvasPanel"></canvas>
</template>
<script setup>
import { ref, onMounted, onBeforeMount, reactive} from 'vue'

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
// 注册自定义事件传递激活的功能
const enableFunc = new CustomEvent('enableFunc', { detail: funcType })

// 注册自定义监听器
onBeforeMount(() => {
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
  // console.log('取消显示', event)
  // 重置绘图的数据信息
  panelStatus.value = false
  clientX.value = null
  clientY.value = null
  canvasPanel.visibility = 'hidden'
  canvasPanel.top = 0
  canvasPanel.left = 0
}

// 判断激活功能区域和交互效果
function handleMousemoving(event) {
  if(!panelStatus.value) return // 没有激活面板，或者面板失效状态时，不做处理
  const current = event.detail
  const currentQuadrant = quadrantCharge(current)
  if (event.detail.concern) {
    // 最终鼠标抬起的位置，根据这个判断选择的功能
    // 之后隐藏panel，能够判断选择的区域则执行功能，不能判断区域的直接隐藏
    console.log('最终的选择  🈴🈴🈴', currentQuadrant)
    if (currentQuadrant > 0) {
      // 动效
      switch (currentQuadrant) {
        case 1:
          // 激活复制功能
          funcType.type = 'copy'
          console.log('🤦‍♂️复制   1')
          break
        case 2:
          funcType.type = 'paste'
          console.log('🦀粘贴   2')
          break
        case 3:
          funcType.type = 'readme'
          console.log('🐻‍❄️readme   3')
          break
        case 4:
          funcType.type = 'snap'
          console.log('🤺截图   4')
          break
      }
      document.dispatchEvent(enableFunc)
    }
    // 重置
    handleCancelPanel()
  } else {
    // 鼠标在移动，实现互动效果
    // 🦖🦖🦖选择困难中.......
    const canvas = document.getElementById('txw-panel')
    drawScale(currentQuadrant, realcanvas)
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
    drawRing(realcanvas)
    let i = 0
    switch (index) {
      case 1:
        ctx.clearRect(100, 0, 100, 100)
        i = 3
        break
      case 2:
        ctx.clearRect(100, 100, 100, 100)
        i = 0
        break
      case 3:
        ctx.clearRect(0, 100, 100, 100)
        i = 1
        break
      case 4:
        ctx.clearRect(0, 0, 100, 100)
        i = 2
        break
    }
    // console.log('👽👽', i)
    // 顺时针绘制，所以象限和index的对应关系 Q1--3, Q2---0, Q3---1, Q4---2
    ctx.strokeStyle = '#FFD700'
    ctx.shadowColor = "#71C671"
    ctx.beginPath()
    let a = 0.5 * (i + 0.2) * Math.PI
    let b = 0.5 * (i + 0.8) * Math.PI
    ctx.arc(100, 100, 50, a, b)
    ctx.scale(1.5, 1.5)
    ctx.stroke()
    ctx.restore()
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
    ctx.shadowOffsetX = 3;
    ctx.shadowOffsetY = 3;
    ctx.shadowBlur = 2;
    ctx.shadowColor = "rgba(10, 10, 10, 0.3)";
    ctx.beginPath();
    let a = 0.5 * (i + 0.2) * Math.PI
    let b = 0.5 * (i + 0.8) * Math.PI
    ctx.arc(100, 100, 50, a, b);
    ctx.stroke();
    ctx.save() // 保存状态
  }
}

</script>
<style scoped>
.default-txw-panel {
  position: fixed;
  z-index: 999;
}
#txw-panel {
  border: 1px solid black;
}
</style>
