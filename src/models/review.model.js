const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config'); // Correct import

// Initialize Sequelize with the correct configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect, // Make sure the dialect is passed here
});

// Define the Review model
const Review = sequelize.define('Review', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  bookTitle: { type: DataTypes.STRING, allowNull: false },
  author: { type: DataTypes.STRING, allowNull: false },
  image: { type: DataTypes.STRING },
  rating: { type: DataTypes.INTEGER, allowNull: false, validate: { min: 1, max: 5 } },
  reviewText: { type: DataTypes.TEXT, allowNull: false },
  status: { type: DataTypes.ENUM('pending', 'added', 'rejected'), defaultValue: 'pending' },
  dateAdded: { type: DataTypes.DATE, defaultValue: Sequelize.NOW },
});

// Export the model and sequelize instance
module.exports = { Review, sequelize };
