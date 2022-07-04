const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const {auth} = require('./auth');

const indexRouter = require('./routes/index');
const state_orderRouter = require('./routes/state_orders');
const commercialRouter = require('./routes/commercial');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Set the middleware before the other routes
app.use(auth);
app.use('/', indexRouter);
app.use('/api/state_orders', state_orderRouter);
app.use('/api/commercial', commercialRouter);

mongoose.connect('mongodb://localhost:27017/cesi-eat')
    .then(() => console.log('Connexion à MongoDB méthode réussie !'))
    .catch(() => console.log('Connexion à MongoDB méthode échouée !'));

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
