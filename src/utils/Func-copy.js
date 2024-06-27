// 复制功能
export default function() {
    // 获取选中的内容
    const selectedText = window.getSelection().toString()
    // content.js 向 background.js 发送复制的信息
    // 后台脚本才能够有权限处理 剪切板 相关API
    chrome.runtime.sendMessage({action: "copy", text: selectedText})
}
