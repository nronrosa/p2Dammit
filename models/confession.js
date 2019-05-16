// creates the confession post table
module.exports = function(sequelize, DataTypes) {
    var Confession = sequelize.define("Confession", {
      body: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      isItTrue: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: true
      }
    });
    // Confession must belong to a User
    // a confession must have User to be created
    Confession.associate = function(models) {
      Confession.belongsTo(models.User, {
        foreignKey: {
          allowNull: false
        }
      });
    };
    return Confession;
  };
  