const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    entry: {
        main: './src/ts/index.ts',
        detail: './src/ts/detail-renderer.tsx'
    },
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
                use: {
                    loader: 'ts-loader',
                    options: {
                        configFile: 'tsconfig.json'
                    }
                },
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
        filename: '[name].js',
        path: path.resolve(__dirname, 'dist')
    },
};
