const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getCities
} = require('../controllers/restaurantController');
const { authenticate, isAdmin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

// Validation rules
const restaurantValidation = [
  body('name').trim().notEmpty().withMessage('Restaurant name is required'),
  body('shortDescription').trim().notEmpty().withMessage('Short description is required'),
  body('longDescription').trim().notEmpty().withMessage('Long description is required'),
  body('address').trim().notEmpty().withMessage('Address is required'),
  body('city').trim().notEmpty().withMessage('City is required'),
  body('latitude').isFloat({ min: -90, max: 90 }).withMessage('Valid latitude is required'),
  body('longitude').isFloat({ min: -180, max: 180 }).withMessage('Valid longitude is required')
];

// Public routes
router.get('/', getRestaurants);
router.get('/filters/cities', getCities);
router.get('/:id', getRestaurantById);

// Admin routes
router.post('/', authenticate, isAdmin, upload.single('mainImage'), restaurantValidation, createRestaurant);
router.put('/:id', authenticate, isAdmin, upload.single('mainImage'), restaurantValidation, updateRestaurant);
router.delete('/:id', authenticate, isAdmin, deleteRestaurant);

module.exports = router;
