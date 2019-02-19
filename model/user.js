var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {  
  var authTable = sequelize.define("authTable", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 30]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [6, 20]
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
        len: [1]
      }
    }
  });

  authTable.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  authTable.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return authTable;
};

