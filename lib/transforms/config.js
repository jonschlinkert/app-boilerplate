'use strict';

var Config = require('data-store');
var config = require('./config');

/**
 * Initialize a global config store, for persisting data
 * that may be reused across projects.
 *
 * Initialized in the `init` transform.
 */

module.exports = function config_(app) {
  app.config = new Config('app');

  app.transform('set', config.set);
  app.transform('get', config.get);
  app.transform('del', config.del);
  app.transform('union', config.union);
};
