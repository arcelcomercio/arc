module.exports = ({
  options
}) => ({
  plugins: {
    'postcss-import': {},
    'postcss-preset-env': {
      stage: 2,
      autoprefixer: {
        grid: 'autoplace',
      },
      features: {
        'nesting-rules': true,
        'custom-media-queries': true,
      },
    },
    'postcss-flexbugs-fixes': {},
    'css-mqpacker': {},
    'cssnano': options.env === 'production' ? options.cssnano : false,
  },
})