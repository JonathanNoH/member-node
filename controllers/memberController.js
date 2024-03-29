const Member = require('../models/member');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');
const bcrypt = require('bcryptjs');
const fs = require('fs');

let admin_code;
try {
  admin_code = fs.readFileSync(process.env.ADMIN_CODE);
} catch {
  admin_code = process.env.ADMIN_CODE;
}
const ADMIN_CODE = admin_code;

// Display members
exports.member_list = (req, res, next) => {
  
  const permission = (req.user && (req.user.membership === 'member' || req.user.membership === 'admin'));

  Member.find({}, 'firstName')
  .sort({firstName : 1})
  .exec((err, list_members) => {
    if (err) {return next(err)}
    res.render('member_list', { title: 'Member list', member_list: list_members, permission });
  });
};

// Display member detail
exports.member_detail = (req, res, next) => {
  
  async.parallel({
    member(callback) {
      Member.findById(req.params.id)
      .exec((err, results) => {
        callback(err, results);
      });
    },
    messages(callback) {
      Message.find({ 'author': req.params.id})
      .exec((err, results) => {
        callback(err, results);
      });
    },
  }, (err, results) => {
    if (err) { return next(err) }
    if (results.member===null) {
      let err = new Error('Member not found');
      err.status = 404;
      return next(err);
    }
    //success
    res.render('member_detail', { title: 'Member', member: results.member, messages: results.messages, id: req.params.id });
  });
};

exports.member_create_get = (req, res, next) => {
  res.render('sign-up', { title: 'Sign up' });
};

const checkEmailExists = (email) => {
  return new Promise((resolve, reject) => {
    Member.findOne({ username: email })
    .exec((err, user) => {
      if(err) {
        reject('Database error');
      }
      if (user) {
        reject('Email already in use.');
      }
      resolve();
    });
  })
}

exports.member_create_post = [

  //Validate and sanitize
  body('firstName').trim().escape().isLength({ min: 1}).withMessage('First Name required.'),
  body('lastName').trim().escape().isLength({ min: 1}).withMessage('Last Name required').escape(),
  body('username').escape().isEmail().normalizeEmail({ gmail_remove_dots: false}).withMessage('Please enter a valid email.')
  .custom(checkEmailExists),
  body('password').isLength({ min: 8 }).withMessage('Password must be at least 8 characters.'),
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
      res.render('sign-up', {
        title: 'Sign up',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        username: req.body.username,
        errors: errors.array()
      });
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
  Member.findById(req.params.id)
  .exec((err, member) => {
    if (err) { return next(err) }
    if (!member) {
      let err = new Error('Member not found');
      err.status = 404;
      return next(err);
    }
    const permission = (req.params.id === req.user.id || req.user.membership === 'admin')
    res.render('member_status_update', { title: 'Member Status Update', id: req.params.id, name: member.fullName, permission });
  })
};

exports.member_status_update_post = [
  
  body('code').trim().escape(),
  (req, res, next) => {
    if (req.body.code === 'upupdowndownleftrightleftrightba') {
      Member.findByIdAndUpdate(
        req.params.id,
        { membership: 'member'},
        {},
        (err, member) => {
          if (err) {return next(err)}
          // success
          res.redirect(member.url);
        }
      );
    } else if (req.body.code === ADMIN_CODE) {
      Member.findByIdAndUpdate(
        req.params.id,
        { membership: 'admin'},
        {},
        (err, member) => {
          if (err) {return next(err)}
          // success
          res.redirect(member.url);
        }
      );
    } else {
      Member.findById(req.params.id)
      .exec((err, member) => {
        if (err) { return next(err) }
        if (!member) {
          let err = new Error('Member not found');
          err.status = 404;
          return next(err);
        }
        res.render('member_status_update', { id: req.params.id, name: member.fullName, message: 'Incorrect code' });
      });
    }
  },
];