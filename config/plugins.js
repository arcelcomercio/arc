const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const webpack = require('webpack')
const paths = require('./paths')

module.exports = (type) => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: `[name]/css/${type === 'amp' ? 'amp' : 'style'}.css`,
    }),
    // Aquí se reemplaza ;[path]; por el nombre del sitio web
    new webpack.LoaderOptionsPlugin({
      options: {
        customInterpolateName: url => {
          return url.replace(/;.+;/, url.match(/;.+websites\/(\w+).*;/)[1])
        },
      },
    }),
  ]

  if (type !== 'amp') {
    plugins.push(
      new CleanWebpackPlugin([paths.dist], {
        verbose: true,
        root: paths.base,
      })
    )
  }

  return plugins
}