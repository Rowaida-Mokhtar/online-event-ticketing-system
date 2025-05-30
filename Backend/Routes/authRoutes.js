const express = require('express');
const authController= require('../Controllers/authController');
const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.put('/forgetPassword',authController.forgetPassword); //with MFA
router.get('/logout', authController.logout); // <-- Add this line
module.exports = router;
