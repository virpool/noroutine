'use strict';

const { parentPort, workerData } = require('worker_threads');

const { unwrapArgs } = require('./arguments');

const names = workerData.modules;
const target = names.reduce((o, name) => ({ ...o, ...require(name) }), {});

parentPort.on('message', (message) => {
  const method = target[message.method];
  method(...unwrapArgs(message.args))
    .then((result) => {
      parentPort.postMessage({ id: message.id, result });
    })
    .catch((error) => {
      parentPort.postMessage({ id: message.id, error });
    });
});
