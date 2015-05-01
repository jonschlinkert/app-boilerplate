'use strict';

/**
 * Module dependencies.
 */

var through = require('through2');
var sessionify = require('sessionify');
var drafts = require('gulp-drafts');
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
 * app.disable('src:drafts plugin');
 * ```
 */

exports.src = function(app, glob, opts) {
  opts = _.extend({}, app.options, opts);
  session.set('src', opts);

  return createStack(app, {
    'src:vfs': vfs.src(glob, opts),
    'src:init': plugins.init.call(app, opts),
    'src:src': plugins.src.call(app, opts)
  });
};

/**
 * Default `dest` plugins to run.
 *
 * To disable a plugin:
 *
 * ```js
 * app.disable('dest:render plugin');
 * ```
 */

exports.dest = function (app, dest, opts) {
  var srcOpts = session.get('src') || {};
  opts = _.extend({overwrite: false}, app.options, srcOpts, opts);

  return createStack(app, {
    'dest:dest': plugins.dest.call(app, dest, opts.locals, opts),
    'dest:render': plugins.render.call(app, opts.locals, opts),
    // 'dest:last': plugins.last.call(app, opts),
    'dest:vfs': vfs.dest(dest, opts),
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
 * app.disable('src:render plugin');
 * app.disable('src:drafts plugin');
 * ```
 */

function createStack(app, plugins) {
  if (app.enabled('minimal config')) {
    return es.pipe.apply(es, []);
  }
  function enabled(acc, plugin, name) {
    if (plugin == null) {
      acc.push(through.obj());
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
