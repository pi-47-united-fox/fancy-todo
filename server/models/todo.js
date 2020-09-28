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
  }, {
    hooks: {
      beforeCreate: (inst, opt) => {
        if (inst.status === "belum") {
          inst.status = false
        } else if (inst.status === "sudah") {
          inst.status = true
        }

      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};