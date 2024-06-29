export const getIcon = function(url) {
    // 因为是动态导入的，所以正常的vite打包是不会把icon的静态资源打包进去的
    // 因此需要在vite中另外设置，以确保资源被打包
    // 还有另外一个方法就是
    // 将需要动态引入的静态资源都写在public目录下,vite会自动打包这个目录下的内容
    // window.onload 确保所有静态资源尤其是public下的资源已经加载完成.
    // 不然当直接设置img.src的时候就会发送请求去拿资源,而这个时候资源不一定有
        const img = new Image()
        img.src = url
        return img
} 