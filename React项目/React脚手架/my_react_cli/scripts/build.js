const webpack = require('webpack')
const webpackConfig = require('../config/webpack.pro')

webpack(webpackConfig, (err, stats) => {
  if (err || stats.hasErrors()) {
    console.log('编译失败')
  }
})