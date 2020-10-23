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
      Todo.belongsTo(models.User,{
        targetKey:'id',
        foreignKey:'UserId'
      })
    }
  };
  Todo.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type:DataTypes.DATE,
      validate : {
        isAfter : {
          args : new Date().toLocaleDateString(),
          message : 'invalid date please select date today or after today'
        }
      }
    },
    UserId: DataTypes.INTEGER,
    imageurl: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};