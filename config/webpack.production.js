const CompressionWebpackPlugin = require('compression-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = () => ({
  plugins: [
    new CompressionWebpackPlugin(),
    new CleanWebpackPlugin(['../build'], { verbose: true, allowExternal: true }),
  ],
})
