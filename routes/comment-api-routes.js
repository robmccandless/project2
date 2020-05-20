// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

    // GET route for getting all of the comments
    app.get("/api/comments", function(req, res) {
        var query = {};
        if (req.query.recipe_id) {
            query.RecipeId = req.query.recipe_id;
        }
        // Here we add an "include" property to our options in our findAll query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.recipe
        db.Comments.findAll({
            where: query,
            include: [db.Recipe]
        }).then(function(dbComments) {
            res.json(dbComments);
        });
    });

    // Get route for retrieving a single recipe
    app.get("/api/comments/:id", function(req, res) {
        // Here we add an "include" property to our options in our findOne query
        // We set the value to an array of the models we want to include in a left outer join
        // In this case, just db.Recipe
        db.Comments.findOne({
            where: {
                id: req.params.id
            },
            include: [db.Recipe]
        }).then(function(dbComments) {
            res.json(dbComments);
        });
    });

    // Comment route for saving a new Comment
    app.post("/api/comments", function(req, res) {
        db.Comments.create(req.body).then(function(dbComments) {
            res.json(dbComments);
        });
    });

};