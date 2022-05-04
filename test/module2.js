'use strict';

const method3 = async (value) => {
  if (value) return { key: value };
  return null;
};

const method4 = async (value) => {
  if (value) return { key: value };
  return null;
};

const method5 = async (fn, value) => {
  if (value) return { key: fn(value) };
  return null;
};

const method6 = (value) => {
  if (value) return { key: value };
  return null;
};

module.exports = { method3, method4, method5, method6 };
