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
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          notEmpty:{
            msg:"Title cannot be empty"
          }
      }
    },
    description:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          notEmpty:{
            msg:"Description cannot be empty"
          },
      }
    },
    status:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          notEmpty:{
            msg:"status cannot be empty"
          }, 
      }
    },
    due_date:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
          notEmpty:{
            msg:"Due date cannot be empty"
          },
          checkDate(date){
            let duedate = new Date(date)
            let currentDate = new Date()
            console.log((new Date(duedate)).getDate() ,"<", currentDate.getDate() ,"\n", (new Date(duedate)).getMonth() ,"<", currentDate.getMonth() ,"\n ", (new Date(duedate)).getFullYear() ,"<", currentDate.getFullYear());

            if((new Date(duedate)).getDate() < currentDate.getDate() ||
              (new Date(duedate)).getMonth() < currentDate.getMonth() ||
              (new Date(duedate)).getFullYear() < currentDate.getFullYear()
            ){
              throw new Error("You can only add upcoming Activity")
            }
          } 
      }
    },
    UserId:{
      type: DataTypes.INTEGER,
      allowNull:false
    },
    activityType:{
      type: DataTypes.STRING,
      allowNull:false,
      validate:{
        notEmpty:{
          msg:"Activity cannot be empty"
        }
      }
    },
  }, {
    hooks:{
      afterFind(todo, options){ 
        // console.log(todo,"length<<<<<<<<<<<");
        if(todo.length){
          todo.forEach(ele=>{
            ele.epoch = dateToEpoch(ele.due_date)
            // console.log(ele);
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