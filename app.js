const express = require('express');
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

//set up mongodb
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"));

//set up express
const app = express();
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({ secret: 'cats', resave: false, saveUninitialized: false}));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// give access to locals for current user
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  next();
})

//set up routes
app.use('/', indexRouter);
app.use('/', authRouter);

app.listen(3000, () => console.log("app listening on port 3000"));