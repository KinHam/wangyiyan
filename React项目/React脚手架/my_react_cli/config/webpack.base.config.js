

const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require("clean-webpack-plugin")
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// 是否是开发模式 判断是什么类型
const devMode = process.env.NODE_ENV === 'development';

module.exports = {
  entry: './src/index.js',
  output: {
    path: resolve(__dirname, '../dist'),
    filename: "[name].[hash:8].js"
  },
  module: {
    rules: [
      {
        oneOf: [
          {
            test: /\.(js|jsx)$/,
            include: resolve(__dirname, '../src'),
            use: [
              {
                loader: 'babel-loader',
                options: {
                  presets: [
                    [
                      '@babel/preset-env',
                      {
                        useBuiltIns: 'usage',
                        corejs: {
                          version: 3
                        },
                        targets: '>0.25%,not dead',
                        modules: false
                      },
                    ],
                    '@babel/preset-react'
                  ],
                  plugins: ['react-hot-loader/babel'],
                  cacheDirectory: true
                }
              }
            ]
          },
          {
            test: /\.css$/,
            include: resolve(__dirname, '../src'),
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: (loader) => [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-preset-env')(),
                    require('cssnano')()
                  ]
                }
              }
            ]
          },
          {
            test: /\.(stylus|styl)$/,
            include: resolve(__dirname, '../src'),
            use: [
              devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
              'css-loader',
              'stylus-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: 'postcss',
                  plugins: (loader) => [
                    require('postcss-import')({ root: loader.resourcePath }),
                    require('postcss-preset-env')(),
                    require('cssnano')()
                  ]
                }
              }
            ]
          },
          {
            test: /\.(jpg|png|svg|gif)$/,
            loader: 'url-loader',
            options: {
              limit: 8190,
              name: 'static/media/[hash:8].[ext]'
            }
          },
          {
            exclude: [/\.(js|jsx)$/, /\.css$/, /\.html$/, /\.(png|gif|jpe?g|web)$/],
            loader: 'file-loader',
            options: {
              name: 'static/media/[hash:8].[ext]'
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      //配置别名,$src就是src名录
      $src: resolve(__dirname, '../src'),
      //配置$my,该目录存放自定义的文件
      $my: resolve(__dirname, '../my')
    },
    extensions: ['.js', '.jsx', '.json']
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../public/index.html')
    }),
    new MiniCssExtractPlugin({
      //对输出的css进行重命名
      //filename:''
    })
  ]
}