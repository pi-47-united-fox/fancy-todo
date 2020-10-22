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
      type: DataTypes.STRING,
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
    link: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Cannot find Link by the Artist, Please Change the Artist!"
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Cannot find Image by the Artist, Please Change the Artist!"
        }
      }
    },
    song: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Cannot find Song by the Artist, Please Change the Artist!"
        }
      }
    },
    artist: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          msg: "Please fill the Artist!"
        }
      }
    },
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(Todo) {
        Todo.status = "Incomplete"
      }
    },
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};