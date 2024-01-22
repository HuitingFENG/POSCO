const express = require('express');

const db = require('./config/db');
const sequelize = require('./config/sequelize');
const cors = require('cors');

const { associateModels } = require("./models/associateModels"); 
const app = express();
associateModels();

const questionRoutes = require('./routes/questionRoutes'); 
const responseRoutes = require('./routes/responseRoutes');
const emissionRoutes = require('./routes/emissionRoutes');
const referenceRoutes = require('./routes/referenceRoutes');
const userRoutes = require('./routes/userRoutes');
const conseilRoutes = require('./routes/conseilRoutes');
const maxRoutes = require('./routes/maxRoutes');
const compensationRoutes = require('./routes/compensationRoutes');
const optionRoutes = require('./routes/optionRoutes');


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
});



app.use('/api/questions', questionRoutes);
app.use('/api/responses', responseRoutes); 
app.use('/api/emissions', emissionRoutes); 
app.use('/api/references', referenceRoutes); 
app.use('/api/users', userRoutes); 
app.use('/api/conseils', conseilRoutes); 
app.use('/api/maxs', maxRoutes); 
app.use('/api/compensations', compensationRoutes); 
app.use('/api/options', optionRoutes); 


module.exports = app;

