/* const express = require('express');
const app = express(); */
const app = require('./app'); 
const port = process.env.PORT || 3001;

/* require('./app'); */

/* app.get('/', (req, res) => {
  res.send('Hello World!');
});
 */

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

