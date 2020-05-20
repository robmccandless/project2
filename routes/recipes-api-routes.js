// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the recipes
    app.get("/api/recipes", function(req, res) {
        var query = {};
        if (req.query.chef_id) {
            query.ChefId = req.query.chef_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.chef
        db.Recipes.findAll({
            where: query,
            include: [db.Chef]
        }).then(function(dbRecipes) {
            res.json(dbRecipes);
        });
    });

    // Get route for retrieving a single recipe
    app.get("/api/recipes/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Chef
        db.Recipes.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Chef]
        }).then(function(dbRecipes) {
            res.json(dbRecipes);
        });
    });

    // Recipe route for saving a new Recipe
    app.post("/api/recipes", function(req, res) {
        db.Recipes.create(req.body).then(function(dbRecipes) {
            res.json(dbRecipes);
        });
    });

    // DELETE route for deleting Recipes
    app.delete("/api/recipes/:id", function(req, res) {
        db.Recipes.destroy({
            where: {
                id: req.params.id
            }
        }).then(function(dbRecipes) {
            res.json(dbRecipes);
        });
    });

    // PUT route for updating recipes
    app.put("/api/recipes", function(req, res) {
        db.Recipes.update(
            req.body, {
                where: {
                    id: req.body.id
                }
            }).then(function(dbRecipe) {
            res.json(dbRecipe);
        });
    });

    app.get("/search/recipes", function(req, res) {
        db.Recipes.findAll({
            where: {
                title: req.body.title
            }
        }).then(function(dbRecipes) {
            res.json(dbRecipes);
        });
    })
};