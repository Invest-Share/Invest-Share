/** @type {import('ts-jest').JestConfigWithTsJest} */

module.exports = {
  moduleFileExtensions: ['ts', 'js'],
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfigFile: 'tsconfig.json' }],
  },
  testMatch: ['**/server/test/**/*.test.(ts|js)'],
  testEnvironment: 'node',
};
