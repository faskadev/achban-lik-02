const jwt = require('jsonwebtoken');
const { User } = require('../models');


const authenticate = async (req, res, next) => {
  console.log(req.body)
  try {
   
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({
        error: 'No token provided. Access denied.'
      });
    }

    const token = authHeader.substring(7); 

    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findByPk(decoded.userId);

    if (!user) {
      return res.status(401).json({
        error: 'Invalid token. User not found.'
      });
    }

    
    req.user = user;
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        error: 'Invalid token.'
      });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        error: 'Token expired.'
      });
    }
    return res.status(500).json({
      error: 'Authentication failed.'
    });
  }
};


const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    return res.status(403).json({
      error: 'Access denied. Admin privileges required.'
    });
  }
};

module.exports = {
  authenticate,
  isAdmin
};
