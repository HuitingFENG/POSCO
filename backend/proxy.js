const express = require('express');
const fetch = require('node-fetch');

const app = express();
const port = 3001; // You can choose a different port

app.use(express.json());

// Define a route to proxy the API request
app.get('/api/transport', async (req, res) => {
  try {
    const apiUrl = 'https://impactco2.fr/api/v1/transport?km=100&displayAll=1&transports=1%2C2%2C3%2C4%2C5%2C6%2C7&ignoreRadiativeForcing=0&numberOfPassenger=1&includeConstruction=0';
    const response = await fetch(apiUrl);
    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error('ImpactCP2 API Error fetching data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Proxy server is running on port ${port}`);
});
