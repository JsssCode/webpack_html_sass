var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var webpack = require('webpack');
var path = require('path');
var bootstrapEntryPoints = require('./webpack.bootstrap.config');

var isProd = process.env.NODE_ENV === 'production';
var cssDev = ['style-loader', 'css-loader', 'sass-loader'];
var cssProd = ExtractTextPlugin.extract({
    fallback: "style-loader",
    use: ['css-loader', 'sass-loader'],
    publicPath: '/dist'
});
var cssConfig = isProd ? cssProd : cssDev;
var bootstrapConfig = isProd ? bootstrapEntryPoints.prod : bootstrapEntryPoints.dev;

module.exports = {
    entry: {
        app: './src/app.js',
        bootstrap: bootstrapConfig
    },
    output: {
        path: path.resolve(__dirname, "dist"),
        filename: '[name].bundle.js'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/,
                use: cssConfig
            },
            {
                test: /\.(png|gif|svg|jpe?g)/,
                use: ['file-loader?name=[name].[ext]&publiPath=images/&outputPath=images/',
                    'image-webpack-loader'
                ]
            },
            {
                test: /\.(woff2?|svg)$/,
                loader: 'url-loader&limit=10000&name=fonts/[name].[ext]'
            },
            {
                test: /\.(otf|ttf|eot)$/,
                loader: 'file-loader?name=fonts/[name].[ext]'
            },
            { test: /bootstrap[\/\\]dist[\/\\]js[\/\\]umd[\/\\]/, loader: 'imports-loader?jQuery=jquery' },
        ]
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'My App',
        template: 'src/index_template.html'
        //filename: 'src/assets/index_template.html'
    }),

    new ExtractTextPlugin({
        filename: "style.css",
        disable: !isProd,
        allChunks: true
    }),
    new webpack.ProvidePlugin({
        $: "jquery",
        jQuery: "jquery",
        "window.jQuery": "jquery",
        Tether: "tether",
        "window.Tether": "tether",
        Alert: "exports-loader?Alert!bootstrap/js/dist/alert",
        Button: "exports-loader?Button!bootstrap/js/dist/button",
        Carousel: "exports-loader?Carousel!bootstrap/js/dist/carousel",
        Collapse: "exports-loader?Collapse!bootstrap/js/dist/collapse",
        Dropdown: "exports-loader?Dropdown!bootstrap/js/dist/dropdown",
        Modal: "exports-loader?Modal!bootstrap/js/dist/modal",
        Popover: "exports-loader?Popover!bootstrap/js/dist/popover",
        Scrollspy: "exports-loader?Scrollspy!bootstrap/js/dist/scrollspy",
        Tab: "exports-loader?Tab!bootstrap/js/dist/tab",
        Tooltip: "exports-loader?Tooltip!bootstrap/js/dist/tooltip",
        Util: "exports-loader?Util!bootstrap/js/dist/util",
    })
    ]
}