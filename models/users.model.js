module.exports = function(sequelize, DataTypes) {
    var User = sequelize.define("User", {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,
            autoIncrement: true
        },
        name: { type: DataTypes.STRING(50), allowNull: true },
        email_address: { type: DataTypes.STRING(100), allowNull: true },
        auth: { type: DataTypes.STRING(50), allowNull: true }
    });
    return User;
};