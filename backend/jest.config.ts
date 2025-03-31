export default {
    preset: 'ts-jest',
    testEnvironment: 'node',
    // setupFilesAfterEnv: ['<rootDir>/test/setup.ts'],
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    testMatch: ['**/test/**/*.test.ts'],
    transform: {
      '^.+\\.ts$': 'ts-jest',
    },
    moduleFileExtensions: ['ts', 'js'],
  };
  