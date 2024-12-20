module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.[jt]sx?$',
    moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
    "moduleNameMapper": {
        "^@/(.*)$": "<rootDir>/$1"
      }
  };
  