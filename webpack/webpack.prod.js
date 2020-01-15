const merge = require('webpack-merge');
const path = require('path');
const common = require('./webpack.common.js');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const distPath = path.resolve(__dirname, '../dist');
const pathsToClean = [
	distPath
];
const cleanOptions = {
	root: path.resolve(__dirname, '../'),
	verbose: true, // 打印log
};

module.exports = merge(common, {
	mode: 'production',
	// optimization: {
	//   splitChunks: {
	//     chunks: "all",
	//     minSize: 200000,
	//     minChunks: 2,
	//     maxAsyncRequests: 5,
	//     maxInitialRequests: 3,
	//     name: true
	//   }
	// },
	plugins: [
		new CleanWebpackPlugin(pathsToClean, cleanOptions),
		new BundleAnalyzerPlugin()
	],
	optimization: {
		minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({
			cssProcessorOptions: {
			}
		})],
	},
});