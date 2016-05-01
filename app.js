var bodyParser = require('body-parser');
var express = require('express');
var favicon = require('serve-favicon');
var logger = require('morgan');
var path = require('path');
var proxy = require('express-http-proxy');

var apiRoutes = {
    providers: require('./routes/api/providers'),
    search: require('./routes/api/search'),
    by_state: require('./routes/api/by_state'),
    by_zip: require('./routes/api/by_zip'),
    by_city: require('./routes/api/by_city'),
    by_county: require('./routes/api/by_county'),
    by_service: require('./routes/api/by_service'),
    zips: require('./routes/api/zips'),
    states: require('./routes/api/states'),
    cities: require('./routes/api/cities'),
    counties: require('./routes/api/counties'),
    services: require('./routes/api/services')
}

var routes = require('./routes/index');
var users = require('./routes/users');
var search = require('./routes/search');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);
app.use('/search', search);


if (process.env.AHOCHI_PROXY) {
    app.use('/api/*', proxy(process.env.AHOCHI_PROXY, {
        forwardPath: function(req, res) {
            return req.originalUrl;
        }
    }));
}
else {
    app.use('/api/providers', apiRoutes.providers);
    app.use('/api/providers/search', apiRoutes.search);
    app.use('/api/providers/by_state', apiRoutes.by_state);
    app.use('/api/providers/by_zip', apiRoutes.by_zip);
    app.use('/api/providers/by_city', apiRoutes.by_city);
    app.use('/api/providers/by_county', apiRoutes.by_county);
    app.use('/api/providers/by_service', apiRoutes.by_service);
    app.use('/api/zips', apiRoutes.zips);
    app.use('/api/states', apiRoutes.states);
    app.use('/api/cities', apiRoutes.cities);
    app.use('/api/counties', apiRoutes.counties);
    app.use('/api/services', apiRoutes.services);
}

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