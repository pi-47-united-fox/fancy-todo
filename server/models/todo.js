'use strict';
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
    title:{
     type: DataTypes.STRING,
     validate:{
        notEmpty:{
          msg:"Title cannot empty"
        }
     }
    }, 
    description: {
     type: DataTypes.STRING,
     validate:{
      notEmpty:{
        msg:"Description cannot empty"
        }
      }
    },
    status: {
     type: DataTypes.STRING,
     validate:{
      notEmpty:{
        msg:"Status cannot empty"
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: "Date must be now or future."
        },
        notEmpty:{
          msg:"Date cannot empty"
        }
      }
    },
    UserId: {
     type: DataTypes.INTEGER,
      validate:{
        notEmpty:{
          msg: "UserId cannot empty"
        }
      }
    }
  }, {
    hooks:{
      beforeCreate(instance, options){
        instance.status = "On Progress"
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};