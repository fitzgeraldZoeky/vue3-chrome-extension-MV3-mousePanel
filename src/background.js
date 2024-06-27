chrome.commands.onCommand.addListener((command, tab) => {
    // console.log('🆗🆗🆗🦖', command, tab)
    // 使用 chrome.tabs API 与浏览器的标签页系统进行交互。
    // 可以使用此 API 在浏览器中创建、修改和重新排列标签页。
    // Tabs API 不仅提供操作和管理标签页的功能，还可以检测标签页的语言、截取屏幕截图，以及与标签页的内容脚本进行通信。

    // 
    chrome.tabs.sendMessage(tab.id, { action: 'showPanel', tab}) // 向当前标签页的内容脚本发送消息，要求显示面板
  })

// 监听 复制功能 传递的消息
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    // console.log('复制功能')
    if (request.action === "copy") {
      navigator.clipboard && navigator.clipboard.writeText(request.text)
        .then(() => { 
          // do nothing
        })
        .catch(err => {
          console.error("Error copying to clipboard: ", err)
      })
    }
})

