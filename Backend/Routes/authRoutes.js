const express = require('express');
const { register, login, forgetPassword } = require('../Controllers/authController');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.put('/forgetPassword', forgetPassword);

module.exports = router;
