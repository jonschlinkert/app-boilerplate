'use strict';

var path = require('path');
var Vinyl = require('vinyl');
var isStream = require('is-stream');

/**
 * Expose `utils/` modules on `utils`
 */

var utils = require('export-files')(__dirname);

/**
 * Push a collection of templates into the stream (as vinyl files)
 */

utils.pushToStream = function pushToStream(collection, stream, fn) {
  if (isStream(stream) === false) {
    throw new TypeError('app#utils.pushToStream expects stream to be a stream.');
  }
  if (typeof fn !== 'function') {
    throw new TypeError('app#utils.pushToStream expects fn to be a function.');
  }
  for (var key in collection) {
    if (collection.hasOwnProperty(key)) {
      stream.push(typeof fn === 'function' ? fn(collection[key], Vinyl) : collection[key]);
    }
  }
};

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
 * Get the basename of a file path, excluding extension.
 *
 * @param {String} `fp`
 * @param {String} `ext` Optionally pass the extension.
 */

utils.basename = function basename(fp, ext) {
  if (typeof fp !== 'string') {
    throw new TypeError('app#utils.basename expects fp to be a string.');
  }
  return fp.substr(0, fp.length - (ext || path.extname(fp)).length);
};

/**
 * Ensure that a file extension is formatted properly.
 *
 * @param {String} `ext`
 */

utils.formatExt = function formatExt(ext) {
  if (typeof ext !== 'string') {
    throw new TypeError('app#utils.formatExt expects ext to be a string.');
  }
  if (ext.charAt(0) !== '.') ext = '.' + ext;
  return ext;
};

/**
 * Expose `utils`
 */

module.exports = utils;
