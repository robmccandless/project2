module.exports = function (sequelize, DataTypes) {
    var recipes = sequelize.define("recipes", {
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

    recipes.associate = function (models) {
        // We're saying that a recipes should belong to an Author
        // A recipes can't be created without an Author due to the foreign key constraint
        recipes.belongsTo(models.chef, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return recipes;
};
