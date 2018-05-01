/*
 * Node.js storage server
 *
 * (C) 2018 Hieu Hoang <info@hieuht.com>
 *
 */

const mongoose = require('mongoose');
const util = require('util');

const config = require('../config/config');
const app = require('../config/express');

const debug = require('debug')('project-name:index');

// Make bluebird default Promise
Promise = require('bluebird'); // eslint-disable-line no-global-assign

// Plugin bluebird promise in mongoose
mongoose.Promise = Promise;

// Connect to MongoDB
const mongoUri = config.mongo.host;
mongoose.connect(mongoUri, {
  autoReconnect: true,
  keepAlive: 1,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});

// Print mongoose logs in DEVELOPMENT mode
if (config.mongooseDebug) {
  mongoose.set('debug', (collectionName, method, query, doc) => {
    debug(`${collectionName}.${method}`, util.inspect(query, false, 20), doc);
  });
}

// Module.parent check is required to support mocha watch
// Src: https://github.com/mochajs/mocha/issues/1912
if (!module.parent) {
  // Listen on port config.port
  app.listen(config.port, () => {
    console.info(`Server started on port ${config.port} (${config.env})`); // eslint-disable-line no-console
  });
}

module.exports = app;
