const multer = require('multer');
const path = require('path');

// Storage configuration for multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Destination folder for uploaded files
    cb(null, 'public/images');
  },
  filename: (req, file, cb) => {
    // Generating a unique filename by appending a timestamp to the original file name
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

// File upload configuration using multer
const upload = multer({
  storage,
  // Optional: file validation to restrict types (only images)
  fileFilter: (req, file, cb) => {
    // Defining valid file types (images: jpeg, jpg, png, gif)
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    // If the file type is valid, continue; else, reject the file
    if (extname && mimetype) {
      return cb(null, true);
    } else {
      cb(new Error('Invalid file type. Only images are allowed.'));
    }
  },
});

// Export the upload middleware to use in routes
module.exports = upload;
