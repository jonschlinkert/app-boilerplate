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
 *  | helpers
 */

module.exports = function init_(app) {
  app.transform('metadata', init.metadata);
  app.transform('argv', init.argv);

  app.once('loaded', function () {
    app.transform('cwd', init.cwd);
    app.transform('paths', init.paths);
    app.emit('config');
  });

  app.once('config', function () {
    app.transform('config', init.config);
    app.transform('runner', init.runner);
    app.transform('options', init.options);
    app.transform('loaders', init.loaders);
    app.transform('create', init.create);
    app.transform('engines', init.engines);
    app.transform('middleware', init.middleware);
    app.transform('helpers', init.helpers);
    app.transform('load', init.load);
    app.transform('plugins', init.plugins);
    app.emit('init');
  });

  app.once('init', function () {
    app.transform('context', function () {});
    app.transform('helpers', init.helpers);
    app.emit('last');
  });
};
