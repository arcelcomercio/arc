module.exports = {
    plugins: {
      'postcss-import': {},
      'postcss-preset-env': {
        stage: 2,
        autoprefixer: { grid: true },
        features: {
          'nesting-rules': true
        }
      }
    }
  }