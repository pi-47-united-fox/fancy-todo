'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Todos", "img_url", {
			type: Sequelize.STRING,
    });
    await queryInterface.addColumn("Todos", "score", {
			type: Sequelize.REAL,
		});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Todos", "img_url");
    await queryInterface.removeColumn("Todos", "score");
  }
};
