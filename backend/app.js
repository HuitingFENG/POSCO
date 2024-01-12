const express = require('express');
const app = express();
const db = require('./config/db');


// Connect to the database
db.connect(error => {
  if (error) {
    console.error('Database connection failed:', error);
  } else {
    console.log('Successfully connected to the database.');
    // Start your Express server or define routes here
  }
});

