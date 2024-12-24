const { Sequelize, DataTypes } = require('sequelize');
const dbConfig = require('../config/db.config'); // Correct import

// Initialize Sequelize with the correct configuration
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect, // Make sure dialect is passed here
});

// Define the User model
const User = sequelize.define('User', {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('user', 'admin'),
    defaultValue: 'user',
  },
}, {
  timestamps: true,
  tableName: 'users',
});

// Export the model and sequelize instance
module.exports = User;
