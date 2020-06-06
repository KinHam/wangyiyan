const { resolve } = require('path')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.base.config')
//process.env.NODE_ENV = 'development';
//console.log('process.env.NODE_ENV', process.env.NODE_ENV)
module.exports = merge(baseConfig, {
  mode: 'development',
  devServer: {
    contentBase: resolve(__dirname, '../dist'),
    hot: true,
    open: true,
    //quiet: true, //终端只输出初始启动信息n
    inline: true //自动更新
  },
  devtool: "inline-source-map"
})