const path = require('path')
const MinifyPlugin = require('babel-minify-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    context: path.resolve(__dirname, 'src'),
    entry: ['./main.js', './main.scss'],
    output: {
        path: path.resolve(__dirname, 'public')
    },
<<<<<<< HEAD
    devServer: {
        historyApiFallback: true
=======
    cache: {
        type: 'filesystem',
        cacheDirectory: path.resolve(__dirname, '.temp_cache'),
    },
    optimization: {
         splitChunks: {
            cacheGroups: {
                  vendor: {
                      name: "node_vendors", // part of the bundle name and
                      // can be used in chunks array of HtmlWebpackPlugin
                      test: /[\\/]node_modules[\\/]/,
                      chunks: "all",
                  },
            },
        },
>>>>>>> main
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            loader: 'babel-loader'
        },
        {
            test: /\.scss$/,
            exclude: /node_modules/,
            use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
        },
        {
            test: /\.woff(2)?$/,
            use: [{
                loader: 'url-loader',
                options: {
                    limit: 8192 // in bytes
                }
            }]
        },
        {
            test: /\.svg$/,
            loader: 'svg-inline-loader'
        }
    ]
    },
    plugins: [
        new MinifyPlugin({}, {
            comments: false
        }),
        new MiniCssExtractPlugin({
            filename: '[name].css'
        })
    ]
}
