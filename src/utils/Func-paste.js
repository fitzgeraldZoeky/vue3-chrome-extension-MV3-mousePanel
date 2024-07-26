// 粘贴
export default function() {
    // 这里可以监听到 document.activeElement ,.then里面监听不到，因为页面状态已经变化了
    const activeElement = document.activeElement
    // 非可输入的聚焦元素，不予处理
    if (activeElement.tagName !== 'INPUT' && activeElement.tagName !== 'TEXTAREA') return
    // 获取选中的内容
    // 后台脚本不能访问到 navigator.clipboard 等 剪切板 相关API
    navigator.clipboard.readText()
    .then(text => {
        const s = +activeElement.selectionStart
        const e = +activeElement.selectionEnd
        console.log(activeElement.selectionEnd, activeElement.selectionStart, activeElement.value)
        // 把信息填充到聚焦的可输入元素中
        if (activeElement.value) {
            // 根据光标判断
            if (s >= 0 || e >= 0) {
                activeElement.value = activeElement.value.substring(0, s) + text + activeElement.value.substring(e)
            }
        } else {
            activeElement.value = text
        }
    })
    .catch(err => {
        console.log('Error paste text: ', err)
    })
}

