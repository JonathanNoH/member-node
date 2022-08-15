const express = require('express');
const router = express.Router();

//Require controllers
const member_controller = require('../controllers/memberController');
const message_controller = require('../controllers/messageController');

// GET home page
router.get('/', (req, res, next) => {
  res.render('index', { title: 'Message Board Home'});
});

// MEMBER ROUTES //

// GET member list
router.get('/members', member_controller.member_list);

// GET member create
router.get('/members/sign-up', member_controller.member_create_get);

// POST member create
router.post('/members/sign-up', member_controller.member_create_post);

// GET member remove
router.get('/member/:id/remove', member_controller.member_remove_get);

// POST member remove
router.get('/member/:id/remove', member_controller.member_remove_post);

// GET member update
router.get('/member/:id/update', member_controller.member_update_get);

// POST member update
router.get('/member/:id/update', member_controller.member_update_post);

// GET member update status
router.get('/member/:id/status', member_controller.member_status_update_get);

// POST member update status
router.post('/member/:id/status', member_controller.member_status_update_post);

// GET member detail
router.get('/member/:id', member_controller.member_detail);

// MESSAGE ROUTES //

// GET message submission form
router.get('/messages/new', message_controller.new_message_get);

// POST message submission form
router.post('/messages/new', message_controller.new_message_post);

// GET message delete
router.get('/messages/:id/delete', message_controller.message_delete_get);

// POST message delete
router.post('/messages/:id/delete', message_controller.message_delete_post);

// GET message detail
router.get('/messages/:id', message_controller.message_detail);

// GET message board
router.get('/messages', message_controller.message_board);


module.exports = router;