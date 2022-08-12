const {merge} = require('webpack-merge');
const commonConfig = require('./webpack.common');
const ModuleFedartionPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJson = require('../package.json');

const prodConfig = {
    mode: "production",
    output:{
        filename:'[name].[contenthash].js',
        publicPath: '/marketing/latest/'
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
    ],
}

module.exports = merge(commonConfig,prodConfig);