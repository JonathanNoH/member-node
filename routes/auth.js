const express = require('express');
const router = express.Router();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcryptjs');

const Member = require('../models/member');

passport.use(
  new LocalStrategy((username, password, done) => {
    Member.findOne({ username: username.toLowerCase() }) 
    .exec((err, user) => {
      if (err) {
        return done(err);
      }
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          return done(null, user);
        } else {
          return done(null, false, { message: "Incorrect password" });
        }
      });
    });
  })
);

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Member.findById(id, function(err, user) {
    done(err, user);
  });
});

// login and out

router.get('/login', (req, res, next) => {
  res.render('login');
});

router.post(
  '/login/password', 
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login'
  })
);

router.get('/logout', (req, res, next) => {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  });
});

module.exports = router;