'use strict';

var through = require('through2');
var extend = require('extend-shallow');

module.exports = function(app, locals) {
  return through.obj(function (file, enc, cb) {
    file.content = file.contents.toString();
    var stream = this;

    locals = extend({}, file.data, locals);

    app.render(file, locals, function (err, res) {
      if (err) {
        stream.emit('error', new PluginError('render-plugin', err));
        return cb(err);
      }

      file.contents = new Buffer(res);
      stream.push(file);
      return cb();
    });
  });
};
