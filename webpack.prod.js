const PATHS = require('./webpack-paths.js');

module.exports = {
    mode: 'production',
    devtool: 'source-map',
    entry: {
        vmap_svg: PATHS.src
    },
    output: {
        path: PATHS.prod,
        filename: '[name].min.js',
        library: 'vmap-svg',
        libraryExport: 'default',
        libraryTarget: 'umd'
    }
};