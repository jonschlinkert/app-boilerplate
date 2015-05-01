'use strict';

/**
 * Expose `session` on app, for getting the
 * current session from a running task.
 */

module.exports = function session_() {
  this.session = require('../session');
};
