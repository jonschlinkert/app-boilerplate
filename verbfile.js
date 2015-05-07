'use strict';

var verb = require('verb');
var docs = require('./docs/docs.json');

/**
 * Pass data to templates
 */

verb.union('reflinks', docs.reflinks);

/**
 * Tasks
 */

verb.helper('stripHeading', function (str) {
  return str.replace(/^#[^\n]+/, '');
});

verb.task('default', function () {
  verb.src('.verb.md')
    .pipe(verb.dest('.'))
});
