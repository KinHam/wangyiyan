const merge = require('webpack-merge')
const { resolve } = require('path')
const baseConfig = require('./webpack.base.conf')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
process.env.NODE_ENV = "production"
module.exports = merge(baseConfig, {
  mode: 'production',
  devtool: 'source-map',
  plugins: [
    new CleanWebpackPlugin()
  ]
})