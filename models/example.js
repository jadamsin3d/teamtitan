module.exports = function(sequelize, DataTypes) {
  var Tourney = sequelize.define("Tourney", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1]
      }
    },
    player_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: 4,
        isInt: true
      }
    },
    join_time: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: true
      }
    },
    winner: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    canceled: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    }
  });

  return Tourney;
};
