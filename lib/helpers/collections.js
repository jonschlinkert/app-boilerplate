'use strict';

/**
 * Loading helper collections
 */

module.exports = function collections_(app) {
  app.helpers({fs: require('fs')});
  app.helpers({path: require('path')});
  app.helpers({console: console});
};
