const path = require('path')
const webpack = require('webpack')
const Dotenv = require('dotenv-webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    entry: './src/main.js',
    output: {
        path: path.join(__dirname, "./dist", "[hash]"),
        publicPath: "/dist/[hash]/",
        filename: "[hash].build.js",
        chunkFilename: "[id].[hash].build.js"
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {
                        'scss': 'vue-style-loader!css-loader!sass-loader',
                        'sass': 'vue-style-loader!css-loader!sass-loader?indentedSyntax'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
                loader: 'file-loader',
                query: {
                    name: '[name].[ext]?[hash]'
                }
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2)(\?\S*)?$/,
                loader: 'file-loader'
            },
        ]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            'assets': path.resolve(__dirname, './src/assets'),
            'app': path.resolve(__dirname, './src/app'),
            'common': path.resolve(__dirname, './src/app/common'),
            'libs': path.resolve(__dirname, './src/libs'),
            'root': path.resolve(__dirname, './src'),
            'jquery': path.resolve(__dirname, './node_modules/jquery/dist/jquery.js')
        },
        extensions: ['*', '.js', '.vue']
    },
    devServer: {
        historyApiFallback: true,
        noInfo: true
    },
    performance: {
        hints: false
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new Dotenv({
            path:'./.env',
            sage: true
        }),

        new webpack.ProvidePlugin({
            $: "jquery",
            jQuery: "jquery"
        }),

        new HtmlWebpackPlugin({
            title: 'UP Drive',
            filename: `${__dirname}/index.html`,
            template: `${__dirname}/template.html`,
        })
    ]
}