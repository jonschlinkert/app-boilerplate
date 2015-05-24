'use strict';

var es = require('event-stream');
var through = require('through2');
var gulp = require('gulp');
var cache = {};

function set(name, fn) {
  cache[name] = fn;
}
function get(name) {
  return cache[name];
}

set('foo', foo);
set('bar', bar);
set('baz', baz);

gulp.task('default', function () {
  gulp.src('test/fixtures/*.txt')
    // .pipe(foo())
    // .pipe(bar())
    // .pipe(baz())
    // .pipe(quux())
    .pipe(plugins(['foo', 'bar', 'baz'], {}))
    .pipe(gulp.dest('test/actual'))
});

function combine(plugins) {
  return es.pipe.apply(es, plugins);
}

function quux(options) {
  return es.pipe.apply(es, [
    // foo(options),
    // bar(options),
    // baz(options),
    base(options, a),
    base(options, b),
    base(options, c),
  ]);
}

function plugins(arr, opts) {
  var len = arr.length;
  var res = [], i = 0;
  while (len--) {
    var name = arr[i++];
    var fn = cache[name];
    res.push(fn(opts));
  }
  return es.pipe.apply(es, res);
}

function a(str) {
  return str + 'foo';
}
function b(str) {
  return str + 'bar';
}
function c(str) {
  return str + 'baz';
}

function base(options, fn) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();

    file.contents = new Buffer(fn(str));
    this.push(file);
    return cb();
  })
}

function foo(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();

    file.contents = new Buffer(str + 'foo');
    this.push(file);
    return cb();
  })
}

function bar(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();

    file.contents = new Buffer(str + 'bar');
    this.push(file);
    return cb();
  })
}

function baz(options) {
  return through.obj(function (file, enc, cb) {
    var str = file.contents.toString();

    file.contents = new Buffer(str + 'baz');
    this.push(file);
    return cb();
  })
}
