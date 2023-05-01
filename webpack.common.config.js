const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: './src/ts/index.ts',
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
                test: /\.(sa|sc|c)ss$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            esModule: false
                        }
                    },
                    {
                        loader: 'resolve-url-loader',
                        options: {
                            esModule: false
                        }
                    },
                    'sass-loader'
                ],
            },
            {
                test: /\.html$/,
                type: 'asset/resource',
                generator: {
                    filename: '[name][ext]',
                },
            },
            {
                test: /\.(ttf|eot|woff|woff2|svg)$/,
                type: "asset/resource",
                generator: {
                    filename: 'fonts/[name][ext]'
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: '[name].css',
            chunkFilename: '[id].css',
        })
    ],
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    mode: "development",
    target: "electron-main",
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist')
    },
};
