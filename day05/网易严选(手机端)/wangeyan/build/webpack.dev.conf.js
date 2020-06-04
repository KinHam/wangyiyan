const merge = require('webpack-merge')
const { resolve } = require('path')
const baseConfig = require('./webpack.base.conf')
process.env.NODE_ENV = "development"
module.exports = merge(baseConfig, {
  mode: 'development',
  devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    open: true,
    hot: true,
    proxy: {
      '/api': {
        target: 'http://localhost:9527',
        changeOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      },
      '/good': {
        target: 'https://m.you.163.com',
        changeOrigin: true,
        //配置ws解决访问线上服务器访问不了
        ws: true,
        // 如果是https接口，需要配置这个参数
        secure: false,
        pathRewrite: {
          '^/good': ''
        }
      }
    },
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: /^\//, to: '/index.html'
    //     }
    //   ]
    // }
    historyApiFallback: true
    // historyApiFallback: {
    //   rewrites: [
    //     {
    //       from: /.*/g,
    //       to: resolve(__dirname, '../index.html')
    //     }
    //   ]
    // }
  },

})