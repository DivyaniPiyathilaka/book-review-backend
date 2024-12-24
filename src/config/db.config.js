require('dotenv').config(); // Make sure environment variables are loaded

module.exports = {
  HOST: process.env.DB_HOST || 'localhost',
  USER: process.env.DB_USER || 'root',
  DB: process.env.DB_NAME || 'book_review',
  dialect: process.env.DB_DIALECT || 'mysql', 
  JWT_SECRET: process.env.JWT_SECRET, 
};
