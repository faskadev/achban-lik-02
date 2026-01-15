const { Review, Restaurant, User } = require('../models');
const { validationResult } = require('express-validator');

// @desc    Get all reviews for current user
// @route   GET /api/reviews/me
// @access  Private
const getMyReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll({
      where: { userId: req.user.id },
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'mainImage', 'city']
        }
      ],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      count: reviews.length,
      reviews
    });
  } catch (error) {
    console.error('Get my reviews error:', error);
    res.status(500).json({
      error: 'Failed to fetch reviews'
    });
  }
};

// @desc    Create a new review
// @route   POST /api/reviews
// @access  Private
const createReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { restaurantId, rating, comment, visitDate } = req.body;

    // Check if restaurant exists
    const restaurant = await Restaurant.findByPk(restaurantId);
    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }

    // Check if user already reviewed this restaurant
    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        restaurantId
      }
    });

    if (existingReview) {
      return res.status(400).json({
        error: 'You have already reviewed this restaurant. Please edit your existing review instead.'
      });
    }

    // Create review
    const review = await Review.create({
      userId: req.user.id,
      restaurantId,
      rating: parseInt(rating),
      comment,
      visitDate
    });

    // Fetch the created review with associations
    const createdReview = await Review.findByPk(review.id, {
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'mainImage', 'city']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(201).json({
      message: 'Review created successfully',
      review: createdReview
    });
  } catch (error) {
    console.error('Create review error:', error);
    res.status(500).json({
      error: 'Failed to create review'
    });
  }
};

// @desc    Update a review
// @route   PUT /api/reviews/:id
// @access  Private
const updateReview = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const { rating, comment, visitDate } = req.body;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        error: 'Review not found'
      });
    }

    // Check if user owns the review
    if (review.userId !== req.user.id) {
      return res.status(403).json({
        error: 'You can only edit your own reviews'
      });
    }

    // Update review
    await review.update({
      rating: parseInt(rating),
      comment,
      visitDate
    });

    // Fetch updated review with associations
    const updatedReview = await Review.findByPk(id, {
      include: [
        {
          model: Restaurant,
          as: 'restaurant',
          attributes: ['id', 'name', 'mainImage', 'city']
        },
        {
          model: User,
          as: 'user',
          attributes: ['id', 'name']
        }
      ]
    });

    res.status(200).json({
      message: 'Review updated successfully',
      review: updatedReview
    });
  } catch (error) {
    console.error('Update review error:', error);
    res.status(500).json({
      error: 'Failed to update review'
    });
  }
};

// @desc    Delete a review
// @route   DELETE /api/reviews/:id
// @access  Private
const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    const review = await Review.findByPk(id);

    if (!review) {
      return res.status(404).json({
        error: 'Review not found'
      });
    }

    // Check if user owns the review
    if (review.userId !== req.user.id) {
      return res.status(403).json({
        error: 'You can only delete your own reviews'
      });
    }

    await review.destroy();

    res.status(200).json({
      message: 'Review deleted successfully'
    });
  } catch (error) {
    console.error('Delete review error:', error);
    res.status(500).json({
      error: 'Failed to delete review'
    });
  }
};

// @desc    Check if user can review a restaurant
// @route   GET /api/reviews/can-review/:restaurantId
// @access  Private
const canReviewRestaurant = async (req, res) => {
  try {
    const { restaurantId } = req.params;

    const existingReview = await Review.findOne({
      where: {
        userId: req.user.id,
        restaurantId
      }
    });

    res.status(200).json({
      canReview: !existingReview,
      existingReview: existingReview || null
    });
  } catch (error) {
    console.error('Can review error:', error);
    res.status(500).json({
      error: 'Failed to check review status'
    });
  }
};

module.exports = {
  getMyReviews,
  createReview,
  updateReview,
  deleteReview,
  canReviewRestaurant
};
