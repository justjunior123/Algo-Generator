require('dotenv').config();
module.exports = {
  rootDir: process.env.PROJECT_ROOT,
  testMatch: ['**/*.spec.js'],
  testPathIgnorePatterns: ['/node_modules/', '/session-'],
  testEnvironment: 'node',
  clearMocks: true
};
