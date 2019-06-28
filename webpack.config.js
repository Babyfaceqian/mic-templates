const path = require('path');
// const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const extractTextWebpackPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const SOURCE_PATH = path.resolve(__dirname, './src');
const ENTRY_PATH = SOURCE_PATH + '/entries/';
// the path(s) that should be cleaned
let pathsToClean = [
    'dist',
]

// the clean options to use
let cleanOptions = {
    root: __dirname, // bsolute path to your webpack root folder
    // exclude: ['shared.js'],
    verbose: true, // Write logs to console.
    // dry: false  // Use boolean "true" to test/emulate delete. (will not remove files).
}

var configFunc = (env, argv) => {

    const config = {
        entry: ENTRY_PATH + "index.jsx",
        output: {
            path: path.resolve(__dirname, './dist'),
            filename: '[hash].bundle.js'
        },
        module: {
            rules: [
                // {
                //     test: /\.jsx$/,
                //     loader: 'eslint-loader',
                //     enforce: "pre",
                //     include: [path.resolve(__dirname, 'src')], // 指定检查的目录
                //     // options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
                //     //     formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
                //     // }
                // },
                {
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
                                    '@primary-color': '#1DA57A'
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
                                    '@primary-color': '#1DA57A'
                                }
                            }
                        }
                    ]
                },

            ],
            // devServer: {
            //     inline: true,
            //     port: 3000
            // },
        },
        resolve:{
            extensions:['.js','.jsx','.json'], //表示这几种文件的后缀名可以省略，按照从前到后的方式来进行补全
            alias: {
                components: SOURCE_PATH + '/components'
            }
        },
        plugins: [
            // new webpack.optimize.UglifyJsPlugin({    // in webpack4, it will be enabled when mode is production.
            //     test: /\.js($|\?)/i,
            //     cache: true,
            //     parallel: true,  // Enable parallelization. Default number of concurrent runs: os.cpus().length - 1.
            //     sourceMap: true
            // }),
            new HtmlWebpackPlugin({ // 将js, css文件引入html中
                title: "Frontend Arch",
                filename: 'index.html',
                template: ENTRY_PATH + 'index.template.html',
                inject: 'body',
                hash: false // will append like bundle.js?[hash] if true, instead, we configure the hash in output.
            }),
            new extractTextWebpackPlugin('[hash].css'),
            new CleanWebpackPlugin(pathsToClean, cleanOptions)
        ]
    };

    if (argv.mode === 'development') {
        config.devtool = 'source-map'; // debug in browser
    }

    /**
     * Provides process.env.NODE_ENV with value production. 
     * Enables FlagDependencyUsagePlugin, FlagIncludedChunksPlugin, ModuleConcatenationPlugin, 
     * NoEmitOnErrorsPlugin, OccurrenceOrderPlugin, SideEffectsFlagPlugin and UglifyJsPlugin.
     */
    if (argv.mode === 'production') {
        //...
    }
    return config;

}

/**
 * instead of exporting config, 
 * we export a function which requires argv from cli and return config. So we can change config according to mode.
 */
module.exports = configFunc;