const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');
const dev = process.env.NODE_ENV !== "production";
module.exports = {
  mode: dev ? "development" : "production",
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './dist'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
        }
      }
    ]
  },
  plugins: [new HtmlWebpackPlugin({
    template: './src/template/index.html'
  })]
};