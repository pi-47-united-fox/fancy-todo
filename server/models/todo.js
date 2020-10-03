'use strict';
const todayDate = require('../helpers/date.js')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Todo.belongsTo(models.User)
    }
  };
  Todo.init({
    title: { 
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Please fill in the title."
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Please fill in the description."
        }
      }
    },
    status: {
      type: DataTypes.STRING,
      validate:{
        notEmpty:{
          msg: "Please fill in the status."
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate:{
        isAfter: todayDate()
      }
    },
    UserId: {
      type: DataTypes.INTEGER
    },
    track: {
      type: DataTypes.TEXT
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};