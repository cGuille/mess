var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(function (request, response, next) {
    response.setHeader('x-powered-by', 'mess');
    next();
});

if (app.get('env') === 'development') {
    app.use('/', require('./routes/demo'));
}
app.use('/', require('./routes/event-source'));
app.use('/', require('./routes/api'));

// catch 404 and forward to error handler
app.use(function (request, response, next) {
    var error = new Error('Not Found');
    error.status = 404;
    next(error);
});

// error handlers

if (app.get('env') === 'development') {
    app.use(function (error, request, response, next) {
      console.error(error.stack);
      next(error, request, response);
    });
}

app.use(function (error, request, response, next) {
    response.status(error.status || 500);
    response.json({
        error: error.status ? error.message : 'An error occured.'
    });
});


module.exports = app;
