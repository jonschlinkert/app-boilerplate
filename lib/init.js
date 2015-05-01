'use strict';

var init = require('./transforms/');

/**
 * Load initialization transforms
 *
 *  | config
 *  | loaders
 *  | templates
 *  | options
 *  | middleware
 *  | plugins
 *  | load
 *  | engines
 */

module.exports = function init_(app) {
  app.transform('runner', init.runner);
  app.transform('metadata', init.metadata);

  app.once('loaded', function () {
    app.transform('cwd', init.cwd);
    app.transform('paths', init.paths);
    app.transform('config', init.config);
    app.emit('config');
  });

  app.once('config', function () {
    app.transform('middleware', init.middleware);
    app.transform('loaders', init.loaders);
    app.transform('create', init.create);
    app.transform('options', init.options);
    app.transform('plugins', init.plugins);
    app.transform('engines', init.engines);
    app.transform('helpers', init.helpers);
    app.transform('load', init.load);
    app.emit('init');
  });

  app.once('init', function () {
    app.transform('context', function () {});
    app.emit('last');
  });
};
