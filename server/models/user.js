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
        isEmail: {
          msg: 'Must enter valid email'
        }
      }
    },
    pw: {
      type: DataTypes.STRING
      // validate: { // jika digunakan
      //   isAlphanumeric: {
      //     msg: 'Password must contain alfabet and number'
      //   }
      // }
    }
  }, {
    hooks: {
      beforeCreate: (instance) => {
        instance.pw = BcriptJs.makeHash(instance.pw)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};