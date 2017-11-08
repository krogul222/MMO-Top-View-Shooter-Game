const path = require('path');

module.exports = {
    entry: {a: './client/js/game.ts', b: './client/js/canvas.ts', c:'./client/js/images.ts'},
    output: {
        path: path.resolve(__dirname, 'dist'),  
        filename: "[name].entry.js",
        publicPath: '/dist/'
    },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js']
    },
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            { test: /\.tsx?$/, loader: 'ts-loader' }
        ]
    },
    target: 'node'

}
