const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: './packages/app/src/main.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/[name].[contenthash:8].js',
    chunkFilename: 'assets/[name].[contenthash:8].chunk.js',
    clean: true,
    publicPath: '/'
  },
  resolve: { extensions: ['.js', '.jsx'] },
  module: { rules: [
    { test: /\.jsx?$/, exclude: /node_modules/, use: 'babel-loader' },
    { test: /\.css$/, use: ['style-loader', 'css-loader'] }
  ] },
  optimization: { splitChunks: { chunks: 'all' }, runtimeChunk: 'single' },
  plugins: [new HtmlWebpackPlugin({ template: './packages/app/index.html' })],
  performance: { hints: 'warning', maxAssetSize: 700000, maxEntrypointSize: 700000 }
}
