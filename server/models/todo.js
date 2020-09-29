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
      Todo.belongsTo(models.User, {
        targetKey: "id",
        foreignKey: "UserId"
      })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please fill the title!"
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please fill the description!"
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: "Please fill the status!"
        }
      }
    },
    due_date:  {
      type: DataTypes.DATEONLY,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: 'Please fill the Correct date'
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};