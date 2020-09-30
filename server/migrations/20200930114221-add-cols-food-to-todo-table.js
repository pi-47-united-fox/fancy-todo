'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('Todos', 'food', { type: Sequelize.STRING, })
      .then(() => {
        return queryInterface.addColumn('Todos', 'location', { type: Sequelize.STRING, })
      })
      .then(() => {
        return queryInterface.addColumn('Todos', 'link', { type: Sequelize.STRING, })
      })
  },

  down: (queryInterface, Sequelize) => {
    return Promise.all([
      queryInterface.removeColumn('Todos', 'food'),
      queryInterface.removeColumn('Todos', 'location'),
      queryInterface.removeColumn('Todos', 'link')

    ])
  }
};

