'use strict';
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
    }
  };
  User.init({
    email:{
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          args: true,
          msg: "Email must be in email format."
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          len: [6],
          msg: "Password must have at least 6 characters"
        }
      }
    }
  }, {
    hooks: {
    beforeCreate(user) {
      user.password = hashPassword(user.password)
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};