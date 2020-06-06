const webpack = require('webpack')
const webpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.dev')
const chalk = require('chalk')
const compiler = webpack(webpackConfig)
const options = webpackConfig.devServer
//process.env.NODE_ENV = 'development'
const server = new webpackDevServer(compiler, options)
server.listen(8080, 'localhost', () => {
  console.log(chalk.underline.black.bgGreenBright.bold('Starting server on  http://localhost:8080'))
})