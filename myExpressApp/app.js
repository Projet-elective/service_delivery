var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const mongoose = require('mongoose');

var indexRouter = require('./routes/index');
var state_orderRouter = require('./routes/state_order');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/state_orders', state_orderRouter);

const uri = 'mongodb+srv://Maxence:sGuvnOpVCbCKTWh4@cluster0.2caar.mongodb.net/CESI_EAT/';
/*mongoose.connect(uri,
    { useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'CESI_EAT'
    })
    .then(() => console.log('Connexion à MongoDB  CESI_EAT réussie !'))
    .catch(() => console.log('Connexion à MongoDB CESI_EAT échouée !'));*/

mongoose.connect('mongodb://localhost:27017/cesi-eat')
    .then(() => console.log('Connexion à MongoDB méthode: user/pass réussie !'))
    .catch(() => console.log('Connexion à MongoDB méthode: user/pass échouée !'));

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
