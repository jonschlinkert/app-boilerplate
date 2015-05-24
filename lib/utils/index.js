'use strict';

var path = require('path');
var Vinyl = require('vinyl');
var isStream = require('is-stream');

/**
 * Expose `utils/` modules on `utils`
 */

var utils = require('export-files')(__dirname);

/**
 * Coerce value to an array
 *
 * @api private
 */

utils.arrayify = function arrayify(val) {
  if (typeof val !== 'string' && !Array.isArray(val)) {
    throw new TypeError('app#utils.arrayify expects val to be a string or array.');
  }
  return !Array.isArray(val) ? [val] : val;
};

/**
 * Expose `utils`
 */

module.exports = utils;
