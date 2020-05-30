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
    //hot:true
    proxy: {
      '/api': {
        target: 'http://localhost:9527',
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
})