"use strict";
const { Model } = require("sequelize");
const { encryptPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			email: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					isEmail: {
						msg: "Email Format is not Valid",
					},
					notEmpty: {
						msg: "Email is Required",
					},
					notNull: {
						msg: "Email is Required",
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
				validate: {
					notEmpty: {
						msg: "Password is Required",
					},
					notNull: {
						msg: "Password is Required",
					},
					len: {
						args: [6, 255],
						msg: "Minimum Password length is 6 character",
					},
				},
			},
			first_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "First Name is Required",
					},
					notNull: {
						msg: "First Name is Required",
					},
				},
			},
			last_name: {
				type: DataTypes.STRING,
				allowNull: false,
				validate: {
					notEmpty: {
						msg: "First Name is Required",
					},
					notNull: {
						msg: "First Name is Required",
					},
				},
			},
		},
		{
			hooks: {
				beforeCreate: (user) => {
					user.password = encryptPassword(user.password);
				},
			},
			sequelize,
			modelName: "User",
		},
	);
	return User;
};
