module.exports = {
  rootDir: '.',
  moduleNameMapper: {
    '^@/common/(.*)$': '<rootDir>/src/$1'
  },
  testPathIgnorePatterns: [
    '/node_modules/',
    'test-skip',
    'test-helpers'
  ],
  collectCoverageFrom: ['**/*.{ts,tsx}', '!**/node_modules/**'],
  testEnvironment: 'node',
  preset: 'ts-jest'
}
