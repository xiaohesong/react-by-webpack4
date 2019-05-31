const path = require('path');
const webpack = require('webpack');
const paths = require('./config/paths')
const configs = require('./config/webpack.js')

const IgnorePlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
const getClientEnvironment = require('./config/env.js')

module.exports = (_env, args) => {
  const isEnvDevelopment = args.mode === 'development';
  const isEnvProduction = args.mode === 'production';

  const publicPath = isEnvProduction ?
    paths.servedPath :
    isEnvDevelopment && '/';

  const publicUrl = isEnvProduction ?
    publicPath.slice(0, -1) :
    isEnvDevelopment && '';

  const env = getClientEnvironment(args.mode, publicUrl);
  const DefinePlugin = new webpack.DefinePlugin(env.stringified)

  return {
    entry: {
      main: './src/index.js'
    },
    stats: {
      entrypoints: false,
      children: false
    },
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      chunkFilename: 'static/js/[name].[contenthash:8].chunk.js',
      filename: 'static/js/[name].[contenthash:8].js',
      publicPath: publicPath,
    },
    module: {
      rules: [{
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
    plugins: [
      configs.htmlPlugin,
      configs.handleCss,
      configs.Manifest,
      DefinePlugin,
      IgnorePlugin,
      configs.preloadPlugin,
      configs.workService
    ].filter(Boolean),

    resolve: {
      extensions: [".ts", ".tsx", ".js"],
      alias: {
        '@tools': path.resolve(__dirname, './src/tools'),
      }
    }
  }
};