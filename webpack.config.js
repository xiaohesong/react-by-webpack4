const path = require('path');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer');

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

const lessLoader = {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    modifyVars: {
      'primary-color': '#1DA57A',
      'link-color': '#1DA57A',
    },
    javascriptEnabled: true
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      autoprefixer({
        browsers: [
          '>1%',
          'last 4 versions',
          'Firefox ESR',
          'not ie < 9', // React doesn't support IE8 anyway
        ],
        flexbox: 'no-2009',
      }),
    ], //postcss plugins end
  }
}

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
          ["import", {
            "libraryName": "antd",
            "style": true
          }]
        ] // End plugins
      },
    },
    {
      test: /\.(less|css)$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', postcssLoader, lessLoader] // end less use
    },
    {
      test: /\.(png|svg|jpg|gif|jpeg)$/,
      use: ['file-loader']
    }
  ]
  },
  // if need to show bundle package size, add bundleView to plugins
  plugins: [htmlPlugin, needClean, handleCss],

  devServer: {
    contentBase: path.join(__dirname, "/"), // index.html的位置
    historyApiFallback: true,
    inline: true,
    compress: true,
    progress: true,
  }
};