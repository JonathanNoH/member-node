const Member = require('../models/member');
const Message = require('../models/message');

const { body, validationResult } = require('express-validator');
const async = require('async');

// Display members
exports.member_list = (req, res, next) => {
  res.send('NOT IMPLEMENTED: members list');
};

// Display member detail
exports.member_detail = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member detail');
};

exports.member_create_get = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member create get');
};

exports.member_create_post = (req, res, next) => {
  res.send('NOT IMPLEMENTED: member create post');
};

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