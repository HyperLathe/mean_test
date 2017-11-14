var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
// load mongoose package
var mongoose = require('mongoose');

var routes = require('./routes/index');
var users = require('./routes/users');
var todos = require('./routes/todos');

// use native node promises
mongoose.Promise = global.Promise;

//connect to mongo db:

// mongoose.connect('mongodb://localhost/todo-api')
mongoose.connect('mongodb://test_user_rich:H2s04_db@ds249025.mlab.com:49025/mean_crud_app')
  .then(() =>  console.log('connection succesful!!'))
  .catch((err) => console.error(err));


//   MongoClient.connect('mongodb://test_database_01:H2s04_db@ds135069.mlab.com:35069/quotes-test', (err, database) => {
//     if (err) return console.log(err);
//     db = database;
//     app.listen(3000, () => {
//         console.log('listening on 3000');
//     });
// });

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', routes);
// app.use('/', index);
// app.use('/todos', todos);

app.use('/', routes);
app.use('/users', users);
app.use('/todos', todos);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
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
