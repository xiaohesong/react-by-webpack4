const paths = require('./paths')
const HtmlWebPackPlugin = require("html-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const autoprefixer = require('autoprefixer');

const PreloadWebpackPlugin = require('preload-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

// Remove UglifyJs, use TeserPlugin, Because:
// https://github.com/webpack-contrib/terser-webpack-plugin/issues/15

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// Plugins
const handleCss = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash:8].css',
  chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
})
const cleanOptions = {
  root: `${__dirname}/..`
}
const needClean = new CleanWebpackPlugin(['build'], cleanOptions)
const bundleView = new BundleAnalyzerPlugin()
const htmlPlugin = new HtmlWebPackPlugin({
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

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    minimize: true,
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

const preloadPlugin = new PreloadWebpackPlugin()
const OptimizeCSSAssets = new OptimizeCSSAssetsPlugin({
  cssProcessorOptions: {
    safe: true
  }
})

const testerWebpackPlugin = new TerserPlugin({
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
  sourceMap: false,
})

const Manifest = new ManifestPlugin({
  fileName: 'asset-manifest.json',
  // publicPath: '.',
})

const workService = new WorkboxWebpackPlugin.GenerateSW({
  clientsClaim: true,
  exclude: [/\.map$/, /asset-manifest\.json$/],
  importWorkboxFrom: 'cdn',
  navigateFallbackBlacklist: [
    // Exclude URLs starting with /_, as they're likely an API call
    new RegExp('^/_'),
    // Exclude URLs containing a dot, as they're likely a resource in
    // public/ and not a SPA route
    new RegExp('/[^/]+\\.[^/]+$'),
  ],
})


module.exports = {
  handleCss,
  needClean,
  htmlPlugin,
  lessLoader,
  cssLoader,
  postcssLoader,
  preloadPlugin,
  OptimizeCSSAssets,
  testerWebpackPlugin,
  MiniCssExtractPlugin,
  Manifest,
  splitChunks,
  bundleView,
  workService
}