const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        app: ["@babel/polyfill", path.join(__dirname, '../src/main.tsx')],
        vendor1: ['react', 'react-dom'],
        vendor2: ['antd']
    },
    // 如果需要根据不同的环境配置不同的webpack，可以将webpack拆分，分开配置
    mode: 'development',
    resolve: {
        extensions: ['.js', '.jsx', '.ts', '.tsx']
    },
    output: {
        path: path.join(__dirname, '../dist'),
        filename: '[name].[hash].js',
        chunkFilename: '[name].[chunkhash].js',
        publicPath: '/'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 3000,
        historyApiFallback: true,
        quiet: true
    },
    module: {
        rules: [
            {
                test: /\.js|jsx$/,
                exclude: /node-modules/,
                loader: 'babel-loader'
            },
            {
                test: /\.tsx|ts?$/,
                loader: 'awesome-typescript-loader'
            },
            {
                test: /\.css|less$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            lessOptions: {
                                javascriptEnabled: true,
                                modifyVars: {
                                    "ant-prefix": 'qiao'
                                }
                            }
                        }
                    }
                    
                ],
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: path.join(__dirname, '../src/index.html'),
        }),
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name].[hash].css',
            chunkFilename: '[id].css',
        }),
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    name: "commons",
                    chunks: "initial",
                    minChunks: 2
                },
                vendor: { 
                    chunks: "all",
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    minChunks: 1,
                    maxInitialRequests: 5,
                    minSize: 0,
                    priority: 100
                }
            }
        },
        minimizer: [
            new UglifyJsPlugin({
                test: /\.js(\?.*)?$/i,
                include: /\/includes/,
                exclude: /\/excludes/,
                chunkFilter: (chunk) => {
                    if (chunk.name === 'vendor') {
                        return false;
                    }
                    return true;
                },
                cache: false,
                parallel: true,
            }),
          ],
    }
}