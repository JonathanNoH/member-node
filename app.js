const express = require('express');
const path = require("path");
const session = require('express-session');
const passport = require('passport');
const mongoose = require('mongoose');
require('dotenv').config();
const compression = require('compression');
const helmet = require('helmet');
const MongoDBStore = require('connect-mongodb-session')(session);

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth');

//set up mongodb
const mongoDb = process.env.MONGODB_URI;
mongoose.connect(mongoDb, { useUnifiedTopology: true, useNewUrlParser: true });
const db = mongoose.connection;
db.on('error', console.error.bind(console, "mongo connection error"));

//set up express
const app = express();
const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  databaseName: 'member-app',
  collection: 'mySessions'
},
(err) => {
  console.log(err);
});

// catch errors mongodb
store.on('error', (err) => {
  console.log(err);
});

app.use(compression());
app.use(helmet());
app.set("views", path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use('/static', express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'super secret cats attack',
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7 // a week
  },
  store: store,
  resave: true,
  saveUninitialized: true
}));

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log("app listening on port " + port));