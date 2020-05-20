var path = require("path");

module.exports = function(app) {
    // Load index page
    app.get("/", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipes.html"));
    });

    // cms route loads cms.html
    app.get("/cms", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/cms.html"));
    });

    // recipes route loads recipes.html
    app.get("/recipes", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipes.html"));
    });

    app.get("/chef-manager", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/chef-manager.html"));
    });

    app.get("/comment", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/recipes.html"));
    });
};