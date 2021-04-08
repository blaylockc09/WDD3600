/* init variables */
const express = require('express');
const authController = require('../controllers/auth');
const router = express.Router();
//route to the login page
router.get('/login', authController.getLogin);

//post to the '/login' 
router.post('/login', authController.postLogin);
// post to /logout
router.post('/logout', authController.postLogout);
module.exports = router;