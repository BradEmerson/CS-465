var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors') // Added cors import (BME 2/15/2025)

var indexRouter = require('./app_server/routes/index'); // Added app_server to path (BME 1/13/2025)
var usersRouter = require('./app_server/routes/users'); // Added app_server to path (BME 1/13/2025)
var travelRouter = require('./app_server/routes/travel'); // Added travel route (BME 1/13/2025)
var apiRouter = require('./app_api/routes/index'); // Added API route index (BME 2/5/2025)
const hbs = require('hbs'); // imported express-compatible handlebars (as opposed to standalone handlebars lib) as hbs (BME 1/13/2025)

// Bring in the database (BME 2/5/2025)
require('./app_api/models/db');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'app_server', 'views')); // Added 'app_server' (BME 1/13/2025)

// register handlebars partials (https://www.npmjs.com/package/hbs)
hbs.registerPartials(__dirname + '/app_server/views/partials');

app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Enable CORS (BME 2/15/2025)
// (Note to professor: Angular wouldn't render the page upon completion of guide page 35, after several hours of troubleshooting,
// this section allowed the page to render once again).  BME 2/15/2025
app.use('/api', (req, res, next) => {
  const allowedOrigins = ['http://localhost:4200', 'https://localhost:4200']; // Added http(s) allowance to solve page not rendering on FrontEnd (BME 2/15/2025)
  
  if (allowedOrigins.includes(req.headers.origin)) {
    res.header('Access-Control-Allow-Origin', req.headers.origin);
  }
  
  res.header ('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Explicit method call 'OPTIONS' outside scope of course, used for debugging but kept for later use (BME 2/15/2025)
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }

  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/travel', travelRouter); // (BME 1/13/2025)
app.use('/api', apiRouter); // (BME 2/5/2025)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
