const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const SOURCE_PATH = path.resolve(__dirname, './src');
const ENTRY_PATH = SOURCE_PATH + '/entries/';
let pathsToClean = [
  'dist',
]
let cleanOptions = {
  root: __dirname, 
  verbose: true, // Write logs to console.
}

module.exports = {
  entry: ENTRY_PATH + "index.jsx",
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, './dist'),
    filename: '[hash].bundle.js',
    // chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [{
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-0'],
          plugins: [
            ["import", {
              "libraryName": "antd",
              "libraryDirectory": "es",
              "style": 'css', // or 'css'
            }]
          ]
        }
      },
      {
        test: /\.jsx$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        // options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
        //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        // }
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/src/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                // '@primary-color': '#1DA57A'
              }
            }
          }
        ]
      },
      {
        test: /\.less$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[local]_[hash:base64:8]'
            }
          },
          {
            loader: 'less-loader',
            options: {
              modifyVars: {
                // '@primary-color': '#1DA57A'
              }
            }
          }
        ]
      },

    ]

  },
  resolve: {
    extensions: ['.js', '.jsx', '.json'], //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    alias: {
      components: SOURCE_PATH + '/components',
      resources: SOURCE_PATH + '/resources',
      utils: SOURCE_PATH + '/utils',
      config: SOURCE_PATH + '/config'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({ // 将js, css文件引入html中
      title: "React",
      filename: 'index.html',
      template: ENTRY_PATH + 'index.template.html',
      inject: 'body',
      hash: false
    }),
    new extractTextWebpackPlugin('[hash].css'),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    // new CopyWebpackPlugin([{
    //     from: SOURCE_PATH + '/resources/js',
    //     to: 'resources/js'
    //   },
    //   {
    //     from: SOURCE_PATH + '/resources/image',
    //     to: 'resources/image'
    //   },
    //   {
    //     from: SOURCE_PATH + '/resources/json',
    //     to: 'resources/json'
    //   }
    // ]),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    )
  ]
};