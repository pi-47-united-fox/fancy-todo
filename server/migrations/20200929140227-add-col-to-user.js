"use strict";

module.exports = {
	up: async (queryInterface, Sequelize) => {
		await queryInterface.addColumn("Users", "profile_pic", {
			type: Sequelize.STRING,
		});
		await queryInterface.addColumn("Users", "gender", {
			type: Sequelize.STRING,
		});
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.removeColumn("Users", "profile_pic");
		await queryInterface.removeColumn("Users", "gender");
	},
};
