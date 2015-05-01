'use strict';

/**
 * Load templates for built-in template types.
 */

module.exports = function load_(app) {
  app.examples('*.md', {cwd: process.cwd()});
};
