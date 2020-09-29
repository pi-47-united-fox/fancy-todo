'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {

    return queryInterface.addConstraint('Todos', {
      fields: ['UserId'],
      type: 'foreign key',
      name: 'custom_fkey_constraint_userid',
      references: {
        //Required field
        table: 'Users',
        field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'cascade'
    })
  },

  down: (queryInterface, Sequelize) => {

    return queryInterface.removeConstraint('Todos', 'UserId', {})
  }
};
