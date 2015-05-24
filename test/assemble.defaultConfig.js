/**
 * assemble <https://github.com/assemble/assemble>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert, Brian Woodward.
 * Licensed under the MIT License (MIT).
 */

'use strict';

var assert = require('assert');
var should = require('should');
var assemble = require('..');
var app;

describe('assemble defaultConfig', function () {
  beforeEach(function () {
    app = assemble.init();
  });

  describe('.defaultConfig()', function () {
    it('should set default values', function () {
      // Default options
      app.option('env').should.equal('dev');
      app.option('ext').should.equal('.hbs');
      // views
      app.option('view engine', 'noop');
      app.option('views', 'templates');
      app.option('delims', ['{{', '}}']);
    });

    it('should enable some plugins by default', function () {
      // Default `src` plugins
      app.enabled('src:vfs plugin').should.be.true;
      app.enabled('src:init plugin').should.be.true;
      app.enabled('src:drafts plugin').should.be.true;

      // Default `dest` plugins
      app.enabled('dest:paths plugin').should.be.true;
      app.enabled('dest:render plugin').should.be.true;
      app.enabled('dest:vfs plugin').should.be.true;
    });

    it('should disable some boolean options by default', function () {
      app.enabled('minimal config').should.be.false;
      app.disabled('minimal config').should.be.true;
    });
  });
});
