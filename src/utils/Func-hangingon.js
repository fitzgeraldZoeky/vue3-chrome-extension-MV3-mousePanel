// 摸鱼
import { useFishStore } from '../store/useFishStore'
import { usePanelStore } from '../store/usePanelStore'

// 当激活功能之后，在这里准备组件需要的数据
export default function(payload) {
    
    // 在这里引入，而不是在外部引入，因为在外部引入注册会导致因执行顺序先于 pinia 创建而报错
    const fishStore = useFishStore()
    const paneltore = usePanelStore()
    // 显示icon 加入音效和点击放大并且上方出现文案效果
    // 鼠标松开后，icon存在一段时间，通过再次点击实现互动效果
    // icon存在时，排除其他事件触发的处理流程，一段时间没有点击后自动消失
    // 再次激活 panel 也会触发消失
    // 这里是浏览器的页面环境
    // 监听 木鱼 激活事件，更新位置参数
    fishStore.setPosition(payload.x, payload.y)
    // 更新显示 fish, 关闭 panel
    fishStore.display()
    paneltore.hide()
}
