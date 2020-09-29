'use strict';
const { hashPassword } = require('../helpers/bcrypt.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo)
    }
  };
  User.init({
    email: {
      type: DataTypes.STRING,
      validate:{
        isEmail:{
          msg:"Please insert an email!"
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:{
          msg: "Please use at least 6 characters!",
          args: [6]
        }
      }
    }
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((instanceUser, options) => {
    instanceUser.password = hashPassword(instanceUser.password)
  })
  return User;
};