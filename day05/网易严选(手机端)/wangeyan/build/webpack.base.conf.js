const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const CopyPlguin = require('copy-webpack-plugin')
module.exports = {
  entry: {
    bundle: resolve(__dirname, '../src/index.js')
  },
  output: {
    filename: '[name].[hash].js',
    path: resolve(__dirname, '../dist')
  },
  resolve: {
    extensions: ['.js', '.json', '.vue']
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        oneOf: [
          {
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
          },
          {
            test: /\.css$/,
            //include: resolve(__dirname, '../src'),
            use: [
              'vue-style-loader',
              'css-loader',
              // {
              //   //配置适配
              //   loader: 'px2rem-loader',
              //   options: {
              //     //为1rem=75px
              //     //remPrecision为转化为小数点后位数
              //     remUni: 75,
              //     remPrecision: 8
              //   }
              // },
              {
                loader: 'postcss-loader',
                options: {
                  ident: "postcss",
                  plugins: (loader) => [
                    require("postcss-import")({ root: loader.resourcePath }),
                    require("postcss-preset-env")(),
                    require("cssnano")(),
                    require('postcss-px2rem')({
                      remUnit: 100, // 1rem等于多少px
                    })
                  ],
                },
              },
            ]
          },
          {
            test: /\.stylus$/,
            //include: resolve(__dirname, '../src'),
            use: [
              'vue-style-loader',
              'css-loader',
              {
                loader: 'postcss-loader',
                options: {
                  ident: "postcss",
                  plugins: (loader) => [
                    require("postcss-import")({ root: loader.resourcePath }),
                    require("postcss-preset-env")(),
                    require("cssnano")(),
                    require('postcss-px2rem')({
                      remUnit: 100, // 1rem等于多少px
                    })
                  ],
                },
              },
              'stylus-loader'
            ]
          },
          {
            test: /\.(png|gif|jpe?g|web)$/,
            include: resolve(__dirname, '../public'),
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 8192,
                  name: 'static/media/[hash:10].[ext]'
                }
              }
            ]
          },
          {
            exclude: [/\.js$/, /\.css$/, /\.html$/, /\.(png|gif|jpe?g|web)$/, /\.vue$/],
            use: {
              loader: 'file-loader',
              options: {
                name: 'static/mdeia/[hash:10].[ext]'
              }
            }
          }
        ]
      },
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: resolve(__dirname, '../index.html')
    }),
    //它的职责是将你定义过的其他规则复制并应用到.vue文件里相应语言的块。
    //例如,如果你有一条匹配/\.js$/的规则,那么它会应用到.vue文件里的<script>块
    new VueLoaderPlugin(),
    new CopyPlguin({
      patterns: [
        {
          from: 'public',
          to: 'public'
        }
      ]
    })
  ],
}