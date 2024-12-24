const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');
const config = require('../config/db.config');

// Register a new user
// Register a new user
exports.register = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate email, password, and role
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required.' });
      }
  
      // Check if email already exists
      const userExists = await User.findOne({ where: { email } });
      if (userExists) {
        return res.status(400).json({ message: 'Email already registered.' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      // Create new user
      const newUser = await User.create({ email, password: hashedPassword, role });
  
      res.status(201).json({ message: 'User registered successfully.', userId: newUser.id });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  };
  

// Login user
// Login user
exports.login = async (req, res) => {
    try {
      const { email, password, role } = req.body;
  
      // Validate email, password, and role
      if (!email || !password || !role) {
        return res.status(400).json({ message: 'Email, password, and role are required.' });
      }
  
      // Find the user by email
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Compare password
      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }
  
      // Optionally, check if the role matches
      if (role !== user.role) {
        return res.status(400).json({ message: 'Role mismatch' });
      }
  
      // Generate JWT token
      const token = jwt.sign(
        { userId: user.id, role: user.role },
        config.JWT_SECRET, // Secret key from config
        { expiresIn: '1h' } // Token expires in 1 hour
      );
  
      res.status(200).json({ message: 'Login successful', token });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server error, please try again later.' });
    }
  };
  
