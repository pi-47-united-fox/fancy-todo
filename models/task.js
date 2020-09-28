'use strict';
const {
  Model
} = require('sequelize');
const { Sequelize } = require('.');
module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Task.belongsTo(models.User, {
        model: "User",
        targetKey: "id",
      })
    }
  };
  Task.init({
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    due_date: DataTypes.DATE,
    UserId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};