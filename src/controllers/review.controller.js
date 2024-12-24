

const { Review } = require('../models/review.model');
const path = require('path');

// Retrieve all reviews
exports.getAllReviews = async (req, res) => {
    try {
      const reviews = await Review.findAll();
      if (reviews.length === 0) {
        return res.status(404).json({ message: 'No reviews found' });
      }
      // Send the reviews, including image filename
      res.json(reviews);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error. Could not retrieve reviews.' });
    }
  };
  

// Create a new review
exports.createReview = async (req, res) => {
  try {
    const { bookTitle, author, rating, reviewText } = req.body;
    const image = req.file ? `${req.file.filename}` : null; // Save only the image path

    // Validation check for required fields
    if (!bookTitle || !author || !rating || !reviewText) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    const newReview = await Review.create({ bookTitle, author, rating, reviewText, image });
    res.status(201).json(newReview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not create review.' });
  }
};

// Update a review
exports.updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { bookTitle, author, rating, reviewText } = req.body;

    // Check if there's a new image uploaded
    let imagePath = req.file ? `${req.file.filename}` : null;

    // If there's no new image, keep the old image (if it exists)
    if (!imagePath && req.body.image) {
      imagePath = req.body.image;
    }

    const updated = await Review.update(
      { bookTitle, author, rating, reviewText, image: imagePath },
      { where: { id } }
    );

    if (updated[0]) {
      const updatedReview = await Review.findByPk(id);
      res.json(updatedReview);
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not update review.' });
  }
};

// Delete a review
exports.deleteReview = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Review.destroy({ where: { id } });

    if (deleted) {
      res.json({ message: 'Review deleted' });
    } else {
      res.status(404).json({ message: 'Review not found' });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error. Could not delete review.' });
  }
};

// Admin actions: Update review status// Admin actions: Update review status
exports.updateStatus = async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;
  
      // Validate the status value (it should be one of "pending", "added", or "rejected")
      if (!status || !['pending', 'added', 'rejected'].includes(status)) {
        return res.status(400).json({ message: 'Invalid status value. Allowed values are "pending", "added", or "rejected".' });
      }
  
      const review = await Review.findByPk(id);
      if (review) {
        review.status = status;
        await review.save();
        res.json(review);
      } else {
        res.status(404).json({ message: 'Review not found' });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error. Could not update review status.' });
    }
  };
  
