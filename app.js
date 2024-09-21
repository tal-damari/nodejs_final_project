/*
Developers:
* Adar Azulay 208545285
* Tal Damari 208129643
* Shirel Oskar 318572401
 */

const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const User = require("./models/users.js");
mongoose.Promise = global.Promise;

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const aboutRouter = require('./routes/about');
const addcaloriesRouter = require('./routes/addcalories');
const reportRouter = require('./routes/report');

const app = express();

// Connect to mongodb
mongoose.connect("mongodb://127.0.0.1:27017/AdarTalShirel")
    .then(() => {
      console.log("Connected To DB Successfully")
    })
    .catch((err) => {
      console.log(err)
    })


// View engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/about', aboutRouter);
app.use('/addcalories', addcaloriesRouter);
app.use('/report', reportRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Render the error page
  res.status(err.status || 500);
  res.render('error');
});

async function addDefaultUser() {
  try {
    const user = await User.findOne({ id: "123123" });
    if (!user) {
      const birthday = new Date('1990-01-10');

      const formattedBirthday = birthday.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      const defaultUser = new User({
        id: "123123",
        first_name: "moshe",
        last_name: "israeli",
        birthday: birthday
      });

      await defaultUser.save();
      console.log(`Default user created successfully with birthday: ${formattedBirthday}`);
    } else {
      console.log("Default user already exists.");
    }
  } catch (error) {
    console.error("Error while checking/creating default user:", error);
  }
}

addDefaultUser();

module.exports = app;
