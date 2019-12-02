const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = (mode, type = 'index') => {
  const javascript = {
    test: /\.(js|jsx)$/,
    exclude: /(node_modules|appnexus)/,
    use: {
      loader: 'babel-loader',
      options: {
        presets: ['@babel/preset-env'],
        cacheDirectory: true,
        /**
         * plugins: ['@babel/plugin-transform-runtime'],
         *
         * Si se piensa hacer que nuestro webpack realmente transpile JS
         * puro y duro, es recomendable habilitar este plugin de nuevo e
         * instalar:
         *
         * npm install -D @babel/plugin-transform-runtime
         * npm install @babel/runtime
         *
         */
      },
    },
  }

  const styles = {
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
  }

  const images = {
    test: /\.(jpeg|jpg|png|gif|svg|webp)$/,
    use: {
      loader: 'file-loader',
      options: {
        publicPath: '/pf/resources/dist/',
        name: ';[path];/images/[name].[ext]', // ;[path]; es reemplazado
        emitFile: type === 'index' && true,
      },
    },
  }

  const fonts = {
    test: /\.(ttf|woff|woff2)$/, // No .eot https://caniuse.com/#search=eot
    use: {
      loader: 'file-loader',
      options: {
        publicPath: '/pf/resources/dist/',
        name: ';[path];/fonts/[name].[ext]', // ;[path]; es reemplazado
        emitFile: type === 'index' && true,
      },
    },
  }

  const ico = {
    test: /\.ico$/,
    use: {
      loader: 'file-loader',
      options: {
        name: ';[path];/[name].[ext]', // ;[path]; es reemplazado
      },
    },
  }

  const rules = [styles, fonts, images]

  if (type !== 'amp' && type !== 'mobile' && type !== 'dmobile') {
    rules.unshift(javascript)
    rules.push(ico)
  }

  return rules
}
