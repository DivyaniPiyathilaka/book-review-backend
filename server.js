const app = require('./src/app');
const express = require('express');
const path = require('path');
const PORT = 5000;

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Serve static files
app.use('/public', express.static(path.join(__dirname, 'public')));

