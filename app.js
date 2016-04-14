var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
var providers = require('./routes/providers');
var search = require('./routes/search');
var by_state = require('./routes/by_state');
var by_zip = require('./routes/by_zip');
var by_city = require('./routes/by_city');
var by_county = require('./routes/by_county');
var zips = require('./routes/zips');
var states = require('./routes/states');
var cities = require('./routes/cities');
var counties = require('./routes/counties');
var services = require('./routes/services');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/api/providers', providers);
app.use('/api/providers/search', search);
app.use('/api/providers/by_state', by_state);
app.use('/api/providers/by_zip', by_zip);
app.use('/api/providers/by_city', by_city);
app.use('/api/providers/by_county', by_county);
app.use('/api/zips', zips);
app.use('/api/states', states);
app.use('/api/cities', cities);
app.use('/api/counties', counties);
app.use('/api/services', services);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

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


module.exports = app;
