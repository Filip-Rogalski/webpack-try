import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CleanWebpackPlugin from 'clean-webpack-plugin';
import fs from 'fs';

const inProduction = (process.env.NODE_ENV === 'production');

let webpackConfig = {

    entry: {
        main: './scripts/main.js'
    },

    output: {
        path: path.resolve(__dirname, './_build'),
        // filename: 'scripts/[name].[hash].js'
        filename: 'scripts/[name].js'
    },
    
    module: {
        rules: [
            // {
            //     test: /\.html$/,
            //     use: 'nunjucks-loader',
            // },

            {
                test: /\.s[ac]ss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader', 
                    use: ['css-loader', 'sass-loader']
                })
            },

            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'] //works right to left
            },

            {
                test: /\.jpe?g|gif|png$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]'
                }
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: 'babel-loader'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin({
            filename: 'styles/main.css'
        }),

        new webpack.LoaderOptionsPlugin({
            minimize: inProduction
        }),

        new CleanWebpackPlugin(['_build'], {
            root: __dirname,
            verbose: true
        }),

        function() {
            this.plugin('done', stats => {
                fs.writeFileSync(
                    path.join(__dirname, '_build/manifest.json'),
                    // JSON.stringify(stats.toJson().assetsByChunkName)
                    JSON.stringify(stats.toJson())
                )
            })
        }
    ]
}

if (inProduction) {
    webpackConfig.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    )
}

export default webpackConfig