const jwt = require('jsonwebtoken');
require('dotenv').config();

const roles = {
  ADMIN: 'admin',
  USER: 'user',
  SELLER: 'seller',
  // Add other roles as needed
};

// Middleware to authenticate user by verifying JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error('Invalid token', error);
    res.status(400).json({ message: 'Invalid token' });
  }
};

// Middleware to check if the user has the required role
const checkRole = (requiredRoles) => {
  return (req, res, next) => {
    if (!Array.isArray(requiredRoles)) {
      requiredRoles = [requiredRoles];
    }
    if (!requiredRoles.includes(req.user.role)) {
      return res.status(403).json({ message: 'Access denied. Insufficient permissions.' });
    }
    next();
  };
};

// Middleware to check if the user owns the resource
const checkOwnership = (model) => {
  return async (req, res, next) => {
    try {
      const resource = await model.findById(req.params.id);
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
      if (resource.owner.toString() !== req.user.id) {
        return res.status(403).json({ message: 'Access denied. You do not own this resource.' });
      }
      next();
    } catch (error) {
      console.error('Error checking ownership', error);
      res.status(500).json({ message: 'Server error' });
    }
  };
};

module.exports = { roles, authMiddleware, checkRole, checkOwnership };
