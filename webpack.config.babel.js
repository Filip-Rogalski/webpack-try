import webpack from 'webpack';
import path from 'path';

export default {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //works right to left
            }
        ]
    }
}