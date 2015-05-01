/*!
 * app-boilerplate <https://github.com/jonschlinkert/app-boilerplate>
 *
 * Copyright (c) 2015 Jon Schlinkert.
 * Licensed under the MIT license.
 */

'use strict';

/* deps: mocha */
var assert = require('assert');
var should = require('should');
var app = require('./');

describe('app', function () {
  it('should:', function () {
    app('a').should.eql({a: 'b'});
    app('a').should.equal('a');
  });

  // it('should throw an error:', function () {
  //   (function () {
  //     app();
  //   }).should.throw('app expects valid arguments');
  // });
});
