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
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    status: DataTypes.STRING,
    due_date: {
      type: DataTypes.DATE,
      validate: {
        // isAfter: {
        //   args: new Date().setDate(d.getDate() - 1) + '',
        //   msg: 'Date must be greater than today'
        // }
        isTodayOrAfter (value) {
          // get yesterday date
          let yesterday = new Date();
          yesterday.setDate(yesterday.getDate() - 1)
          
          if (value <= yesterday) {
            throw new Error('Date must be greater than today')
          }
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Todo',
  });
  return Todo;
};