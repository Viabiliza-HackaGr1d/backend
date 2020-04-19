'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('customers', 'avatar_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        }
      });

      await queryInterface.addColumn('brokers', 'avatar_id', {
        type: Sequelize.INTEGER,
        references: {
          model: 'files',
          key: 'id',
          onUpdate: 'CASCADE',
          onDelete: 'SET NULL',
          allowNull: true
        }
      });

      await transaction.commit();

      return Promise.resolve();
    } catch (err) {
      if (transaction) await transaction.rollback();
      return Promise.reject(err);
    }
  },

  down: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {

      await queryInterface.removeColumn('customers', 'avatar_id');
      await queryInterface.removeColumn('brokers', 'avatar_id');

      await transaction.commit();
      return Promise.resolve();
    } catch (error) {
      if (transaction) await transaction.rollback();

      return Promise.reject(err);
    }
  }
};
