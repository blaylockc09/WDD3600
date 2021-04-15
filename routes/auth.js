const express = require('express');

const authController = require('../controllers/auth');

const router = express.Router();

// get login page
router.get('/login', authController.getLogin);
// get signup page
router.get('/signup', authController.getSignup);
// post login page
router.post('/login', authController.postLogin);
//post signup page
router.post('/signup', authController.postSignup);
//post logout page
router.post('/logout', authController.postLogout);
// get the reset page
router.get('/reset', authController.getReset);
// post the reset page
router.post('/reset', authController.postReset);
// get the newpassword page
router.get('/reset/:token', authController.getNewPassword);
// post the newpassword page
router.post('/new-password', authController.postNewPassword);

module.exports = router;