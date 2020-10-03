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
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `title can be empty!`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `description can be empty!`
        }
      }
    },
    status: DataTypes.BOOLEAN,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toLocaleString(),
          msg: `validate error`
        }
      }
    },
    UserId: DataTypes.STRING,
    food: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `food can be empty!`
        }
      }
    },
    location: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `loacation can be empty!`
        }
      }
    },
    link: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `Price can be empty!`
        }
      }
    },
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo; s
};