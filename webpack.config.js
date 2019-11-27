var path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.join(__dirname, 'public'),
        filename: 'bundle.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: [/node_modules/, /\.css$/],
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            },
            {
                test: /\.(png|jpg|svg|gif)$/,
                loader: 'file-loader',
                options: {
                    outputPath: 'images',
                },
            },
            // {
            //     test: /\.html$/,
            //     loader: 'html-loader'
            // }
        ]
    },
    node: {
        fs: 'empty',
        buffer: 'empty',
        http: 'empty',
    },
    plugins: [
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: './public/template.html'
        })
    ]
}