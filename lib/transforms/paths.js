'use strict';

/**
 * Prime `app.cache.paths`
 */

module.exports = function paths_(app) {
  app.cache.paths = app.cache.paths || [];
};
