// 粘贴
export default function() {
    console.log('粘贴      🦀🦀')
    // 获取选中的内容
    // 后台脚本不能访问到 navigator.clipboard 等 剪切板 相关API
    navigator.clipboard.readText()
    .then(text => {
        // do nothing
        console.log('🐤🐤', text)
    })
    .catch(err => {
        console.log('Error paste text: ', err)
    })
}
