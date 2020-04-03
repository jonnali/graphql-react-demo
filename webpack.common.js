"use strict";

const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

const commonCssLoader = [
    'style-loader',
    //MiniCssExtractPlugin.loader,
    'css-loader'
];

module.exports = {
    entry: {
        'index': './src/index.js'
    },
    output: {
        filename: 'js/[name].[hash:10].js',
        path: path.resolve(__dirname, 'dist'),
        //publicPath: '/'
    },
    resolve: {
        extensions: [".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [...commonCssLoader]
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                options: {
                    presets: [
                        [
                            '@babel/preset-env',
                            {
                                useBuiltIns: 'usage',
                                corejs: 3,
                                targets: {
                                    chrome: '60',
                                    firefox: '50'
                                }
                            }
                        ],
                        '@babel/preset-react',
                    ]
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'url-loader',
                options: {
                    limit: 8 * 1024,
                    name: '[hash:10].[ext]',
                    outputPath: 'images',
                    esModule: false
                }
            },
            {
                test: /\.(htm|html)$/,
                use: ['html-loader']
            },
            {
                exclude: /\.(js|css|less|html|jpg|png|gif)/,
                loader: "file-loader",
                options: {
                    name: '[hash:10].[ext]',
                    outputPath: 'media'
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(),
        new MiniCssExtractPlugin({
            filename: 'css/index.[hash].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: './src/views/index.html',
            filename: 'index.html',
            minify: {
                collapseWhitespace: true,
                removeComments: true
            }
        })
    ],
    optimization:{
        splitChunks:{
            chunks:'all'
        }
    }
};
