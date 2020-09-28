'use strict';
const {
  Model
} = require('sequelize');

const { getHash } = require('../helpers/bcrypt')

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
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `please fill username`
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: `fill with correct email format`
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `fill with password`
        },
        len: {
          args: [6, 20],
          msg: 'password length must 6 - 20 character'
        }
      }
    },
  }, {
    hooks: {
      beforeCreate(instance, opt) {
        instance.password = getHash(instance.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};