'use strict';
const {
  Model
} = require('sequelize');

const { encryptPassword} = require("../helpers/bcrypt")
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    fullname: DataTypes.STRING,
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Email Format is not Valid",
        },
        notEmpty: {
          msg: "Email is Required",
        },
        unique: {
            args: true,
            msg: 'Email address already in use!'
        }
      },
    },
    password:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Password cannot be empty"
        },
        len:{
          args: [6, 255],
          msg: "Please input 6 or more character", 
        }
      }
    }
  }, {
    hooks: {
      beforeCreate(user){
        user.password = encryptPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};