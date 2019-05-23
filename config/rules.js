const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = mode => [
  {
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
    use: [
      {
        loader: MiniCssExtractPlugin.loader,
      },
      {
        loader: 'css-loader',
        options: {
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
        options: {
          keepQuery: true,
        },
      },
      {
        loader: 'sass-loader',
        options: {
          // eslint-disable-next-line global-require
          implementation: require('sass'),
          sourceMap: true,
          outputStyle: 'expanded',
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
]
