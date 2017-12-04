const path = require('path');

module.exports = {
    entry: {a: './client/js/game/game.ts', b: './client/js/pregame/canvas.ts', c:'./client/js/images.ts', d:'./client/js/pregame/login.ts'},
    output: {
        path: path.resolve(__dirname, 'build/client/js'),  
        filename: "[name].entry.js",
        publicPath: '/build/client/js'
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
