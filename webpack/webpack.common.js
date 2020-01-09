const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const HappyPack = require('happypack');

const sourcePath = path.resolve(__dirname, '../src');
const entryPath = sourcePath + '/entry/';
const templatesPath = path.resolve(__dirname, '../templates');
const distPath = path.resolve(__dirname, '../dist');
let pathsToClean = [
  distPath
]
let cleanOptions = {
  root: __dirname,
  verbose: true, // 打印log
}

module.exports = {
  entry: entryPath + "index.tsx",
  output: {
    publicPath: '/',
    path: distPath,
    filename: '[hash].bundle.js',
    // chunkFilename: '[name].bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.ts(x?)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=ts'
      },
      {
        test: /\.js(x?)$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=jsx'
      },
      // {
      //   test: /\.jsx$/,
      //   loader: 'eslint-loader',
      //   enforce: "pre",
      //   include: [sourcePath], // 指定检查的目录
      //   // options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
      //   //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
      //   // }
      // },
      {
        test: /\.css$/,
        use: 'happypack/loader?id=css'
      },
      {
        test: /\.less$/,
        exclude: /node_modules/,
        use: 'happypack/loader?id=less'
      },
      {
        test: /\.(icon|eot|svg|ttf|TTF|woff|woff2|png|jpe?g|gif)(\?\S*)$/,
        loader: 'file-loader',
        query: {
          name: '[name].[ext]?[hash]'
        },
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
    alias: {
      components: sourcePath + '/components',
      utils: sourcePath + '/utils'
    }
  },
  plugins: [
    // 将js, css文件引入html中
    new HtmlWebpackPlugin({
      title: "Application",
      filename: 'index.html',
      template: path.resolve(templatesPath, 'index.html'),
      inject: 'body',
    }),
    new ExtractTextWebpackPlugin('[hash].css'),
    new CleanWebpackPlugin(pathsToClean, cleanOptions),
    new webpack.ContextReplacementPlugin(
      /moment[/\\]locale$/,
      /zh-cn/,
    ),
    new AutoDllPlugin({
      inject: true, // will inject the DLL bundles to index.html
      filename: '[name].js',
      entry: {
        vendor: [
          'react',
          'react-dom'
        ]
      }
    }),
    new HappyPack({
      id: 'ts',
      threads: os.cpus().length,
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'jsx',
      threads: os.cpus().length,
      loaders: ['babel-loader']
    }),
    new HappyPack({
      id: 'css',
      threads: os.cpus().length,
      loaders: ['style-loader', {
        loader: '@teamsupercell/typings-for-css-modules-loader'
      },
        'css-loader']
    }),
    new HappyPack({
      id: 'less',
      threads: os.cpus().length,
      loaders: [{
        loader: "style-loader"
      }, {
        loader: '@teamsupercell/typings-for-css-modules-loader'
      },
      {
        loader: "css-loader",
        options: {
          sourceMap: true,
          modules: {
            localIdentName: '[path][name]__[local]'
          }
        }
      }, {
        loader: "less-loader"
      }]
    })
  ]
};