const express = require('express');
const router = express.Router();
const upload = require('../middleware/upload.middleware');  // Import multer upload middleware
const reviewController = require('../controllers/review.controller');
const authMiddleware = require('../middleware/auth.middleware'); // Import the authentication middleware

// Route to get all reviews (public access)
router.get('/', reviewController.getAllReviews);

// Route to create a new review (only accessible by authenticated users)
router.post('/', authMiddleware.verifyToken, upload.single('image'), reviewController.createReview);

// Route to update a review (only accessible by the user who created the review)
router.put('/:id', authMiddleware.verifyToken, upload.single('image'), reviewController.updateReview);  // Include upload middleware

// Route to delete a review (only accessible by the user who created the review)
router.delete('/:id', authMiddleware.verifyToken, reviewController.deleteReview);

// Route to update the status of a review (only accessible by admin)
router.patch('/:id/status', authMiddleware.verifyToken, authMiddleware.isAdmin, reviewController.updateStatus);

module.exports = router;
