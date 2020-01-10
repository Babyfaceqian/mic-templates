const path = require('path');
const os = require('os');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const AutoDllPlugin = require('autodll-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const sourcePath = path.resolve(__dirname, '../src');
const entryPath = sourcePath + '/entry/';
const templatesPath = path.resolve(__dirname, '../templates');
const distPath = path.resolve(__dirname, '../dist');

const cpus = os.cpus().length;
const threadOptions = {
	workers: cpus,
	workerParallelJobs: 50,
	workerNodeArgs: ['--max-old-space-size=1024'],
	poolRespawn: false,
	poolTimeout: 2000,
	poolParallelJobs: 50,
	name: 'my-pool'
};
const cssLoaderOptions = {
	sourceMap: true,
	modules: {
		localIdentName: '[path][name]__[local]'
	}
};

module.exports = {
	entry: entryPath + 'index.tsx',
	output: {
		publicPath: '',
		path: distPath,
		filename: '[hash].bundle.js',
		// chunkFilename: '[name].bundle.js',
	},
	module: {
		rules: [
			{
				test: /\.ts(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'thread-loader',
						options: threadOptions
					},
					{
						loader: 'babel-loader',
						options: {
							// cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.js(x?)$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'thread-loader',
						options: threadOptions
					},
					{
						loader: 'babel-loader',
						options: {
							// cacheDirectory: true
						}
					}
				]
			},
			{
				test: /\.js$/,
				loader: 'source-map-loader',
				enforce: 'pre'
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
				use: [
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions
					}
				]
			},
			{
				test: /\.less$/,
				exclude: /node_modules/,
				use: [
					{
						loader: '@teamsupercell/typings-for-css-modules-loader'
					},
					{
						loader: MiniCssExtractPlugin.loader,
						options: {
							// you can specify a publicPath here
							// by default it uses publicPath in webpackOptions.output
							publicPath: '',
							hmr: process.env.NODE_ENV === 'development',
						},
					},
					{
						loader: 'css-loader',
						options: cssLoaderOptions
					},
					'less-loader'
				]
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
			'@@components': path.resolve(sourcePath, 'components'),
			'@@utils': path.resolve(sourcePath, 'utils')
		}
	},
	plugins: [
		// 将js, css文件引入html中a
		new HtmlWebpackPlugin({
			title: 'Application',
			filename: 'index.html',
			template: path.resolve(templatesPath, 'index.html'),
			inject: 'body',
		}),
		new MiniCssExtractPlugin({
			filename: '[name].css',
			chunkFilename: '[id].css', // 非入口(non-entry) chunk 文件的名称，可以理解为通过异步加载（分块打包）打包出来的文件名称
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
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
	]
};