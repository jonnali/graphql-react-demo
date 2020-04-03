"use strict";
const merge = require('webpack-merge');
const common = require('./webpack.common.js');
const {resolve} = require('path')

module.exports = merge(common, {
    devtool: 'eval-source-map',
    devServer: {
        contentBase: resolve(__dirname, 'dist'),
        compress: true,
        port: 9000,
        open: true,
        //开启HMR功能
        hot: true,
    },
});
