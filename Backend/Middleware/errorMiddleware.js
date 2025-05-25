const jwt = require('jsonwebtoken');
const User = require('../models/User');
const secretKey = process.env.SECRET_KEY;

// Authentication Middleware
const authenticate = async (req, res, next) => {
  try {
    const cookies = req.cookies;
    if (!cookies || !cookies.token) {
      return res.status(401).json({ message: "No token provided in cookies" });
    }

    const token = cookies.token;
    const decoded = jwt.verify(token, secretKey);
    const user = await User.findById(decoded.user.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ message: "Your login has expired. Please log in again." });
  }
};

// Authorization Middleware
const authorize = (allowedRoles) => {
  return (req, res, next) => {
    const userRole = req.user?.role;

    if (!userRole || !allowedRoles.includes(userRole)) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    next();
  };
};

// Not Found Middleware
const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

// Error Handling Middleware
const errorHandler = (err, req, res, next) => {
  console.error(`🚨 Error: ${err.message}`, {
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    user: req.user ? req.user._id : 'Guest',
  });

  // Prevent sending headers if already sent
  if (res.headersSent) {
    return next(err); // fallback to default Express error handler
  }

  const statusCode = res.statusCode !== 200 ? res.statusCode : 500;

  res.status(statusCode).json({
    message: err.message || 'Internal Server Error',
    stack: process.env.NODE_ENV === 'production' ? null : err.stack
  });
};

module.exports = {
  authenticate,
  authorize,
  notFound,
  errorHandler
};