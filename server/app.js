var createError = require('http-errors');
var express = require('express');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var usersRouter = require('./routes/users');
var courseRoutes = require('./routes/courseRoutes');
var studentRoutes = require('./routes/studentRoutes');
var courseContentRoutes = require('./routes/courseContentRoutes');
var errorMiddleware = require('./middleware/errorMiddleware');
require('dotenv').config();
var cors = require('cors');
require('./dbConnection/dbConnection')

var app = express();

var corsOption = {
  origin:"https://mern-adminpanel1-bwj1.vercel.app",
  methods:"GET,POST,PUT,PATCH,DELETE,HEAD",
  credential:true
};

app.use(cors(corsOption));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin",'https://mern-adminpanel1-bwj1.vercel.app')
})

// view engine setup
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));

app.use(usersRouter);
app.use(courseRoutes);
app.use(studentRoutes);
app.use(courseContentRoutes)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(errorMiddleware);

module.exports = app;
