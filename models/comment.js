module.exports = function(sequelize, DataTypes) {
    var Comments = sequelize.define("Comments", {
        body: {
            type: DataTypes.TEXT,
            allowNull: false,
            len: [1]
        }
    });

    Comments.associate = function(models) {
        // We're saying that a Recipes should belong to an Author
        // A Recipes can't be created without an Author due to the foreign key constraint
        Comments.belongsTo(models.Recipes, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Comments;
};