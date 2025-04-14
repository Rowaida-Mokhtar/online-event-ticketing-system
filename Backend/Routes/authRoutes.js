const express = require('express');
const router = express.Router();
const { register, login, forgetPassword } = require('../Controllers/authController');

router.post('/register', register);
router.post('/login', login);
router.put('/forgetPassword', forgetPassword);

module.exports = router;
