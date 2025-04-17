const express = require('express');
const authController= require('../Controllers/authController');
const router = express.Router();

router.post('/register',authController.register);
router.post('/login',authController.login);
router.put('/forgetPassword',authController.forgetPassword);
router.post('/verify-otp',authController.verifyOtp);                  // Step 2: OTP verification
router.put('/reset-password',authController.resetPassword);          // Step 3: Reset password

module.exports = router;
