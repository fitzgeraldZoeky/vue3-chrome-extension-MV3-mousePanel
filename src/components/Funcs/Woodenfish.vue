<template>
  <canvas id="woodfish" ref="woodfish" :width="windowWidth" :height="windowHeight" class="woodfish" :style="fishStyle"></canvas>
</template>

<script setup>
import { ref, reactive, onBeforeMount, onMounted, onBeforeUnmount } from 'vue'
import { useChromeurlStore } from '../../store/useChromeurlStore'
import { useFishStore } from '../../store/useFishStore'
import { usePanelStore } from '../../store/usePanelStore'

// defineProps({
//   msg: String,
// })

// const count = ref(0)

const chromeurlStore = useChromeurlStore()
const fishStore = useFishStore()
const panelStore = usePanelStore()
let windowWidth = ref()
let windowHeight = ref()
let src = ref()
let mp3 = ref()
// 声明canvas
const woodfish = ref(null)
// 声明canvas 2d对象
let ctx = null
const img = new Image()
const ado = new Audio()
// fish时长控制器
let timer = null

onBeforeMount(() => {
  // 将canvas布满整个浏览器窗口
  windowWidth.value = window.innerWidth
  windowHeight.value = window.innerHeight
  src.value = chromeurlStore.iconUrls.woodfish
  mp3.value = chromeurlStore.mp3Urls.woodfish
})
onMounted(() => {
  ado.src = mp3.value
  ado.load()
  ctx = woodfish.value.getContext('2d')
  // 显示木鱼，隐藏panel
  panelStore.hide()
  fishStore.display()
  fishStyle.visibility = 'visible'
  img.src = src.value
  img.onload = function () {
    drawFish()
  }
  // 鼠标追踪
  document.addEventListener('mousemove', handleMousemove)
  // 注册鼠标点击事件监听器，
  // 监听未操作时间，如果超过3秒就自动消失，然后重置panle和fish的状态
  document.addEventListener('click', handleClick)
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('mousemove', handleMousemove)
})

// 功德+1
const duration = 2000 // 动画持续时间，单位：毫秒
const startTime = performance.now() // 动画开始时间
let textY = 0
function loop(currentTime) {
  if(textY > 24) {
    textY = 0
    return
  }
  const x = fishStore.x - 25 > 0 ? fishStore.x - 25 : fishStore.x -25
  const y = fishStore.y - 50 - textY > 0 ? fishStore.y - 30 - textY : -textY 
  const progress = Math.min(textY / 24, 1)
  const currentAlpha = 1 - progress
  // 设置文字颜色和透明度
  ctx.fillStyle = `rgba(0, 0, 0, ${currentAlpha})`
  // 计算时间比例
  // y + textY清除上一个位置
  ctx.clearRect(x, y - 15, 140, 17)
  textY += 0.4
  ctx.font = "bold 15px Arial"
  ctx.fillText('功德 + 1', x, y, 140)
  if (textY < 25) requestAnimationFrame(loop)
}

// canvas 样式
let fishStyle = reactive({
  visibility: 'hidden',
  top: 0,
  left: 0,
  position: 'fixed'
})

function drawFish(scale = 1) {
  const x = fishStore.x - 25 > 0 ? fishStore.x - 25 : fishStore.x
  const y = fishStore.y - 25 > 0 ? fishStore.y - 25 : fishStore.y
  ctx.clearRect(0, 0, windowWidth.value, windowHeight.value)
  ctx.drawImage(img, x, y, 50 * scale, 50 * scale)
}


// 销毁
function destroyFish() {
  document.removeEventListener('click', handleClick)
  document.removeEventListener('click')
  document.removeEventListener('click')
}

function handleMousemove(e) {
    clearTimeout(timer)
    fishStore.setPosition(e.clientX, e.clientY)
    if (fishStore.showFish) {
      // 追踪绘制
      drawFish()
    }
    timer = setTimeout(() => {
      fishStore.hide()
      panelStore.display() // display只是设置panel可以被渲染显示
    }, 2000)
  }

function handleClick() {
    clearTimeout(timer)
    // 动效
    ado.play()
    drawFish(1.1)
    requestAnimationFrame(loop)
    setTimeout(() => {
      ado.pause()
      ado.currentTime = 0
      drawFish()
    }, 100)
    timer = setTimeout(() => {
      fishStore.hide()
      panelStore.display() // display只是设置panel可以被渲染显示
    }, 1000)
  }

</script>



<style scoped>
.woodfish {
  position: fixed;
  z-index: 999;
}
</style>