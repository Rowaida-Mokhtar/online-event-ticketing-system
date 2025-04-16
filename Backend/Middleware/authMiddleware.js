const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = process.env.SECRET_KEY

// Authentication Middleware
module.exports.authenticate = async function (req, res, next) {
  try {
    console.log("Inside auth middleware");

    const cookies = req.cookies;
    if (!cookies || !cookies.token) {
      return res.status(401).json({ message: "No token provided in cookies" });
    }
    const token = cookies.token;
    // Verify token
    const decoded = jwt.verify(token, secretKey);
    // Get user from DB
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

// Authorization Middleware
module.exports.authorize = function (allowedRoles) {
  return function (req, res, next) {
    const userRole = req.user?.role;

    if (!allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  };
};