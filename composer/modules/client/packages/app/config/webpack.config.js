/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
 */

 /* eslint-disable */
const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const UnusedFilesWebpackPlugin = require('unused-files-webpack-plugin').UnusedFilesWebpackPlugin;
const CircularDependencyPlugin = require('circular-dependency-plugin');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const extractThemes = new ExtractTextPlugin({ filename: './[name].css', allChunks: true });
const extractCSSBundle = new ExtractTextPlugin({ filename: './[name]-[hash].css', allChunks: true });

const isProductionBuild = process.env.NODE_ENV === 'production';

const excludeTest = function(modulePath) {
    return modulePath.includes('node_modules') && !modulePath.includes('@ballerina-lang');
};

let exportConfig = {};

// Keeps unicode codepoints of font-ballerina for each icon name
const codepoints = {}

const config = [{
    target: 'web',
    entry: {
        bundle: './src/index.js',
    },
    output: {
        filename: '[name]-[hash].js',
        path: path.resolve(__dirname, '../dist'),
    },
    module: {
        noParse: /vscode-languageserver-types/,
        rules: [{
            test: /\.js$/,
            exclude: excludeTest,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react'],
                    },
                },
                'source-map-loader',
            ],
        },
        {
            test: /\.html$/,
            exclude: excludeTest,
            use: [{
                loader: 'html-loader',
            }],
        },
        {
            test: /\.scss$/,
            exclude: excludeTest,
            loader: 'style-loader!css-loader!sass-loader',
        },
        {
            test: /\.css$/,
            use: extractCSSBundle.extract({
                fallback: 'style-loader',
                use: [{
                    loader: 'css-loader',
                    options: {
                        url: false,
                        sourceMap: !isProductionBuild,
                    },
                }],
            }),
        },
        {
            test: /\.(png|jpg|svg|cur|gif|eot|svg|ttf|woff|woff2)$/,
            use: ['url-loader'],
        },
        {
            test: /\.jsx$/,
            exclude: excludeTest,
            use: [
                {
                    loader: 'babel-loader',
                    query: {
                        presets: ['es2015', 'react'],
                    },
                },
            ],
        },
        ],
    },
    plugins: [
        new ProgressBarPlugin(),
        new CleanWebpackPlugin(['../dist'], {watch: true, exclude:['themes']}),
        extractCSSBundle,
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
        }),
        new WriteFilePlugin(),
        new CopyWebpackPlugin([
            {
                from: './public',
            },
            {
                from: './node_modules/monaco-editor/min/vs',
                to: 'vs',
            },
            {
                from: './node_modules/@ballerina-lang/composer-font/lib/fonts',
                to: 'fonts',
            },
            {
                from: './node_modules/@ballerina-lang/composer-images/lib',
                to: 'images',
            }
        ]),
        new HtmlWebpackPlugin({
            template: './src/index.ejs',
            inject: false,
        })
    ],
    devServer: {
        contentBase: path.join(__dirname, "../dist"),
    },
    externals: {
        jsdom: 'window',
        'react-addons-test-utils': true,
        'react/addons': true,
        'react/lib/ExecutionEnvironment': true,
        'react/lib/ReactContext': true,
    },
    node: { module: 'empty', net: 'empty', fs: 'empty' },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js', '.json', '.jsx'],
        modules: ['./public/lib', './node_modules'],
        alias: {
            "theme-wso2": 'theme-wso2-2.0.0/js/theme-wso2'
        },
    },

}, {
    entry: {
        default: './scss/themes/default.scss',
        light: './scss/themes/light.scss',
        dark: './scss/themes/dark.scss',
    },
    output: {
        filename: '[name].css',
        path: path.resolve(__dirname, '../dist/themes/'),
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                exclude: excludeTest,
                use: extractThemes.extract({
                    fallback: 'style-loader',
                    use: [{
                        loader: 'css-loader',
                        options: {
                            sourceMap: !isProductionBuild,
                        },
                    }, {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: !isProductionBuild,
                        },
                    }],
                }),
            },
        ],
    },
    plugins: [
        extractThemes,
    ],
    devtool: 'source-map',
}];
exportConfig = config;
if (process.env.NODE_ENV === 'production') {
    config[0].plugins.push(new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(true),

        // React does some optimizations to it if NODE_ENV is set to 'production'
        'process.env': {
            NODE_ENV: JSON.stringify('production'),
        },
    }));

    // Add UglifyJsPlugin only when we build for production.
    // uglyfying slows down webpack build so we avoid in when in development
   config[0].plugins.push(new UglifyJsPlugin({
       sourceMap: !isProductionBuild,
       parallel: true,
       uglifyOptions: {
           mangle: {
               keep_fnames: true,
           },
       }
   }));
} else {
    config[0].plugins.push(new webpack.DefinePlugin({
        PRODUCTION: JSON.stringify(false),
    }));
}

if (process.env.NODE_ENV === 'test') {
    // we run tests on nodejs. So compile for nodejs
    config[0].target = 'node';
    exportConfig = config[0];
} else if (process.env.NODE_ENV === 'test-source-gen-dev') {
    const testConfig = config[0];
    testConfig.target = 'node';
    testConfig.entry = './src/plugins/ballerina/tests/js/spec/ballerina-test.js';
    testConfig.output = {
        path: path.resolve(__dirname, 'target'),
        filename: 'ballerina-test.js',
    };
    testConfig.plugins = [
        new webpack.DefinePlugin({
            PRODUCTION: JSON.stringify(false),
        }),
    ];
    exportConfig = testConfig;
} else if (process.env.NODE_ENV === 'electron-dev' || process.env.NODE_ENV === 'electron') {
    // we run tests on nodejs. So compile for nodejs
    config[0].target = 'electron-renderer';

    // reassign entry so it uses the entry point for the electron app
    config[0].entry = {
        bundle: './src-electron/electron-index.js',
    };
}

/* eslint-enable */

module.exports = exportConfig;
