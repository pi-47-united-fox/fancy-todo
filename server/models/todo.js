"use strict";
const { Model } = require("sequelize");
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
	}
	Todo.init(
		{
			title: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Title cannot be empty",
					},
					notNull: {
						msg: "Title Date cannot be empty",
					},
				},
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "Description cannot be empty",
					},
					notNull: {
						msg: "Description cannot be empty",
					},
				},
			},
			status: {
				type: DataTypes.BOOLEAN,
				validate: {
					isBoolean(value) {
						if (typeof value !== "boolean") {
							throw new Error("Status must be boolean");
						}
					},
				},
			},
			due_date: {
				type: DataTypes.DATEONLY,
				validate: {
					isDate: {
						args: true,
						msg: "Due Date format is invalid",
					},
					isAfter: {
						args: new Date().toLocaleDateString(),
						msg: "Due Date must be atleast tommorow",
					},
				},
			},
		},
		{
			sequelize,
			modelName: "Todo",
		},
	);
	return Todo;
};
