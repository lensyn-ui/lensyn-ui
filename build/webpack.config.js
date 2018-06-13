const ExtractTextPlugin = require("extract-text-webpack-plugin");
const ChunkCleanPlugin = require("../ChunkCleanPlugin");
const { resolvePath } = require("./helper");

module.exports = {
    entry: {
        "all.min": resolvePath("devPkg/main.js")
    },

    output: {
        path: resolvePath('static'),
        publicPath: '/static/',
        filename: '[name].js',
        libraryTarget: 'umd',
        library: 'lensyn-ui',
        umdNamedDefine: true
    },

    resolve: {
        extensions: ['.js', '.vue', '.less', '.css']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },

            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        'css-loader',
                        'less-loader'
                    ]
                })
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    resolvePath("devPkg")
                ],
                loader: 'babel-loader'
            },
            {
                test: /\.(png|jpg|gif|ttf|svg|woff|eot)$/,
                loader: 'url-loader',
                options: {
                    limit: 3000,
                    name: './images/[name].[ext]?[hash]'
                }
            }
        ]
    },
    plugins: [
        new ChunkCleanPlugin(resolvePath("static")),
        new ExtractTextPlugin('./style/main.css')
    ]
};