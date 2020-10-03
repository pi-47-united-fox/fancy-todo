'use strict';
const {
  Model
} = require('sequelize');

const { hashPassword } = require('../helpers/bcrypt')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Todo,{
        sourceKey:'id',
        foreignKey:'UserId'
      })
    }
  };
  User.init({
    email: {
     type: DataTypes.STRING,
     validate:{
       isEmail:{
         args:true,
         msg:'Email format needed'
       }
     }
    },
    password: {
      type: DataTypes.STRING,
      validate:{
        len:[3,12]
      }
    }
  }, {
    hooks:{
      beforeCreate(user){
        user.password = hashPassword(user.password)
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};