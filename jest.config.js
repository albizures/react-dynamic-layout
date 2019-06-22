module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  collectCoverageFrom: ['src/**/*.{js}'],
  coverageReporters: ['html'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['examples'],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
};
