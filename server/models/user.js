'use strict'
const {
  Model
} = require('sequelize')
const BcriptJs = require('../helper/bcryptjs')
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
      validate: {
        notEmpty: {
          msg: 'Must enter valid email'
        },
        isEmail: {
          msg: 'Must enter valid email'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: { // jika digunakan
        notEmpty: {
          msg: 'Must enter password'
        }
        // isAlphanumeric: {
        //   msg: 'Password must contain alfabet and number'
        // }
      }
    },
    bg_img: DataTypes.STRING,
    location: DataTypes.STRING
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.password = BcriptJs.makeHash(instance.password)
        instance.location = 'Jakarta'
        instance.bg_img   = 'no_image'
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};