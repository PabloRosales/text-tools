module.exports = function (w) {
  return {
    files: ['src/sites/text-tools/tools/**/*.ts', 'src/sites/text-tools/utils/**/*.ts'],
    tests: ['src/tests/unit-tests/**/*.test.ts'],
    env: {
      type: 'node',
    },
    testFramework: 'jasmine',
  };
};
