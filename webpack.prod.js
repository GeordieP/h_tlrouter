'use strict'

const webpack = require('webpack')
const path = require('path')

module.exports = {
    entry: path.resolve('./src/main.js'),

    output: { path: path.resolve('./dist')},

    plugins: [
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('production')
        })
    ],

    module: {
        rules: [
            {
                test: /\.js?$/,
                loader: 'babel-loader',
                // babel options here get merged with babel options in package.json
                options: {
                    "presets": [[
                        "env",
                        {
                            "targets": {
                                "node": "current"
                            }
                        }
                    ]]
                }
            }
        ]
    }
}
