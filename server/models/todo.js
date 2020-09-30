'use strict';
const {
  Model
} = require('sequelize');
const dateToEpoch = require('../helpers/dateConverter');
module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */ 

    static associate(models) {
      // define association here
    }
  };
  Todo.init({
    title:{
      type: DataTypes.STRING
    },
    description:{
      type: DataTypes.STRING
    },
    status:{
      type: DataTypes.STRING
    },
    due_date:{
      type: DataTypes.STRING,
      validate:{
        // isAfter: new Date()
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    activityType:{
      type: DataTypes.STRING,
      allowNull:false,
      isEmpty:{

      }
    },
  }, {
    hooks:{
      afterFind(todo, options){ 
        if(typeof todo == Array){
          todo.forEach(ele=>{
            ele.epoch = dateToEpoch(ele.due_date)
          })
        }else{
          todo.epoch = dateToEpoch(todo.due_date)
        }
      },
      beforeCreate(todo, options){
        todo.due_date = new Date(todo.due_date)
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};