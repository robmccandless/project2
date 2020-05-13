module.exports = function(sequelize, DataTypes) {
    var Recipes = sequelize.define("Recipes", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1]
            }
        },
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Recipes.associate = function(models) {
        // We're saying that a Recipes should belong to an Author
        // A Recipes can't be created without an Author due to the foreign key constraint
        Recipes.belongsTo(models.Chef, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Recipes;
};