const path = require('path')

module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    project: './tsconfig.eslint.json',
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  plugins: ['@typescript-eslint', 'simple-import-sort'],
  extends: [
    'airbnb-typescript',
    'plugin:@typescript-eslint/recommended',
    'plugin:jest/recommended',
    'prettier',
  ],
  rules: {
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'sort-imports': 'off',
    'import/order': 'off',
    'import/prefer-default-export': 'off',
    'import/no-extraneous-dependencies': [
      'error',
      {
        devDependencies: true,
        optionalDependencies: false,
        peerDependencies: false,
      },
    ],
    'import/no-unresolved': [
      'error',
      {
        ignore: [
          'types',
          'react',
          'prop-types',
          'fusion:consumer',
          'fusion:environment',
          'fusion:properties',
          'fusion:content',
          'fusion:context',
          'fusion:static',
        ],
      },
    ],
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-var-requires': 'off',
    '@typescript-eslint/comma-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'react/jsx-curly-newline': 'off',
    'react/forbid-prop-types': 'off',
    'react/require-default-props': 'off',
    'react/prop-types': 'off',
    'react/no-danger': 'off',
    'react/jsx-props-no-spreading': [
      'warn',
      {
        html: 'enforce',
        custom: 'enforce',
        explicitSpread: 'enforce',
        exceptions: [],
      },
    ],
    'no-underscore-dangle': 'off',
    'no-plusplus': [
      2,
      {
        allowForLoopAfterthoughts: true,
      },
    ],
    'jsx-a11y/media-has-caption': ['warn'],
    'jsx-a11y/label-has-associated-control': [
      'error',
      {
        required: {
          some: ['nesting', 'id'],
        },
      },
    ],
  },
  globals: {
    document: true,
    window: true,
    location: true,
    fetch: true,
  },
  overrides: [
    // {
    //   files: ['**/*.ts', '**/*.tsx'],
    //   parserOptions: {
    //     project: './tsconfig.json',
    //   },
    // },
    {
      files: ['**/__tests__/**', '**/*.{test,spec}.{js,jsx,ts,tsx}'],
      settings: {
        'import/resolver': {
          jest: {
            jestConfigFile: path.join(__dirname, './jest.config.ts'),
          },
        },
      },
    },
    {
      // only for service worker
      files: ['gulpfile.js', '**/*sw.js'],
      rules: {
        'no-restricted-globals': 'off',
      },
    },
  ],
  parser: '@typescript-eslint/parser',
}
