// 复制功能
export default function() {
    // 获取选中的内容
    const selectedText = window.getSelection().toString()
    // content.js 向 background.js 发送复制的信息
    // 后台脚本不能访问到 navigator.clipboard 等 剪切板 相关API
    navigator.clipboard.writeText(selectedText)
    .then(() => {
        // do nothing
    })
    .catch(err => {
        console.log('Error copying to clipboard: ', err)
    })
}
