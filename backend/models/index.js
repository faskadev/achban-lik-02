const { Sequelize } = require('sequelize');
const dotenv = require('dotenv');

dotenv.config();

// Initialize Sequelize with SQLite
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: 5432,
    logging: console.log,
  }
);

// Import models
const User = require('./User')(sequelize);
const Restaurant = require('./Restaurant')(sequelize);
const Review = require('./Review')(sequelize);

// Define associations
// User has many Reviews
User.hasMany(Review, {
  foreignKey: 'userId',
  as: 'reviews',
  onDelete: 'CASCADE'
});

Review.belongsTo(User, {
  foreignKey: 'userId',
  as: 'user'
});

// Restaurant has many Reviews
Restaurant.hasMany(Review, {
  foreignKey: 'restaurantId',
  as: 'reviews',
  onDelete: 'CASCADE'
});

Review.belongsTo(Restaurant, {
  foreignKey: 'restaurantId',
  as: 'restaurant'
});

module.exports = {
  sequelize,
  User,
  Restaurant,
  Review
};
