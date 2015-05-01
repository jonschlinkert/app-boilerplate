'use strict';

/**
 * Initialize default options.
 */

module.exports = function options_(app) {
  app.option('layoutDelims', ['{%', '%}']);
  app.option('escapeDelims', ['<%%', '<%']);
};
