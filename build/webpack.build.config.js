const ExtractTextPlugin = require("extract-text-webpack-plugin");
const UglifyPlugin = require("uglifyjs-webpack-plugin");
const { resolvePath } = require("./helper");

module.exports = {
    entry: resolvePath("devPkg/components/lensyn.js"),

    output: {
        path: resolvePath("publish/lib"),
        filename: 'lensyn-ui.js',
        libraryTarget: 'umd',
        library: 'lensyn-ui',
        umdNamedDefine: true
    },

    externals: {
        vue: {
            root: "Vue",
            commonjs: "vue",
            commonjs2: "vue",
            amd: "vue"
        }
    },

    resolve: {
        extensions: ['.js', '.vue', '.less', '.css']
    },

    module: {
        rules: [
            {
                test: /\.vue$/,
                exclude: /node_modules/,
                include: [
                    resolvePath("devPkg/components")
                ],
                loader: 'vue-loader'
            },

            {
                test: /\.less$/,
                exclude: /node_modules/,
                include: [
                    resolvePath("devPkg/styles")
                ],
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: [
                        {
                            loader: "css-loader",
                            options: {
                                minimize: true
                            }
                        },
                        {
                            loader: "less-loader"
                        }
                    ]
                })
            },

            {
                test: /\.js$/,
                exclude: /node_modules/,
                include: [
                    resolvePath("devPkg/components")
                ],
                loader: 'babel-loader'
            },

            {
                test: /\.(png|jpg|gif)$/,
                loader: "url-loader",
                options: {
                    limit: 1024 * 1024
                }
            }
        ]
    },

    plugins: [
        new ExtractTextPlugin('./lensyn-ui.css'),
        new UglifyPlugin({
            uglifyOptions: {
                ecma: 5,
                warning: true,
                output: {
                    comments: false
                }
            }
        })
    ]
};