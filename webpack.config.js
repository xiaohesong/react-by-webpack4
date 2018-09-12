const path = require('path');
const webpack = require('webpack');
const configs = require('./config/webpack.js')

const IgnorePlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
const getClientEnvironment = require('./config/env.js')

module.exports = (_env, args) => {
  const env = getClientEnvironment(args.mode);
  const DefinePlugin = new webpack.DefinePlugin(env.stringified)
  const PORT = process.env.XHS_PORT || 3000
  return {
    entry: { main: './src/index.js' },
    output: {
      path: path.resolve(__dirname, 'dist'),
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      filename: 'static/js/[name].[contenthash:8].js'
    },
    optimization: {
      // SplitChunks的优化需要在最后处理，如果split chunks all会增加首次包的体积，需权衡.
      // splitChunks: splitChunks,
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      // splitChunks: {
      //     chunks: 'all',
      //     name: 'vendors',
      // },
      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // runtimeChunk: true,

      minimizer: [
        configs.uglifyConfig,
        configs.OptimizeCSSAssets
      ]
    },
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: 'ts-loader',
          exclude: /node_modules/
        },
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
          use: [configs.MiniCssExtractPlugin.loader, configs.cssLoader, configs.postcssLoader, configs.lessLoader] // end less use
        },
        {
          test: /\.(png|svg|jpg|gif|jpeg)$/,
          use: ['file-loader']
        }
      ]
    },
    // if need to show bundle package size, add bundleView to plugins
    plugins: [configs.htmlPlugin, configs.needClean, configs.handleCss, configs.Manifest, DefinePlugin, IgnorePlugin, configs.preloadPlugin],
    
    resolve: {
      extensions: [".ts", ".tsx", ".js"]
    },

    devServer: {
      contentBase: path.join(__dirname, "/"), // index.html的位置
      historyApiFallback: true,
      inline: true,
      compress: true,
      progress: true,
      port: PORT
    }
  }
};