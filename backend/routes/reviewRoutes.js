const express = require('express');
const router = express.Router();
const { body } = require('express-validator');
const {
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  canReviewRestaurant
} = require('../controllers/reviewController');
const { authenticate } = require('../middleware/authMiddleware');


const reviewValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters'),
  body('visitDate').isDate().withMessage('Valid visit date is required'),
  body('restaurantId').isInt().withMessage('Valid restaurant ID is required')
];

const reviewUpdateValidation = [
  body('rating').isInt({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5'),
  body('comment').trim().notEmpty().withMessage('Comment is required').isLength({ min: 3 }).withMessage('Comment must be at least 3 characters'),
  body('visitDate').isDate().withMessage('Valid visit date is required')
];


router.use(authenticate);

router.get('/me', getMyReviews);
router.get('/can-review/:restaurantId', canReviewRestaurant);
router.post('/', reviewValidation, createReview);
router.put('/:id', reviewUpdateValidation, updateReview);
router.delete('/:id', deleteReview);

module.exports = router;
