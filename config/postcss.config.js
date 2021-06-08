module.exports = ({ mode }) => ({
  plugins: [
    'postcss-import',
    [
      'postcss-preset-env',
      {
        stage: 2,
        autoprefixer: {
          grid: 'autoplace',
        },
        features: {
          'nesting-rules': true,
          'custom-media-queries': true,
        },
      },
    ],
    'postcss-flexbugs-fixes',
    'css-mqpacker',
    mode === 'production'
      ? [
          'cssnano',
          {
            preset: ['advanced', { cssDeclarationSorter: true }],
          },
        ]
      : null,
  ],
})
