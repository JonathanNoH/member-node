const Member = require('../models/member');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');

// Display members
exports.member_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: members list');
};

// Display member detail
exports.member_detail = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member detail');
};

exports.member_create_get = (req, res, next) => {
  res.render('sign-up');
};

exports.member_create_post = [

  //Validate and sanitize
  body('firstName').trim().isLength({ min: 1}).escape().withMessage('First Name required.'),
  body('lastName').trim().isLength({ min: 1}).escape().withMessage('Last Name required'),
  body('username').escape().isEmail().normalizeEmail(),
  body('password').escape().isLength({ min: 8 }),
  body('confirmPassword').custom((value, { req }) => {
    if (value !== req.body.password) {
      throw new Error('Password confirmation does not match password');
    }
    // Success, they match
    return true;
  }),

  // if valid save
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.render('sign-up');
    } else {
      bcrypt.hash(req.body.password, 10, (err, hash) => {
        if (err) {
          return next(err);
        }
        const member = new Member({
          firstName: req.body.firstName,
          lastName: req.body.lastName,
          username: req.body.username,
          password: hash,
          membership: 'No'
        });
        member.save(err => {
          if(err) {
            return next(err);
          }
          res.redirect('/');
        });
      });
    };
  }
];

exports.member_remove_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member remove get');
};

exports.member_remove_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member remove post');
};

exports.member_update_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member update get');
};

exports.member_update_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member update post');
};

exports.member_status_update_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member status update get');
};

exports.member_status_update_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member status update post');
};