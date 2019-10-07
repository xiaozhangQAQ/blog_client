
const webpack = require('webpack')
// vue.config.js
module.exports = {
    // 选项...
    // publicPath: process.env.NODE_ENV === 'production'
    // ? './'
    // : '/',
    publicPath: './',
    // assetsPublicPath: '/',
    outputDir: 'client',
    assetsDir: 'static',
    lintOnSave: false,
    devServer: {
        proxy: {
            // change xxx-api/login => mock/login
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            '/w/': {
            target: `http://localhost:3000/`,//http://blogapi.codebear.cn/index.php
            changeOrigin: true,
            // pathRewrite: {
            //     '^/w': ''
            // }
            }
        }
    },
    chainWebpack: (config) => {
        /* 添加分析工具*/
        if (process.env.NODE_ENV === 'production') {
            if (process.env.npm_config_report) {
                config
                    .plugin('webpack-bundle-analyzer')
                    .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
                    .end();
                config.plugins.delete('prefetch')
            }
        } }
}