'use strict';

var path = require('path');
var utils = require('template-utils')._;

/**
 * Ensure that `ext` is on the file object.
 */

module.exports = function(file, next) {
  file.ext = file.ext || file.data.src.ext || path.extname(file.path);

  if (typeof file.ext === 'string') {
    file.ext = utils.formatExt(file.ext);
  }
  next();
};
