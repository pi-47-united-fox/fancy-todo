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
      User.hasMany(models.Todo, { foreignKey: "UserId" })
    }
  };
  User.init({
    name: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "name can't be empty"
        }
      }
    },
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
        notEmpty: {
          msg: "can't empty"
        },
        len: {
          args: [6],
          msg: "password must be min 6 character"
        }
      }
    }
  }, {
    hooks: {
      beforeCreate: (instace, opt) => {
        let salt = bcrypt.genSaltSync(10);
        let hash = bcrypt.hashSync(instace.password, salt);
        instace.password = hash
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};