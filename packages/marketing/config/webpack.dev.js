const {merge} = require('webpack-merge');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const commonConfig = require('./webpack.common');
const ModuleFedartionPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const devConfig = {
    mode: "development",
    devServer:{
        port:8081,
        historyApiFallback:{
            index:'index.html'
        }
    },
    plugins:[
        new ModuleFedartionPlugin({
            name:'marketing',
            filename:'remoteEntry.js',
            exposes:{
                './MarketingApp' : './src/bootstrap.js'
            },
            shared:packageJson.dependencies
        }),
        new HtmlWebPackPlugin({
            template:'./public/index.html'
        }),
    ],
}

module.exports = merge(commonConfig,devConfig);