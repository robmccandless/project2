"use strict";

require("dotenv").config();

var fs = require("fs");
var path = require("path");
var Sequelize = require("sequelize");
var basename = path.basename(module.filename);
var env = process.env.NODE_ENV || "development";
var connection = require(__dirname + "/../config/config.js")[env];
var db = {};

if (connection.use_env_variable) {
    var sequelize = new Sequelize(process.env[connection.use_env_variable]);
} else {
    var sequelize = new Sequelize('recipes_app_db', 'root', 'password', {
        host: 'localhost',
        dialect: 'mysql' /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */
    });
}


fs.readdirSync(__dirname)
    .filter(function(file) {
        return (
            file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
        );
    })
    .forEach(function(file) {
        var model = sequelize.import(path.join(__dirname, file));
        db[model.name] = model;
    });

Object.keys(db).forEach(function(modelName) {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;