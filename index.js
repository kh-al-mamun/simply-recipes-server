const express = require('express');
const chef_data = require('./chef_data.json');
const recipes_data = require('./recipes_data.json');
const app = express();
const port = 5000;



app.get('/chef_data', (req, res) => {
    res.send(chef_data);
  })
app.get('/recipes_data', (req, res) => {
    res.send(recipes_data);
  })

  app.listen(port, () => {
    console.log(`assignment10 server is running on port: ${port}`)
  })