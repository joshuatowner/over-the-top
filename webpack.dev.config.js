const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const common = require('./webpack.common.config')

module.exports = {
    ...common,
    devtool: "inline-source-map",
};