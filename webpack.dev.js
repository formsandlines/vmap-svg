const PATHS = require('./webpack-paths.js');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    entry: {
        ['vmap-svg']: PATHS.src
    },
    output: {
        path: PATHS.dev,
        filename: '[name].js',
        library: 'vmap-svg',
        libraryExport: 'default',
        libraryTarget: 'umd'
    }
};