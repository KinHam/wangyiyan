
const merge = require('webpack-merge')
const { resolve } = require('path')
const baseConfig = require("./webpack.dev")
//process.env.NODE_ENV = 'production';
module.exports = merge(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  devtool: 'source-map'
})