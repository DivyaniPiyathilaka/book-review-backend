const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const reviewRoutes = require('./routes/review.routes');
const authRoutes = require('./routes/auth.routes');  // Import the auth routes
const { sequelize } = require('./models/review.model');

const app = express();


// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/public/images', express.static('public/images'));


// Test DB Connection
sequelize.sync({ alter: true })
  .then(() => console.log('Database connected'))
  .catch((err) => console.error('Error connecting to the database', err));

// Routes
app.use('/api/reviews', reviewRoutes);  // Review-related routes
app.use('/api/auth', authRoutes);  // Authentication routes (register and login)

// Error Handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong!' });
});

module.exports = app;
