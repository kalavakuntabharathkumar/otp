module.exports = {
  testEnvironment: 'jsdom',
  testMatch: ['<rootDir>/packages/**/*.test.js'],
  transform: { '^.+\\.[jt]sx?$': 'babel-jest' },
  moduleNameMapper: { '\\.(css)$': '<rootDir>/packages/app/src/testStyleMock.cjs' },
  clearMocks: true
}
