chrome.commands.onCommand.addListener((command, tab) => {
    // console.log('🆗🆗🆗🦖', command, tab)
    // 使用 chrome.tabs API 与浏览器的标签页系统进行交互。
    // 可以使用此 API 在浏览器中创建、修改和重新排列标签页。
    // Tabs API 不仅提供操作和管理标签页的功能，还可以检测标签页的语言、截取屏幕截图，以及与标签页的内容脚本进行通信。

    // 
    chrome.tabs.sendMessage(tab.id, { action: 'showPanel', tab}) // 向当前标签页的内容脚本发送消息，要求显示面板
  })


