// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

global.console = {
  log: jest.fn(), // console.log are ignored in tests
  error: jest.fn(), // console.error are ignored in tests
  warn: console.warn,
  info: console.info,
  debug: console.debug,
};
