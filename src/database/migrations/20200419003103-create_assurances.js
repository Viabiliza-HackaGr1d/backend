'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.createTable('assurances', {
        id: {
          type: Sequelize.INTEGER,
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
        },
        customer_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'customers',
            key: 'id',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL'
          }
        },
        category_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'categories',
            key: 'id',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL'
          }
        },
        broker_id: {
          type: Sequelize.INTEGER,
          references: {
            model: 'brokers',
            key: 'id',
            onUpdate: 'SET NULL',
            onDelete: 'SET NULL'
          }
        },
        desc: {
          type: Sequelize.STRING,
          allowNull: true
        },
        clauses: {
          type: Sequelize.STRING,
          allowNull: false
        },
        created_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
        updated_at: {
          type: Sequelize.DATE,
          allowNull: false,
        },
      });
  },

  down: (queryInterface, Sequelize) => {
      return queryInterface.dropTable('assurances');
  }
};
