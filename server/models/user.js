'use strict';
const {
  Model
} = require('sequelize');

const Helper = require('../helper/helper')

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
      unique: true,
      validate:{
        isEmail:{
          args: true,
          msg: 'Must be email Format'
        },
        notEmpty:{
          msg: "Email cannot empty"
        },
      }
    },
    password:{
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg:"Password cannot empty"
        },
        len:{
          args: [6],
          msg: "Please use at least 6 characters"
        }
      }
    }   
  }, {
    hooks:{
      beforeCreate(instance){
        instance.password = Helper.hashPassword(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};