'use strict';

var PluginError = require('plugin-error');
var extend = require('extend-shallow');
var toTemplate = require('to-template');

/**
 * Render templates
 */

module.exports = function (app) {
  return function (file, next) {
    var template = app.getTaskFile(file);
    template = toTemplate(template);
    var ctx = extend({}, template.data, file.locals);

    template.render(ctx, function (err, content) {
      if (err) return next(err);

      // file.content = content;
      file.contents = content;
      next();
    });
  }
};
