module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    "^.+\\.ts$": "ts-jest"
  },
  testMatch: ["**/?(*.)+(spec|test).ts"],
  globals: {
    "ts-jest": {
      isolatedModules: true
    }
  }
};
