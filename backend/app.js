const express = require('express');
const app = express();
const db = require('./config/db');
const sequelize = require('./config/sequelize');
const cors = require('cors');
const Question = require('./models/question'); 
const questionRoutes = require('./routes/questionRoutes'); 
const responseRoutes = require('./routes/responseRoutes');


app.use(cors());
app.use(express.json());

/* // Connect to the database
db.connect(error => {
  if (error) {
    console.error('Database connection failed:', error);
  } else {
    console.log('Successfully connected to the database.');
    // Start your Express server or define routes here
  }
}); */

sequelize.sync({ force: false }).then(() => {
  console.log('Database synchronized');
  // You can also define more initialization logic here if needed
});

app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes); 

module.exports = app;

