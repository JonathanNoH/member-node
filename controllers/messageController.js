const Member = require('../models/member');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');

// display message board
exports.message_board = (req, res, next) => {
  Message.find({})
  .sort({ timestamp: 1 })
  .populate('author')
  .exec((err, results) => {
    if (err) {
      return next(err);
    }
    res.render('message_board', { messages: results });
  })
};

//details message
exports.message_detail = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Message Detail');
};

exports.new_message_get = (req, res, next) => {
  res.render('new_message');
};

exports.new_message_post = [

  // Sanitize validate
  body('title').trim().escape().isLength({ min: 1, max: 100 }).withMessage('Please enter a title between 1 and 100 characters.'),
  body('content').trim().escape().isLength({ min: 1, max: 1000}).withMessage('Messages can be between 1 and 1000 characters.'),

  (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
      res.render('new_message', {
        title,
        content,
      });
    } else {
      const date = new Date();
      const message = new Message({
        title: req.body.title,
        content: req.body.content,
        timestamp: date,
        author: req.user._id,
      });
      message.save(err => {
        if(err) {
          return next(err);
        }
        res.redirect('/messages');
      });
    }
  }

];

exports.message_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete message get');
};

exports.message_delete_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete message post');
};