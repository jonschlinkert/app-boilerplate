'use strict';

var app = require('./');
app.option({delims: ['{{', '}}']});
app.layouts('test/fixtures/layouts/*.md');
app.data({name: 'Jon', blah: 'abc'});

app.task('default', function () {
  app.src('test/fixtures/foo.md')
    .pipe(app.dest('test/actual'))
});
