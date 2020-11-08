const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/ts/index.tsx',
    module: {
        rules: [
            {
                test: /\.worker\.ts$/,
                use: [
                    'worker-loader'
                ],
            },
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.s[ac]ss$/i,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'resolve-url-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                use: {
                    loader: 'file-loader',
                    options: {
                        name: '[name].[ext]',
                        outputPath: 'fonts/'
                    },
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        }),
    ],
    resolve: {
        extensions: [ '.tsx', '.ts', '.js' ],
    },
    mode: "development",
    target: "electron-main",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: path.resolve(__dirname, 'dist') + "/"
    },
};