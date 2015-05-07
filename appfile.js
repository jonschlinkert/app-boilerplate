'use strict';

var app = require('./');

// testing random stuff
app.disable('foo');

app.task('default', function () {
  app.src('LICENSE')
    .pipe(app.dest('actual'))
});
