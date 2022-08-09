const express = require('express');
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const bcrypt = require('bcryptjs');
const LocalStrategy = require('passport-local').Strategy;
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');

//set up mongodb
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"));

//set up express
const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//set up routes
app.use('/', indexRouter);

//404
app.use((req, res, next) => {
  next(createError(404));
});

app.listen(3000, () => console.log("app listening on port 3000"));