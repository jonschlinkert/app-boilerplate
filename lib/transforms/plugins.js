'use strict';

/**
 * Enable default plugins.
 */

module.exports = function(app) {
  // default `src` plugins
  app.enable('src:vfs plugin');
  app.enable('src:init plugin');

  // default `dest` plugins
  app.enable('dest:paths plugin');
  app.enable('dest:lint plugin');
  app.enable('dest:render plugin');
  app.enable('dest:vfs plugin');
};
