const express = require('express');
const cors = require('cors');
const chefsData = require('./data/chef_data.json');
const recipesData = require('./data/recipes_data.json');
const qAndA = require('./data/q&a_data.json');

const app = express();
const port = 3000;

app.use(cors());

app.get('/', (req, res) => {
  res.send('Hello World!')
})


//send all chef data
app.get('/simply-recipes/chefs', (req, res) => {
    res.send(chefsData);
})


//building category data from all recipe and sending it
app.get('/simply-recipes/categories', (req, res) => {
    const categories = [];
    const catData = [];
    recipesData.forEach(recipe => {
        const recipeCat = recipe.category;
        if(categories.indexOf(recipeCat) === -1){
            categories.push(recipeCat);
            catData.push({
                category: recipe.category,
                image: recipe.image
            });
        }
    });
    res.send(catData);
})


//send all recipes for a specific category
app.get('/simply-recipes/categories/:catName', (req, res) => {
    const catName = req.params.catName;
    const categoryItems = recipesData.filter(recipe => recipe.category === catName) || [];
    res.send(categoryItems);
})


//send specific recipe data
app.get('/simply-recipes/chef/:chefId', (req, res) => {
    const id = req.params.chefId;
    const chef = chefsData.find(chef => chef._id === id);
    const chefRecipes = recipesData.filter(recipe => recipe.chef_id === id) || [];
    res.send({chef, chefRecipes});
})


//send today's pick
app.get('/simply-recipes/todays-pick', (req, res) => {
    res.send(recipesData.slice(0 ,1));
})


//send all q&a data
app.get('/simply-recipes/q-and-a', (req, res) => {
    res.send(qAndA);
})



app.listen(port, () => {
  console.log(`simply recipes has been started on port ${port}`)
})