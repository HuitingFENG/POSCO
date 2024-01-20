/* const express = require('express');
const app = express(); */
// const express = require('express');


// const express = require('express');
// const app = express();
const app = require('./app'); 
const port = process.env.PORT || 3001;
const axios = require('axios'); 
const cors = require('cors'); 
app.use(cors());


// const proxy = require('./proxy'); // Update the path if needed
// app.use('/api/proxy', proxy);


// Middleware to enable CORS (Cross-Origin Resource Sharing)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // Adjust this header as needed
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Route to fetch data from the external API and send it to the frontend
app.get('/api/fetch-data', async (req, res) => {
  try {
    const apiUrl = 'https://impactco2.fr/api/v1/transport?km=100&displayAll=1&transports=1%2C2%2C3%2C4%2C5%2C6%2C7&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=0';
    const response = await axios.get(apiUrl);
    const data = response.data;
    res.json(data); // Send the data to the frontend as JSON
  } catch (error) {
    console.error('Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



/* require('./app'); */

/* app.get('/', (req, res) => {
  res.send('Hello World!');
});
 */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

