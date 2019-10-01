const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const common = require('./webpack.common.js');

const rootdir = path.join(__dirname, '../');

module.exports = merge(common, {
  mode: 'development',
  devtool: 'true',
  plugins: [
    new webpack.SourceMapDevToolPlugin({
      filename: '[name].js.map',
      exclude: /(common|.LICENSE)/
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: ["source-map-loader"],
        enforce: "pre"
      }
    ],
  },
  devServer: {
    host: '0.0.0.0',
    port: 3000,
    contentBase: `${rootdir}dist`,
    historyApiFallback: true
  }
});
