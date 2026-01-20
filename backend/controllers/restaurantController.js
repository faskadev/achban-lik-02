const { Restaurant, Review, User } = require('../models');
const { validationResult } = require('express-validator');
const { Sequelize } = require('sequelize');


const getRestaurants = async (req, res) => {
  try {
    const { city, type } = req.query;

   
    const where = {};
    if (city) {
      where.city = city;
    }

  
    const restaurants = await Restaurant.findAll({
      where,
      include: [
        {
          model: Review,
          as: 'reviews',
          attributes: []
        }
      ],
      attributes: {
        include: [
          [Sequelize.fn('COUNT', Sequelize.col('reviews.id')), 'reviewCount'],
          [Sequelize.fn('AVG', Sequelize.col('reviews.rating')), 'averageRating']
        ]
      },
      group: ['Restaurant.id'],
      order: [['createdAt', 'DESC']]
    });

    res.status(200).json({
      count: restaurants.length,
      restaurants
    });
  } catch (error) {
    console.error('Get restaurants error:', error);
    res.status(500).json({
      error: 'Failed to fetch restaurants'
    });
  }
};


const getRestaurantById = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id, {
      include: [
        {
          model: Review,
          as: 'reviews',
          include: [
            {
              model: User,
              as: 'user',
              attributes: ['id', 'name']
            }
          ],
          order: [['createdAt', 'DESC']]
        }
      ]
    });

    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }

    
    const reviewCount = restaurant.reviews.length;
    const averageRating = reviewCount > 0
      ? restaurant.reviews.reduce((sum, review) => sum + review.rating, 0) / reviewCount
      : 0;

    res.status(200).json({
      restaurant: {
        ...restaurant.toJSON(),
        averageRating: parseFloat(averageRating.toFixed(1)),
        reviewCount
      }
    });
  } catch (error) {
    console.error('Get restaurant error:', error);
    res.status(500).json({
      error: 'Failed to fetch restaurant'
    });
  }
};


const createRestaurant = async (req, res) => {
  try {
    console.log('Request body:', req.body);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      name,
      shortDescription,
      longDescription,
      address,
      city,
      latitude,
      longitude,
    } = req.body;
 
    if (!req.file) {
      return res.status(400).json({
        error: 'Restaurant image is required'
      });
    }

    const mainImage = `/uploads/restaurants/${req.file.filename}`;

    const restaurant = await Restaurant.create({
      name,
      shortDescription,
      longDescription,
      address,
      city,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      mainImage
    });

    res.status(201).json({
      message: 'Restaurant created successfully',
      restaurant
    });
  } catch (error) {
    console.error('Create restaurant error:', error);
    res.status(500).json({
      error: 'Failed to create restaurant'
    });
  }
};


const updateRestaurant = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { id } = req.params;
    const {
      name,
      shortDescription,
      longDescription,
      address,
      city,
      latitude,
      longitude
    } = req.body;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }

   
    const updateData = {
      name,
      shortDescription,
      longDescription,
      address,
      city,
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude)
    };

    
    if (req.file) {
      updateData.mainImage = `/uploads/restaurants/${req.file.filename}`;
    }

    await restaurant.update(updateData);

    res.status(200).json({
      message: 'Restaurant updated successfully',
      restaurant
    });
  } catch (error) {
    console.error('Update restaurant error:', error);
    res.status(500).json({
      error: 'Failed to update restaurant'
    });
  }
};


const deleteRestaurant = async (req, res) => {
  try {
    const { id } = req.params;

    const restaurant = await Restaurant.findByPk(id);

    if (!restaurant) {
      return res.status(404).json({
        error: 'Restaurant not found'
      });
    }

    await restaurant.destroy();

    res.status(200).json({
      message: 'Restaurant deleted successfully'
    });
  } catch (error) {
    console.error('Delete restaurant error:', error);
    res.status(500).json({
      error: 'Failed to delete restaurant'
    });
  }
};


const getCities = async (req, res) => {
  try {
    const cities = await Restaurant.findAll({
      attributes: [[Sequelize.fn('DISTINCT', Sequelize.col('city')), 'city']],
      raw: true
    });

    res.status(200).json({
      cities: cities.map(c => c.city)
    });
  } catch (error) {
    console.error('Get cities error:', error);
    res.status(500).json({
      error: 'Failed to fetch cities'
    });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  getCities
};
