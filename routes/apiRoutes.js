var db = require("../models");

module.exports = function (app) {
  // Get all chefs
  app.get("/api/chefs", function (req, res) {
    db.Chef.findAll({}).then(function (dbChef) {
      res.json(dbChef);
    });
  });

  // Create a new chef
  app.post("/api/chefs", function (req, res) {
    db.chef.create(req.body).then(function (dbChef) {
      res.json(dbChef);
    });
  });

  // Delete an chef by id
  app.delete("/api/chefs/:id", function (req, res) {
    db.chef.destroy({ where: { id: req.params.id } }).then(function (dbChef) {
      res.json(dbChef);
    });
  });
};
