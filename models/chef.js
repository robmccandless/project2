module.exports = function(sequelize, DataTypes) {
    var Chef = sequelize.define("Chef", {
        // Giving the Chef model a name of type STRING
        name: DataTypes.STRING,
        email: DataTypes.STRING,

    });

    Chef.associate = function(models) {
        // Associating Chef with Chefs
        // When an Chef is deleted, also delete any associated Chefs
        Chef.hasMany(models.Recipes, {
            onDelete: "cascade"
        });
    };

    return Chef;
};