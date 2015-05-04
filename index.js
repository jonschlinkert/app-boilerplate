'use strict';

var diff = require('diff');
var chalk = require('chalk');
var extend = require('lodash')._.extend;
var Template = require('template');
var toVinyl = require('to-vinyl');
var Task = require('orchestrator');
var vfs = require('vinyl-fs');

var session = require('./lib/session');
var stack = require('./lib/stack');
var utils = require('./lib/utils');
var init = require('./lib/init');

/**
 * Initialize `App`
 *
 * @param {Object} `context`
 * @api private
 */

function App() {
  Template.apply(this, arguments);
  Task.apply(this, arguments);
  this.session = session;
  init(this);
}

extend(App.prototype, Task.prototype);
Template.extend(App.prototype);

/**
 * Glob patterns or filepaths to source files.
 *
 * ```js
 * app.src('src/*.hbs', {layout: 'default'})
 * ```
 *
 * @param {String|Array} `glob` Glob patterns or file paths to source files.
 * @param {Object} `options` Options or locals to merge into the context and/or pass to `src` plugins
 * @api public
 */

App.prototype.src = function(glob, opts) {
  return stack.src(this, glob, opts);
};

/**
 * Specify a destination for processed files.
 *
 * ```js
 * app.dest('dist', {ext: '.xml'})
 * ```
 *
 * @param {String|Function} `dest` File path or rename function.
 * @param {Object} `options` Options to `dest` plugins
 * @api public
 */

App.prototype.dest = function(dest, opts) {
  return stack.dest(this, dest, opts);
};

/**
 * Copy a `glob` of files to the specified `dest`.
 *
 * ```js
 * app.task('assets', function() {
 *   app.copy('assets/**', 'dist');
 * });
 * ```
 *
 * @param  {String|Array} `glob`
 * @param  {String|Function} `dest`
 * @return {Stream} Stream, to continue processing if necessary.
 * @api public
 */

App.prototype.copy = function(glob, dest, opts) {
  return vfs.src(glob, opts).pipe(vfs.dest(dest, opts));
};

/**
 * Define a App task.
 *
 * ```js
 * app.task('docs', function() {
 *   app.src(['.app.md', 'docs/*.md'])
 *     .pipe(app.dest('./'));
 * });
 * ```
 *
 * @param {String} `name`
 * @param {Function} `fn`
 * @api public
 */

App.prototype.task = App.prototype.add;

/**
 * Get the name of the current task-session. This is
 * used in plugins to lookup data or views created in
 * a task.
 *
 * ```js
 * var id = app.getTask();
 * var views = app.views[id];
 * ```
 *
 * @return {String} `task` The name of the currently running task.
 * @api public
 */

App.prototype.getTask = function() {
  var name = this.session.get('task');
  return typeof name !== 'undefined'
    ? 'task_' + name
    : 'taskFile';
};

/**
 * Get a view collection by its singular-form `name`.
 *
 * ```js
 * var collection = app.getCollection('page');
 * // gets the `pages` collection
 * //=> {a: {}, b: {}, ...}
 * ```
 *
 * @return {String} `name` Singular name of the collection to get
 * @api public
 */

App.prototype.getCollection = function(name) {
  if (typeof name === 'undefined') {
    name = this.getTask();
  }

  if (this.views.hasOwnProperty(name)) {
    return this.views[name];
  }

  name = this.inflections[name];
  return this.views[name];
};

/**
 * Get a file from the current session.
 *
 * ```js
 * var file = app.getFile(file);
 * ```
 *
 * @return {Object} `file` Vinyl file object. Must have an `id` property.
 * @api public
 */

App.prototype.getFile = function(file, id) {
  return this.getCollection(id)[file.id];
};

/**
 * Get a template from the current session, convert it to a vinyl
 * file, and push it into the stream.
 *
 * ```js
 * app.pushToStream(file);
 * ```
 *
 * @param {Stream} `stream` Vinyl stream
 * @param {String} `id` Get the session `id` using `app.getTask()`
 * @api public
 */

App.prototype.pushToStream = function(id, stream) {
  return utils.pushToStream(this.getCollection(id), stream, toVinyl);
};

/**
 * `taskFiles` is a session-context-specific getter that
 * returns the collection of files from the currently running `task`.
 *
 * ```js
 * var taskFiles = app.taskFiles;
 * ```
 *
 * @name .taskFiles
 * @return {Object} Get the files from the currently running task.
 * @api public
 */

Object.defineProperty(App.prototype, 'taskFiles', {
  configurable: true,
  enumerable: true,
  get: function () {
    return this.views[this.inflections[this.getTask()]];
  }
});

/**
 * Run an array of tasks.
 *
 * ```js
 * app.run(['foo', 'bar']);
 * ```
 *
 * @param {Array} `tasks`
 * @api private
 */

App.prototype.run = function() {
  var tasks = arguments.length ? arguments : ['default'];
  this.start.apply(this, tasks);
};

/**
 * Wrapper around Task._runTask to enable `sessions`.
 *
 * @param  {Object} `task` Task to run
 * @api private
 */

App.prototype._runTask = function(task) {
  var app = this;
  app.session.run(function () {
    app.session.set('task', task.name);
    Task.prototype._runTask.call(app, task);
  });
};

/**
 * Re-run the specified task(s) when a file changes.
 *
 * ```js
 * app.task('watch', function() {
 *   app.watch('docs/*.md', ['docs']);
 * });
 * ```
 *
 * @param  {String|Array} `glob` Filepaths or glob patterns.
 * @param  {Function} `fn` Task(s) to watch.
 * @api public
 */

App.prototype.watch = function(glob, opts, fn) {
  if (Array.isArray(opts) || typeof opts === 'function') {
    fn = opts; opts = null;
  }
  if (!Array.isArray(fn)) return vfs.watch(glob, opts, fn);
  return vfs.watch(glob, opts, function () {
    this.start.apply(this, fn);
  }.bind(this));
};

/**
 * Expose `app.App`
 */

App.prototype.App = App;

/**
 * Expose `app`
 */

module.exports = new App();
