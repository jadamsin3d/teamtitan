var bcrypt = require("bcryptjs");

module.exports = function (sequelize, DataTypes) {  
  var userTable = sequelize.define("userTable", {
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

  userTable.prototype.validPassword = function(password) {
    return bcrypt.compareSync(password, this.password);
  };
  
  userTable.hook("beforeCreate", function(user) {
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
  });

  return userTable;
};

