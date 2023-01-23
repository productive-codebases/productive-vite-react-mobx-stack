module.exports = {
  rootDir: '.',
  moduleNameMapper: {
    '^@/client/(.*)$': '<rootDir>/src/$1',
    '^@/common/(.*)$': '<rootDir>/../common/src/$1'
  },
  /**
   * Need to transform Lit dependencies down to CommonJS syntax to prevent error
   *  SyntaxError: Unexpected token 'export'
   *
   * Ref: https://github.com/facebook/jest/issues/11783#issuecomment-1107861603
   */
  transform: {
    '^.+\\.(js|jsx)$': [
      'babel-jest', {
        'presets': ['@babel/preset-env'],
        'plugins': [
          ['@babel/transform-runtime']
        ]
      }
    ]
  },
  transformIgnorePatterns: [
    // Ignore transpiling all "node_modules" except for the lit related modules. Those must be transpiled.
    // To support both Windows and MacOS we must use a RegEx that checks for either / or \ path separators.
    '(/|\\\\)node_modules(/|\\\\)(?!(@lit|@lit-labs|lit|lit-element|lit-html)(/|\\\\))'
  ],
  testPathIgnorePatterns: [
    '/node_modules/',
    'test-skip',
    'test-helpers'
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  setupFiles: [
    './src/libs/tests-helpers/reactLibrarySetup.ts'
  ],
  preset: 'ts-jest'
}
