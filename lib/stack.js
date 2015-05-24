'use strict';

var through = require('through2');
var sessionify = require('sessionify');
var render = require('template-render');
var paths = require('gulp-dest-paths');
var es = require('event-stream');
var vfs = require('vinyl-fs');
var _ = require('lodash');

/**
 * Local dependencies
 */

var plugins = require('./plugins');
var session = require('./session');

/**
 * Default `src` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('foo plugin');
 * ```
 */

exports.src = function(app, glob, opts) {
  opts = _.merge({}, app.options, opts);
  session.set('src', opts);

  return app.combine([
    vfs.src(glob, opts)
  ]);
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('bar plugin');
 * ```
 */

exports.dest = function (app, dest, opts) {
  var srcOpts = session.get('src') || {};
  opts = _.merge({}, app.options, srcOpts, opts);

  return app.combine([
    paths(dest, opts),
    plugins.lint(app),
    plugins.render(opts),
    vfs.dest(dest, opts)
  ]);
};

/**
 * Create the default plugin stack based on user settings.
 *
 * Disable a plugin by passing the name of the plugin + ` plugin`
 * to `app.disable()`,
 *
 * **Example:**
 *
 * ```js
 * app.disable('foo plugin');
 * app.disable('bar plugin');
 * ```
 */

function createStack(app, plugins) {
  var arr = [through.obj()];

  if (app.enabled('minimal config')) {
    var res = sessionify(arr, session, app);
    return sessionify(res, session, app);
  }

  for (var name in plugins) {
    if (plugins.hasOwnProperty(name)) {
      if (app.enabled('plugin ' + name)) {
        arr.push(plugins[name]);
      }
    }
  }

  var res = es.pipe.apply(es, arr);
  return sessionify(res, session, app);
}
