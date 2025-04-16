const express = require('express');
const userController= require('../Controllers/authController');
const router = express.Router();

router.post('/register',userController.register);
router.post('/login',userController.login);
router.put('/forgetPassword',userController.forgetPassword);
router.post('/verify-otp',userController.verifyOtp);                  // Step 2: OTP verification
router.put('/reset-password',userController.resetPassword);          // Step 3: Reset password

module.exports = router;
