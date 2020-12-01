const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const common = require('./webpack.common.config')

module.exports = {
    ...common,
    devtool: "source-map",
    optimization: {
        minimizer: [
            `...`,
            new CssMinimizerPlugin(),
        ],
    },
};
