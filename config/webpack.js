//https://webpack.js.org/plugins/mini-css-extract-plugin/#minimizing-for-production
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const getCSSModuleLocalIdent = require('./module.hash');

// Remove UglifyJs, use TeserPlugin, Because:
// https://github.com/webpack-contrib/terser-webpack-plugin/issues/15

// const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
// Plugins
const handleCss = new MiniCssExtractPlugin({
  filename: 'static/css/[name].[contenthash:8].css',
  chunkFilename: 'static/css/[name].[contenthash:8].chunk.css',
})

const lessLoader = {
  loader: 'less-loader', // compiles Less to CSS
  options: {
    importLoaders: 2,
    modifyVars: {
      'primary-color': '#1890ff',
      'link-color': '#1890ff',
    },
    javascriptEnabled: true
  }
}

const cssLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    // minimize: true,
  }
}

const cssModulesLoader = {
  loader: 'css-loader',
  options: {
    importLoaders: 1,
    modules: true,
    getLocalIdent: getCSSModuleLocalIdent
  }
}

const postcssLoader = {
  loader: 'postcss-loader',
  options: {
    ident: 'postcss',
    plugins: () => [
      require('postcss-flexbugs-fixes'),
      require('postcss-preset-env')({
        autoprefixer: {
          flexbox: 'no-2009',
        },
        stage: 3,
      }),
      // https://github.com/csstools/postcss-preset-env#autoprefixer
      // autoprefixer({
      //   browsers: [
      //     '>1%',
      //     'last 4 versions',
      //     'Firefox ESR',
      //     'not ie < 9', // React doesn't support IE8 anyway
      //   ],
      //   flexbox: 'no-2009',
      // }),
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
  lessLoader,
  cssLoader,
  cssModulesLoader,
  postcssLoader,
  MiniCssExtractPlugin,
  splitChunks,
  workService
}