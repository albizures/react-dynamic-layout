module.exports = {
  coverageThreshold: {
    global: {
      branches: 40,
      functions: 60,
      lines: 50,
      statements: 50,
    },
  },
  testPathIgnorePatterns: ['dist', 'coverage', 'examples'],
  collectCoverageFrom: ['src/**/*.{ts, tsx}'],
  coverageReporters: ['html'],
  collectCoverage: true,
  coveragePathIgnorePatterns: ['examples'],
};
