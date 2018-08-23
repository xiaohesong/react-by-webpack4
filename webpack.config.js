const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer');

const getClientEnvironment = require('./config/env.js')

// Plugins
const handleCss = new MiniCssExtractPlugin({
  filename: '[name].[contenthash:8].css',
  chunkFilename: '[name].[contenthash:8].chunk.css',
})
const needClean = new CleanWebpackPlugin(['dist'])
const bundleView = new BundleAnalyzerPlugin()
const htmlPlugin = new HtmlWebPackPlugin({
  template: "./public/index.html",
  filename: "./index.html",
  minify: {
    removeComments: true,
    collapseWhitespace: true,
    removeRedundantAttributes: true,
    useShortDoctype: true,
    removeEmptyAttributes: true,
    removeStyleLinkTypeAttributes: true,
    keepClosingSlash: true,
    minifyJS: true,
    minifyCSS: true,
    minifyURLs: true,
  },
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

const splitChunks = {
  chunks: 'all',
  cacheGroups: {
    commons: {
      name: 'commons',
      minChunks: 2
    },
    vendor: {
      test: /[\\/]node_modules[\\/]/,
      name: 'vendor',
    },
  }
}

module.exports = (_env, args) => {
  const env = getClientEnvironment(args.mode);
  const DefinePlugin = new webpack.DefinePlugin(env.stringified)

  return {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: '[name].[contenthash:8].chunk.js',
      filename: '[name].[contenthash:8].js'
    },
    // optimization: {
    //   splitChunks: splitChunks,
    //   runtimeChunk: {
    //     name: 'manifest'
    //   },
    // },
    module: {
      rules: [
        {
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
              }],
              ["transform-runtime", {
                "helpers": false, // defaults to true
                "polyfill": false, // defaults to true
                "regenerator": true, // defaults to true
                "moduleName": "babel-runtime" // defaults to "babel-runtime"
              }],
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
    plugins: [htmlPlugin, needClean, handleCss, DefinePlugin],

    devServer: {
      contentBase: path.join(__dirname, "/"), // index.html的位置
      historyApiFallback: true,
      inline: true,
      compress: true,
      progress: true,
    }
  }
};