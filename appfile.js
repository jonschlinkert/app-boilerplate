'use strict';

var through = require('through2');
var app = require('./');
var re = /(?:^|\s)(?:\/\*(?!\*?\/)([\s\S]+?)\*\/)/;

// app.option({delims: ['{{', '}}']});
app.layouts('test/fixtures/layouts/*.md');
app.data({name: 'Jon', blah: 'abc'});


app.task('default', function () {
  app.src('test/fixtures/foo.md')
    .pipe(app.dest('test/actual'))
});

// app.task('rename', function () {
//   app.src(['test/temp/**/*.*', '!**/temp/**'])
//     .pipe(through.obj(function(file, enc, cb) {
//       file.path = file.path.split('assemble').join('app');
//       var str = file.contents.toString();
//       str = str.split('assemble.init()').join('new application.App()');
//       str = str.split('var assemble = require(\'..\')').join('var application = require(\'..\')');
//       str = str.split('site').join('app');
//       str = strip(str).replace(/^\/\*\*\/\s+/g, '');
//       str = str.split('assemble').join('app');
//       file.contents = new Buffer(str);
//       this.push(file);
//       return cb();
//     }))
//     .pipe(app.dest('test'))
// });


// function strip(str) {
//   var match;
//   while (match = re.exec(str)) {
//     str = str.replace(match[1], '');
//   }
//   while (match = /(\/{2}[^\n]+)/.exec(str)) {
//     str = str.replace(match[1], '');
//   }
//   return str;
// }
