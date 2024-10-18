var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
/* const cors = require('cors'); */
const apiRouter = require('./routes/api');

var app = express();

// view engine setup
/* app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade'); */



/* 
// connect to mongodb
const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = "mongodb+srv://kwagi:q4VQtadoiPgXgqBo@cluster0.s1ckl.mongodb.net/kmla_storage?retryWrites=true&w=majority&appName=Cluster0";

// Get the default connection
const db = mongoose.connection;

main().catch((err) => console.log(err));
async function main() {
  await mongoose.connect(mongoDB);
}
 */

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


/* app.use(cors({
  origin: "http://localhost:5173",
  credentials: true,
  
})) */


/* app.use('/', indexRouter);
app.use('/users', usersRouter); */
app.use('/api', apiRouter);

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
