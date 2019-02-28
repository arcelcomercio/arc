module.exports = ({
  options
}) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 2,
      autoprefixer: {
        grid: true
      },
      features: {
        'nesting-rules': true,
        'custom-media-queries': true
      }
    },
    'css-mqpacker': {},
    'cssnano': options.env === 'production' ? options.cssnano : false
  }
})