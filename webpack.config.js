const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
// Plugins
const handleCss = new MiniCssExtractPlugin({
  filename: '[name].[contenthash:8].css',
  chunkFilename: '[name].[contenthash:8].chunk.css',
})
const needClean = new CleanWebpackPlugin(['dist'])
const bundleView = new BundleAnalyzerPlugin()
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html"
});


module.exports = {
  entry: { main: './src/index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    chunkFilename: '[name].[contenthash:8].chunk.js',
    filename: '[name].[contenthash:8].js'
  },
  module: {
    rules: [{
      test: /\.js$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      query: {
        "presets": [
          "react",
          "es2015",
          "stage-0"
        ],
        "plugins": [
          ['import', [{
            libraryName: "antd",
            style: 'css'
          }]],
        ],
      }
    },
    {
      test: /\.css$/,
      use: [MiniCssExtractPlugin.loader, "css-loader"]
    },
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: ['file-loader']
    }
  ]
  },
  plugins: [htmlPlugin, needClean, handleCss]
};