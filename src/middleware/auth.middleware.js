const jwt = require('jsonwebtoken');
const config = require('../config/db.config');

// Middleware to authenticate user using JWT token
exports.verifyToken = (req, res, next) => {
  const token = req.header('Authorization')?.split(' ')[1]; // Get token from 'Authorization' header

  // If no token is found, deny access
  if (!token) {
    return res.status(403).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify token using the JWT secret
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Attach the user data to the request object
    req.user = decoded;

    // Continue to the next middleware or route handler
    next();
  } catch (err) {
    // Handle errors if token verification fails
    return res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user is admin
exports.isAdmin = (req, res, next) => {
  // Ensure user role is available on the request object
  if (!req.user || req.user.role !== 'admin') {
    return res.status(403).json({ message: 'Admin access required.' });
  }

  // Proceed to the next middleware or route handler if user is an admin
  next();
};
