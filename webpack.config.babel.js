import webpack from 'webpack';
import path from 'path';

const inProduction = (process.env.NODE_ENV === 'production');

let webpackConfig = {
    entry: './scripts/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/,
                use: ['style-loader', 'css-loader', 'sass-loader']
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //works right to left
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
    ]
}

if (inProduction) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}

export default webpackConfig