'use strict';

var chalk = require('chalk');
var utils = require('middleware-utils');
var middleware = require('../middleware');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(app) {
  app.onLoad(/./, utils.parallel([
    middleware.data,
    middleware.src,
    middleware.ext,
    debugFile('onLoad'),
  ]), utils.error('onLoad'));

  app.preRender(/./, utils.series([
    middleware.engine(app),
  ]), utils.error('preRender'));

  // the `debugFile` examples are to help you get familiar
  // with what's on the `file` object, and how middleware works.
  // remove these if you want
  app.preCompile(/./, debugFile('preCompile', true));
  app.preCompile(/./, function (file, next) {
    next();
  });

  app.preRender(/./, debugFile('preRender', true));
  app.preRender(/./, function (file, next) {
    next();
  });

  app.postRender(/./, debugFile('postRender', true));
  app.postRender(/./, function (file, next) {
    next();
  });
};

function debugFile(method, output) {
  return function(file, next) {
    if (!output) return next();
    console.log(chalk.yellow('//', method + ' ----------------'));
    console.log(chalk.bold('file.path:'), file.path);
    console.log(chalk.cyan('file.data:'), file.data);
    console.log(chalk.gray('file.opts:'), file.options);
    console.log(chalk.yellow('// end -----------------------'));
    console.log();
    next();
  };
}
