const express = require('express');
const { register, login,forgetPassword,verifyOtp,resetPassword  } = require('../Controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/forgetPassword', forgetPassword);
router.post('/verify-otp', verifyOtp);                  // Step 2: OTP verification
router.put('/reset-password', resetPassword);          // Step 3: Reset password

module.exports = router;
