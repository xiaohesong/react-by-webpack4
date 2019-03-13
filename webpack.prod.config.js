const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.js')
const {testerWebpackPlugin, OptimizeCSSAssets} = require('./config/webpack')

module.exports = (_env, args) => merge(webpackBaseConfig(_env, args), {
    optimization: {
      // SplitChunks的优化需要在最后处理，如果split chunks all会增加首次包的体积，需权衡.
      // splitChunks: splitChunks,
      // https://twitter.com/wSokra/status/969633336732905474
      // https://medium.com/webpack/webpack-4-code-splitting-chunk-graph-and-the-splitchunks-optimization-be739a861366
      // splitChunks: {
      //     chunks: 'all',
      //     name: false,
      // },
      // Keep the runtime chunk seperated to enable long term caching
      // https://twitter.com/wSokra/status/969679223278505985
      // runtimeChunk: true,
      // minimize: true,
      minimizer: [
        testerWebpackPlugin,
        OptimizeCSSAssets
      ]
    },
})  