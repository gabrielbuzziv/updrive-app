const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common.js')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = merge(common, {
    devtool: '#eval-source-map',

    output: {
        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'build.js'
    },

    plugins: (module.exports.plugins || []).concat([
        new HtmlWebpackPlugin({
            title: 'UP Drive - Development',
            filename: `${__dirname}/index.html`,
            template: `${__dirname}/template.html`,
        })
    ])
})