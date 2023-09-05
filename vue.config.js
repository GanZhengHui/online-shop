const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
    transpileDependencies: true,
    // 项目打包时不要map文件，map文件是可以精准报出错误信息，没有则不能
    productionSourceMap: false,
    // 关闭ESLINT校验工具
    lintOnSave: false,
    // 代理跨域   --跨域解决：jsonp core 服务代理
    devServer: {
        proxy: {
            // 包含/api的请求，则访问此服务器
            '/api': {
                target: 'http://gmall-h5-api.atguigu.cn',
                // 重写路径，把/api替换为空字符串
                // pathRewrite: { '^/api': '' },
            },
        },
    },
})