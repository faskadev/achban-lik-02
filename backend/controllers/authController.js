const jwt = require('jsonwebtoken');
const { User } = require('../models');
const { validationResult } = require('express-validator');


const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: '30d'
  });
};


const register = async (req, res) => {
  try {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({
        error: 'User with this email already exists'
      });
    }

    
    const user = await User.create({
      name,
      email,
      password,
      role: 'user'
    });

   
    const token = generateToken(user.id);

    res.status(201).json({
      message: 'User registered successfully',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({
      error: 'Failed to register user'
    });
  }
};


const login = async (req, res) => {
  try {
    
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

   
    const isPasswordValid = await user.comparePassword(password);

    if (!isPasswordValid) {
      return res.status(401).json({
        error: 'Invalid email or password'
      });
    }

   
    const token = generateToken(user.id);

    res.status(200).json({
      message: 'Login successful',
      user: user.toJSON(),
      token
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      error: 'Failed to login'
    });
  }
};


const getMe = async (req, res) => {
  try {
    res.status(200).json({
      user: req.user.toJSON()
    });
  } catch (error) {
    console.error('Get me error:', error);
    res.status(500).json({
      error: 'Failed to get user data'
    });
  }
};

module.exports = {
  register,
  login,
  getMe
};
