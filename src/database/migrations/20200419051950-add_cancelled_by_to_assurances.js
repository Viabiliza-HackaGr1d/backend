'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Couldn't find a way to reference this field to Customer nor Broker tables,
     * since they're separated entities
     */
      return queryInterface.addColumn('assurances', 'cancelled_by',{
        type: Sequelize.INTEGER,
        allowNull: true,
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.removeColumn('assurances', 'cancelled_by');
  }
};
