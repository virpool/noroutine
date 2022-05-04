'use strict';

const FN_MARKER_FIELD = '__fnType';

const functionCache = {};

const buildFunction = (src) =>
  new Function('return (' + src + ').apply(null, arguments);');

const toFunction = (src) =>
  functionCache[src] || (functionCache[src] = buildFunction(src));

const wrappers = {
  function: (arg) => ({ [FN_MARKER_FIELD]: 'function', value: String(arg) }),
  default: (arg) => arg,
};

const unwrappers = {
  function: (arg) => toFunction(arg.value),
  default: (arg) => arg,
};

const wrapArgs = (args) =>
  args.map((arg) => (wrappers[typeof arg] || wrappers.default)(arg));

const unwrapArgs = (args) =>
  args.map((arg) =>
    (unwrappers[arg[FN_MARKER_FIELD]] || unwrappers.default)(arg)
  );

module.exports = {
  wrapArgs,
  unwrapArgs,
};
