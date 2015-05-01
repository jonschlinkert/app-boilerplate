'use strict';

/**
 * Load built-in engines
 */

module.exports = function engines_(app) {
  app.engine('*', function noop(str, opts, cb) {
    if (typeof opts === 'function') cb = opts;
    cb(null, str);
  });
  app.engine('md', require('engine-lodash'));
};
