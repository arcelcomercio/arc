const path = require('path');
const webpack = require('webpack');

const baseDir = path.resolve(__dirname, '..');

const paths = {
  base: baseDir,
  components: path.resolve(baseDir, 'components'),
  chains: path.resolve(baseDir, 'components', 'chains'),
  config: path.resolve(baseDir, 'config'),
  docs: path.resolve(baseDir, 'docs'),
  dist: path.resolve(baseDir, 'resources', 'dist'),
  features: path.resolve(baseDir, 'components', 'features'),
  fonts: path.resolve(baseDir, 'resources', 'fonts'),
  images: path.resolve(baseDir, 'resources', 'images'),
  layouts: path.resolve(baseDir, 'components', 'layouts'),
  outputTypes: path.resolve(baseDir, 'components', 'output-types'),
  reports: path.resolve(baseDir, 'reports'),
  resources: path.resolve(baseDir, 'resources'),
};

// Placeholder for webpack entries.
const entries = {};

// Get site(s) to include from .env in the project root.
const buildSites = ["elcomercio", "depor"];

// Render into webpack entry format
buildSites.forEach(site => {
	entries[site] = `./src/websites/${site}/${site}.js`;
});

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//const CleanWebpackPlugin = require('clean-webpack-plugin');


module.exports = (env) => {
  let plugins = [
    new MiniCssExtractPlugin({
        filename: '[name]/css/style.css',
    }),
    // Aquí se reemplaza ;[path]; por el nombre del sitio web
    new webpack.LoaderOptionsPlugin({
      options: {
        customInterpolateName: (url) => {
          return url.replace(/;.+;/, url.match(/;.+websites\/(\w+).*;/)[1]);
        }
      }
    })
  ]

  /* if (env.NODE_ENV === 'production') {
    plugins.push(new CleanWebpackPlugin([paths.dist], {
        verbose: true,
        root: paths.base,
      }));
  } */

  return {
    mode: env.dev ? 'development': 'production',
    context: paths.base,
    entry: entries,
    output: {
        path: paths.dist,
        publicPath: paths.dist,
        filename: '[name]/js/index.js',
    },
    module: {
      rules: [
        {
            test: /\.(js|jsx)$/,
            exclude: /(node_modules)/,
            use: {
              loader: 'babel-loader',
              options: {
                presets: ['@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime']
              }
            }
        },
        {
          test: /\.css$/,
          use: [
            {
                loader: MiniCssExtractPlugin.loader,
                options: {
                    // you can specify a publicPath here
                    // by default it use publicPath in webpackOptions.output
                    publicPath: paths.dist
                }
            },
            {
                loader: 'css-loader',
                options: {
                  modules: true,
                  importLoaders: 1
                }
            },
            'postcss-loader'
        ]
        },
        {
          test: /\.(jpeg|jpg|png|gif|svg)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 4000,
              fallback: 'file-loader',
              name: ';[path];/images/[name].[ext]', // ;[path]; es reemplazado
            }
          }
        },
        {
          test: /\.(ttf|eot|woff)$/,
          use: {
            loader: 'url-loader',
            options: {
                limit: 5000,
                fallback: 'file-loader',
                name: ';[path];/fonts/[name].[ext]' // ;[path]; es reemplazado
            } 
          }
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
    },
    plugins
  }
}