'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require("bcryptjs")
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
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: {
          msg: "mush be email format"
        },
        notEmpty: {
          msg: "can't empty"
        }
      },

    },
    password: {
      type: DataTypes.STRING,
      validate: {
        isEven(value) {
          if (value < 6) {
            throw new Error('password mush be 6 character');
          }
        },
        notEmpty: {
          msg: "can't empty"
        },
      }
    }
  }, {
    hooks: {
      beforeCreate: (instace, opt) => {
        if (instace.password < 6) {
          throw new Error("password mush be 6 character")
        } else {
          let salt = bcrypt.genSaltSync(10);
          let hash = bcrypt.hashSync(instace.password, salt);
          instace.password = hash

        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};