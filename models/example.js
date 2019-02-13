// var bcrypt = require("bcryptjs");

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
    // {
    //   hooks: {
    //     beforeCreate: async function (authTable) {
    //       var salt = await bcrypt.genSaltSync();
    //       authTable.password = bcrypt.hashSync(authTable.password, salt);
    //     }
    //   }
  // );

  // authTable.prototype.validPassword = async function (password) {
  //   return await bcrypt.compare(password, this.password);
  // }

  return authTable;
};




