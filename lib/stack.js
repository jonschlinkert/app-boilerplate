'use strict';

var through = require('through2');
var sessionify = require('sessionify');
var render = require('template-render');
var paths = require('gulp-dest-paths');
var init = require('template-init');
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
 * app.disable('src:foo plugin');
 * ```
 */

exports.src = function(app, glob, opts) {
  opts = _.merge({}, app.options, opts);
  session.set('src', opts);

  return createStack(app, {
    'src:vfs': vfs.src(glob, opts),
    'src:init': init(app)(opts)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('dest:bar plugin');
 * ```
 */

exports.dest = function (app, dest, opts) {
  var srcOpts = session.get('src') || {};
  opts = _.merge({}, app.options, srcOpts, opts);

  return createStack(app, {
    'dest:paths': paths(dest, opts),
    'dest:lint': plugins.lint(app),
    'dest:render': plugins.render(app, opts.locals),
    'dest:vfs': vfs.dest(dest, opts)
  });
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
 * app.disable('src:foo plugin');
 * app.disable('src:bar plugin');
 * ```
 */

function createStack(app, plugins) {
  if (app.enabled('minimal config')) {
    return through.obj();
  }
  function enabled(acc, plugin, name) {
    acc.push(through.obj());
    if (plugin == null) {
      return acc;
    }
    if (app.enabled(name + ' plugin')) {
      acc.push(plugin);
    }
    return acc;
  }
  var arr = _.reduce(plugins, enabled, []);
  var res = es.pipe.apply(es, arr);
  return sessionify(res, session, app);
}
