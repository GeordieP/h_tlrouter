'use strict'

const path = require('path')

module.exports = {
    entry: path.resolve('./test/test-app/index_src.js'),

    output: {
        filename: 'index_built.js'
    },

    devServer: {
        contentBase: path.resolve('./test/test-app/')
    },

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
                                "browsers": "defaults"
                            }
                        }
                    ]]
                }
            }
        ]
    }
}
