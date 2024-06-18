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
var path = require('path')

var app = express();

app.use(cors())

var corsOption = {
  origin:"https://mern-adminpanel1.vercel.app",
};

app.use(cors(corsOption));

app.use((req,res,next) => {
  res.setHeader("Access-Control-Allow-Origin",'*');
  next();
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

app.get("/",(req,res) => {
  res.send("Hello")
});

// error handler
app.use(errorMiddleware);

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('adminpanel/build'));

  app.get('*', (req,res) => res.sendFile(path.resolve(__dirname, 'adminpanel', 'build','index.html')));
}

module.exports = app;
