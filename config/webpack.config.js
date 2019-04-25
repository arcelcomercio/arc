/* eslint-disable global-require */
const path = require('path')
const webpack = require('webpack')

const baseDir = path.resolve(__dirname, '..')
const paths = {
  base: baseDir,
  // components: path.resolve(baseDir, 'components'),
  // chains: path.resolve(baseDir, 'components', 'chains'),
  config: path.resolve(baseDir, 'config'),
  // docs: path.resolve(baseDir, 'docs'),
  dist: path.resolve(baseDir, 'resources', 'dist'),
  // features: path.resolve(baseDir, 'components', 'features'),
  // fonts: path.resolve(baseDir, 'resources', 'fonts'),
  // images: path.resolve(baseDir, 'resources', 'images'),
  // layouts: path.resolve(baseDir, 'components', 'layouts'),
  // outputTypes: path.resolve(baseDir, 'components', 'output-types'),
  // reports: path.resolve(baseDir, 'reports'),
  resources: path.resolve(baseDir, 'resources'),
}
// Placeholder for webpack entries.
const entries = {}
// Get site(s) to include from .env in the project root.
const buildSites = ['elcomercio', 'depor', 'peru21', 'gestion', 'ojo']
// Render into webpack entry format
buildSites.forEach(site => {
  entries[site] = `./src/websites/${site}/index.js`
})
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')

module.exports = env => {
  const plugins = [
    new MiniCssExtractPlugin({
      filename: '[name]/css/style.css',
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

  // if (env.prod) {
  plugins.push(
    new CleanWebpackPlugin([paths.dist], {
      verbose: true,
      root: paths.base,
    })
  )
  // }

  const mode = env.dev ? 'development' : 'production'

  return {
    mode,
    context: paths.base,
    entry: entries,
    output: {
      path: paths.dist,
      publicPath: paths.dist,
      filename: '[name]/js/index.js',
    },
    // devtool: 'source-map',
    module: {
      rules: [{
          test: /\.(js|jsx)$/,
          exclude: /(node_modules)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: ['@babel/plugin-transform-runtime'],
            },
          },
        },
        {
          test: /\.(scss|css)$/,
          use: [{
              loader: MiniCssExtractPlugin.loader,
              options: {
                // you can specify a publicPath here
                // by default it use publicPath in webpackOptions.output
              },
            },
            {
              loader: 'css-loader',
              options: {
                // modules: true,
                importLoaders: 1,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                config: {
                  ctx: {
                    env: mode,
                    cssnano: {
                      preset: 'default',
                    },
                  },
                },
              },
            },
            {
              loader: 'resolve-url-loader',
              options: {},
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('sass'),
                sourceMap: false,
                outputStyle: 'expanded', // or compressed
              },
            },
          ],
        },
        {
          test: /\.(jpeg|jpg|png|gif|svg)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/pf/resources/dist/',
              name: ';[path];/images/[name].[ext]', // ;[path]; es reemplazado
            },
          },
        },
        {
          test: /\.(ttf|eot|woff|woff2)$/,
          use: {
            loader: 'file-loader',
            options: {
              publicPath: '/pf/resources/dist/',
              name: ';[path];/fonts/[name].[ext]', // ;[path]; es reemplazado
            },
          },
        },
        {
          test: /\.ico$/,
          use: {
            loader: 'file-loader',
            options: {
              name: ';[path];/[name].[ext]', // ;[path]; es reemplazado
            },
          },
        },
      ],
    },
    plugins,
  }
}
