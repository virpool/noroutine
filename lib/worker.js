'use strict';

const { parentPort, workerData } = require('worker_threads');

const { unwrapArgs } = require('./arguments');

const names = workerData.modules;
const target = names.reduce((o, name) => ({ ...o, ...require(name) }), {});

const invokeMethodAsync = async (message) => {
  const method = target[message.method];
  return method(...unwrapArgs(message.args));
};

parentPort.on('message', (message) => {
  invokeMethodAsync(message)
    .then((result) => {
      parentPort.postMessage({ id: message.id, result });
    })
    .catch((error) => {
      parentPort.postMessage({ id: message.id, error });
    });
});
