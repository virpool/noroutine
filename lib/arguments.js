'use strict';

const functionCache = {};

const buildFunction = (src) =>
  new Function('return (' + src + ').apply(null, arguments);');

const toFunction = (src) =>
  functionCache[src] || (functionCache[src] = buildFunction(src));

const wrappers = {
  function: (arg) => ({ type: 'function', value: String(arg) }),
  default: (arg) => ({ type: 'regular', value: arg }),
};

const unwrappers = {
  function: (arg) => toFunction(arg.value),
  default: (arg) => arg.value,
};

const wrapArgs = (args) =>
  args.map((arg) => (wrappers[typeof arg] || wrappers.default)(arg));

const unwrapArgs = (args) =>
  args.map((arg) => (unwrappers[arg.type] || unwrappers.default)(arg));

module.exports = {
  wrapArgs,
  unwrapArgs,
};
