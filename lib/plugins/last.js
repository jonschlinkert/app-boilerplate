'use strict';

var through = require('through2');
var mu = require('middleware-utils');

module.exports = function (options) {
  var app = this;
  return through.obj(function lastPlugin(file, enc, cb) {
    app.handle('onLast', file, mu.handleError(file, 'onLast'));
    this.push(file);
    cb();
  });
};
