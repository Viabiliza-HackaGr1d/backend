'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.addColumn('assurances', 'company_name', {
        type: Sequelize.STRING,
        allowNull: false
      });

      await queryInterface.addColumn('assurances', 'company_cnpj', {
        type: Sequelize.STRING,
        allowNull: false
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

      await queryInterface.removeColumn('assurances', 'company_name');
      await queryInterface.removeColumn('assurances', 'company_cnpj');

      await transaction.commit();
      return Promise.resolve();
    } catch (error) {
      if (transaction) await transaction.rollback();

      return Promise.reject(err);
    }
  }
};
