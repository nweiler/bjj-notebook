var express = require('express');
var logger = require('morgan');
var session = require('express-session');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var path = require('path');
var favicon = require('serve-favicon');

var routes = require('./routes/index');
var users = require('./routes/users');

var app = module.exports = express();

// view engine setup
app.set('view engine', 'jade');
app.set('views', path.join(__dirname, 'views'));

app.response.message = function(msg) {
  var sess = this.req.session
  sess.messages = sess.messages || {};o
  sess.messages.push(msg);o
  return this;
}

// log
if (!module.parent) app.use(logger('dev'));

//serve static files
app.use(express.static(__dirname + '/public'));

//session support
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: 'a super secret'
}));

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/', routes);
app.use('/users', users);

app.use(function(req, res, next) {
  var msgs = req.session.messages || {};
  res.locals.messages = msgs;
  res.locals.hasMessages = !!msgs.length;

  next();
  req.session.messages = [];
});

//load controllers
require('./lib/boot')(app, { verbose: !module.parent});


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});


// assume 404 since no middleware responded
app.use(function(req, res, next) {
  res.status(404).render('404', { url: req.originalUrl });
});

if (!module.parent) {
  app.listen(3000, function() {
    console.log('Express started on port 3000');
  });
}

/*
// error handlers
// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});
*/

