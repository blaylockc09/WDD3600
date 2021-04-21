const express = require('express');
const { check, body } = require('express-validator/check');
const authController = require('../controllers/auth');
const User = require('../models/user');
const router = express.Router();

// get login page
router.get('/login', authController.getLogin);
// get signup page
router.get('/signup', authController.getSignup);
// post login page
router.post(
    '/login',
    [
      body('email')
        .isEmail()
        .withMessage('Please enter a valid email address.')
        .normalizeEmail(),
      body('password', 'Password has to be valid.')
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim()
    ],
    authController.postLogin
  );
//post signup page
router.post(
    '/signup',
    [
      check('email')
        .isEmail()
        .withMessage('Please enter a valid email.')
        .custom((value, { req }) => {
          return User.findOne({ email: value }).then(userDoc => {
            if (userDoc) {
              return Promise.reject(
                'E-Mail exists already, please pick a different one.'
              );
            }
          });
        })
        .normalizeEmail(),
      body(
        'password',
        'Please enter a password with only numbers and text and at least 5 characters.'
      )
        .isLength({ min: 5 })
        .isAlphanumeric()
        .trim(),
      body('confirmPassword')
        .trim()
        .custom((value, { req }) => {
          if (value !== req.body.password) {
            throw new Error('Passwords have to match!');
          }
          return true;
        })
    ],
    authController.postSignup
  );
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