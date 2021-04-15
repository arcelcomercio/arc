const path = require('path')

module.exports = {
  automock: false,
  verbose: true,
  testURL: 'http://localhost/',
  testEnvironment: 'jest-environment-jsdom', // "jest-environment-node"
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
    '^.+\\.tsx?$': 'ts-jest',
  },
  globals: {
    NODE_ENV: 'test',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx'],
  collectCoverageFrom: [
    '**/components/**/*.{js,jsx,ts,tsx}',
    '**/content/sources/*.{js,ts}',
  ],
  coverageThreshold: {
    global: {
      statements: 0, // 85
      branches: 0, // 85
      functions: 0, // 85
      lines: 0, // 85
    },
  },
  // coveragePathIgnorePatterns: [],
  testMatch: [
    '**/__tests__/**/*.[jt]s?(x)',
    '**/components/**/*.test.[jt]s?(x)',
    '**/content/sources/*.test.[jt]s?(x)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  moduleDirectories: [
    'node_modules',
    path.join(__dirname, 'components'),
    'mocks',
    'properties',
  ],
  setupFilesAfterEnv: ['./config/setupTests.ts'],
  moduleNameMapper: {
    // "fusion:properties": require.resolve('./jest/example.js'),
  },
}
