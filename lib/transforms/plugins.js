'use strict';

var render = require('template-render');
var paths = require('gulp-dest-paths');
var init = require('template-init');
var plugins = require('./plugins');


/**
 * Enable default plugins.
 */

module.exports = function(app) {
  app.plugin('init', init);
  // app.plugin('paths', paths);
  // app.plugin('render', render);

  // default `src` plugins
  app.enable('plugin src');
  app.enable('plugin init');

  // default `plugin dest`s
  app.enable('plugin paths');
  app.enable('plugin lint');
  app.enable('plugin render');
  app.enable('plugin dest');
};
