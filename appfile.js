'use strict';

var app = require('./');

app.disable('foo');

app.task('default', function () {
  app.src('LICENSE')
    .pipe(app.dest('actual'))
});
