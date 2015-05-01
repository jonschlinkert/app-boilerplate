'use strict';

var through = require('through2');
var mu = require('middleware-utils');

module.exports = function (options) {
  var app = this;
  return through.obj(function srcPlugin(file, enc, cb) {
    app.handle('onSrc', file, mu.handleError(file, 'onSrc'));
    this.push(file);
    cb();
  });
};
