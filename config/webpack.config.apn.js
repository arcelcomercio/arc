const path = require('path')

const baseDir = path.resolve(__dirname, '..')

module.exports = {
  entry: {
    app: './src/websites/elcomercio/js/appnexus.js',
  },
  output: {
    path: path.resolve(baseDir, 'resources', 'dist', 'elcomercio', 'js'),
    filename: 'appnexus.js',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
    ],
  },
}
