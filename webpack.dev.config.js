const merge = require('webpack-merge')
const webpackBaseConfig = require('./webpack.config.js')
const LoadNewInstallModule = require('./config/dev-tools/LoadNewInstallModule');

const paths = require('./config/paths')
const PORT = process.env.XHS_PORT || 3003

module.exports = (_env, args) => merge(webpackBaseConfig(_env, args), {
  devServer: {
    contentBase: paths.appPublic, // index.html的位置
    publicPath: '/', // 后续增加，之前只有contentBase: path.join(__dirname, "/"), // index.html的位置
    historyApiFallback: true,
    inline: true,
    compress: true,
    progress: true,
    port: PORT
  },
  plugins: [
    new LoadNewInstallModule(paths.app),
  ],
})