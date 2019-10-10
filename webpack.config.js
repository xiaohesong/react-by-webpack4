const webpack = require('webpack');
const path = require('path');
const glob = require('glob');
const MomentLocalesPlugin = require('moment-locales-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const InterpolateHtmlPlugin = require('./config/plugins/InterpolateHtmlPlugin')
const ModuleNotFoundPlugin = require('./config/plugins/ModuleNotFoundPlugin');
const PurgecssPlugin = require('purgecss-webpack-plugin');

const paths = require('./config/paths')
const configs = require('./config/webpack.js')

const IgnorePlugin = new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
const getClientEnvironment = require('./config/env.js')


const htmlPlugin = new HtmlWebpackPlugin({
  template: paths.appHtml,
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

const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;
const BUNDLE_ANALYZER_PORT_DEFAULT = 8888

const stylelintConfigs = {
  context: 'src',
  files: ['**/*.css'],
}
const stylelintable = false

module.exports = (_env, args) => {
  const isEnvDevelopment = args.mode === 'development';
  const isEnvProduction = args.mode === 'production';

  const publicPath = isEnvProduction ?
    paths.servedPath :
    isEnvDevelopment && '/';

  const shouldUseRelativeAssetPaths = publicPath === './';

  const publicUrl = isEnvProduction ?
    publicPath.slice(0, -1) :
    isEnvDevelopment && '';

  const env = getClientEnvironment(args.mode, publicUrl);
  const DefinePlugin = new webpack.DefinePlugin(env.stringified)

  const BundleAnalyzerPluginable = process.env.BUNDLE_ANALYZER
  const shouldUseSourceMap = process.env.GENERATE_SOURCEMAP === 'true';

  const Manifest = new ManifestPlugin({
    fileName: 'asset-manifest.json',
    publicPath: publicPath,
  })

  const PATHS = {
    src: path.join(__dirname, 'src')
  }

  return {
    bail: isEnvProduction,
    devtool: isEnvProduction ?
      shouldUseSourceMap ?
      'source-map' :
      false :
      isEnvDevelopment && 'cheap-module-source-map',
    entry: { main: './src/index.js' },
    stats: {
      entrypoints: false,
      children: false,
      modules: false, // 取消模块构建信息
      warnings: false
    },
    output: {
      path: isEnvProduction ? paths.appBuild : undefined,
      chunkFilename: isEnvProduction ?
        'static/js/[name].[contenthash:8].chunk.js' :
        isEnvDevelopment && 'static/js/[name].chunk.js',
      filename: isEnvProduction ?
        'static/js/[name].[contenthash:8].js' :
        isEnvDevelopment && 'static/js/bundle.js',

      publicPath: publicPath,
    },
    optimization: {
      minimize: isEnvProduction,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            parse: {
              ecma: 8,
            },
            compress: {
              ecma: 5,
              warnings: false,
              comparisons: false,
              inline: 2,
            },
            mangle: {
              safari10: true,
            },
            output: {
              ecma: 5,
              comments: false,
              ascii_only: true,
            },
          },
          parallel: true,
          // Enable file caching
          cache: true,
          sourceMap: shouldUseSourceMap,
        }),
        new OptimizeCSSAssetsPlugin({
          cssProcessorOptions: {
            safe: true
          }
        })
      ],
      splitChunks: {
        chunks: 'all',
        name: false,
      },
      runtimeChunk: true,
    },
    module: {
      rules: [
        // {
        //   test: /\.(tsx|ts)?$/,
        //   loader: 'ts-loader',
        //   exclude: /node_modules/
        // },
        {
          test: /\.(js|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          loader: 'babel-loader',
          query: {
            cacheDirectory: true,
            compact: isEnvProduction,
            "presets": [
              // https://babeljs.io/docs/en/babel-preset-react
              "@babel/preset-react",
              // es2015 to env https://babeljs.io/docs/en/env
              "@babel/preset-env",
              // https://babeljs.io/docs/en/babel-preset-typescript
              "@babel/preset-typescript",

              // https://babeljs.io/blog/2018/07/27/removing-babels-stage-presets
            ],
            "plugins": [
              ["import", {
                "libraryName": "antd",
                "libraryDirectory": "es",
                "style": true
              }],
              // https://babeljs.io/docs/en/babel-plugin-transform-runtime
              ["@babel/plugin-transform-runtime", {
                "helpers": false, // defaults to true
              }],
              ["@babel/plugin-proposal-class-properties", {
                "loose": true
              }],
              require('@babel/plugin-syntax-dynamic-import').default,
              isEnvProduction && [
                // Remove PropTypes from production build
                require('babel-plugin-transform-react-remove-prop-types').default,
                {
                  removeImport: true,
                },
              ],
            ].filter(Boolean), // End plugins
          },
        },
        {
          oneOf: [
            {
              test: /\.(less|css)$/,
              exclude: cssModuleRegex,
              sideEffects: true,
              use: [
                isEnvDevelopment && require.resolve('style-loader'), 
                isEnvProduction && {
                  loader: configs.MiniCssExtractPlugin.loader,
                  options: Object.assign({},
                    shouldUseRelativeAssetPaths ? {
                      publicPath: '../../'
                    } : undefined
                  ),
                },
                configs.cssLoader, 
                configs.postcssLoader, 
                configs.lessLoader
              ].filter(Boolean) // end less use
            }, {
              test: cssModuleRegex,
              use: [
                isEnvDevelopment && require.resolve('style-loader'), 
                isEnvProduction && configs.MiniCssExtractPlugin.loader, 
                configs.cssModulesLoader, 
                configs.postcssLoader, 
                configs.lessLoader
              ].filter(Boolean) // end less use
            },

            {
              test: /\.(png|svg|jpg|gif|jpeg|bmp)$/,
              loader: require.resolve('url-loader'),
              options: {
                limit: 10000,
                name: 'static/media/[name].[hash:8].[ext]',
              },
            }, {
              // test: /\.(png|svg|jpg|gif|jpeg|bmp)$/,
              exclude: [/\.(js|jsx|ts|tsx)$/, /\.html$/, /\.json$/],
              loader: require.resolve('file-loader'),
              options: {
                name: 'static/media/[name].[hash:8].[ext]',
              },
            }
          ]
        },
      ]
    },
    // if need to show bundle package size, add bundleView to plugins
    plugins: [
      htmlPlugin, 
      new InterpolateHtmlPlugin(HtmlWebpackPlugin, env.raw),
      isEnvProduction && configs.handleCss,
      isEnvProduction && new PurgecssPlugin({
        whitelistPatterns: [/^ant/],
        paths: glob.sync(`${PATHS.src}/**/*`,  { nodir: true }),
      }),
      Manifest, 
      DefinePlugin, 
      IgnorePlugin, 
      new ModuleNotFoundPlugin(paths.appPath),
      // configs.preloadPlugin,
      isEnvProduction && new WorkboxWebpackPlugin.GenerateSW({
        clientsClaim: true,
        exclude: [/\.map$/, /asset-manifest\.json$/],
        importWorkboxFrom: 'cdn',
        navigateFallback: publicUrl + '/index.html',
        navigateFallbackBlacklist: [
          // Exclude URLs starting with /_, as they're likely an API call
          new RegExp('^/_'),
          // Exclude URLs containing a dot, as they're likely a resource in
          // public/ and not a SPA route
          new RegExp('/[^/]+\\.[^/]+$'),
        ],
      }),
      isEnvDevelopment && BundleAnalyzerPluginable && new BundleAnalyzerPlugin({
        analyzerPort: process.env.BUNDLE_ANALYZER_PORT || BUNDLE_ANALYZER_PORT_DEFAULT
      }),
      new MomentLocalesPlugin({
        localesToKeep: ['zh-cn'],
      }),
      stylelintable && isEnvDevelopment && new StyleLintPlugin(stylelintConfigs),
    ].filter(Boolean),
    
    resolve: {
      extensions: [".ts", ".tsx", ".js", ".json"],
      // alias: {
      //   '@interface': path.resolve(__dirname, './src/interface/FunctionProps'),
      //   '@fetch': path.resolve(__dirname, './src/tools/request.js'),
      //   "@commons": path.resolve(__dirname, './src/components/commons'),
      // }
    }
  }
};