import type { Config } from 'jest';
// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';
// eslint-disable-next-line no-use-before-define

const createJestConfig = nextJest({
  dir: './',
});

// Add any custom config to be passed to Jest
const config: Config = {
  coverageProvider: 'v8',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: [
    'jest-plugin-context/setup',
    './jest.setup',
  ],
  coverageThreshold: {
    global: {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    },
  },
};

export default createJestConfig(config);
