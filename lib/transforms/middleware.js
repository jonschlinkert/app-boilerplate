'use strict';

var chalk = require('chalk');
var utils = require('middleware-utils');
var middleware = require('../middleware');
var toTemplate = require('to-template');

/**
 * Initialize default middleware
 */

module.exports = function middleware_(app) {
  app.onLoad(/./, utils.parallel([
    middleware.data,
    middleware.src,
    middleware.ext,
    logFile('onLoad'),
  ]), utils.error('onLoad'));

  app.preRender(/./, utils.series([
    middleware.engine(app),
  ]), utils.error('preRender'));

  app.onSrc(/./, logFile('onSrc', true));

  app.preCompile(/./, logFile('preCompile', true));
  app.preCompile(/./, function (file, next) {
    next();
  });

  app.preRender(/./, logFile('preRender', true));
  app.preRender(/./, function (file, next) {
    // console.log(file)
    next();
  });

  app.postRender(/./, logFile('postRender', true));
  app.postRender(/./, function (file, next) {
    next();
  });

  app.onDest(/./, logFile('onDest', true));
  // app.onDest(/./, utils.series([
  //   middleware.render(app)
  // ]));

  app.onLast(/./, logFile('onLast'));
  app.onLast(/./, function (file, next) {
    // console.log(toTemplate(file))
    next();
  });
};

function logFile(method, output) {
  return function(file, next) {
    if (!output) return next();
    console.log(chalk.yellow('//', method + ' ----------------'));
    console.log(chalk.bold('file.path:'), file.path);
    // console.log(chalk.cyan('file.data:'), file.data);
    // console.log(chalk.gray('file.opts:'), file.options);
    console.log(chalk.yellow('// end -----------------------'));
    console.log();
    next();
  }
}
