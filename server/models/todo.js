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
      Todo.belongsTo(models.User, { foreignKey: "UserId" })
    }
  };
  Todo.init({
    title: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `can't be empty`
        }
      }
    },
    description: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: `can't be empty`
        }
      }
    },
    status: {
      type: DataTypes.BOOLEAN,
      validate: {
        notEmpty: {
          msg: `can't be empty`
        }
      }
    },
    due_date: {
      type: DataTypes.DATE,
      validate: {
        isAfter: {
          args: new Date().toString(),
          msg: "due date mush update from now "
        }
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      validate: {
        notEmpty: {
          msg: `can't be empty`
        }
      }
    },
  }, {
    hooks: {
      beforeUpdate: (todo, opt) => {
        if (todo.status === "undone") {
          todo.status = false
        } else if (todo.status === "done") {
          todo.status = true
        }
      },
      beforeCreate: (instance, opt) => {
        if (instance.status === "undone") {
          instance.status = false
        } else if (instance.status === "done") {
          instance.status = true
        }
      },

    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};