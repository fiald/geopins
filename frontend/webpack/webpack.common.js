const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CheckerPlugin } = require('awesome-typescript-loader');
// require("core-js/stable");
require("regenerator-runtime/runtime");

const rootdir = path.join(__dirname, '../');
const srcdir = path.join(rootdir, '/src');

module.exports = {
  entry: [`${srcdir}/index.tsx`],
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
    alias: {
      actions: `${srcdir}/actions`,
      components: `${srcdir}/components`,
      pages: `${srcdir}/pages`,
      actions: `${srcdir}/actions`,
      helpers: `${srcdir}/helpers`
    }
  },
  devtool: false,
  output: {
    path: `${rootdir}/dist`,
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.js",
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        enforce: 'pre',
        loader: 'tslint-loader',
        options: { fix: true }
      },
      {
        test: /\.(ts|tsx)$/,
        loader: 'awesome-typescript-loader',
        options : {
          reportFiles: [
            'src/**/*.{ts,tsx}'
          ],
          useBabel: true,
          transpileOnly: false,
          babelCore: '@babel/core',
          babelOptions: {
              babelrc: false,
              presets: ["@babel/preset-react"],
              plugins: ["@babel/plugin-syntax-dynamic-import"]            
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${srcdir}/index.html`
    }),
    new CheckerPlugin()
  ]  
}
