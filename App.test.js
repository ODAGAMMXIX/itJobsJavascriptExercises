const upper = require('./App'); //

test('upper should return a string in uppercase', () => {
  expect(upper('foo')).toBe('FOO'); //via-à-vis "assert"
});

// https://jestjs.io/docs/getting-started
// npm test