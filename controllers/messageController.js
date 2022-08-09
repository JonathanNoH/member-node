const Member = require('../models/member');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');

// display message board
exports.message_board = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Message board');
};

//details message
exports.message_detail = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Message Detail');
};

exports.new_message_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: New message');
};

exports.new_message_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: New message post');
};

exports.message_delete_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: Delete message get');
};

exports.message_delete_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: delete message post');
};