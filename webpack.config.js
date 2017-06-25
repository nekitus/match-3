const webpack = require('webpack');

const path = require('path');
module.exports = {

	entry: __dirname + '/src/index',
	output: {
	    filename: 'build.js',
        path: __dirname + '/build'
    },
	watch: true,
    resolve: {
        extensions: ['.js', '.jsx']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env', 'stage-0', 'es2015'],
                        plugins: ["transform-class-properties"]
                    }
                }
                // query: {
                //     presets:['react']
                // }
            }
        ]
    },
    resolve: {
        modules: ['node_modules','libs']
    },
    devtool: "source-map"
};

