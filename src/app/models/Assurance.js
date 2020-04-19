import Sequelize, { Model } from 'sequelize';

class Assurance extends Model {
  static init(connection) {
    super.init(
      {
        desc: Sequelize.STRING,
        clauses: Sequelize.STRING,
        company_name: Sequelize.STRING,
        company_cnpj: Sequelize.STRING,
        //0 = Pending customer approvation | 1 = Accepted | 2 = Rejected
        //                                 | 3 = Pending cancellation  | 4 = Cancelled
        status: Sequelize.INTEGER,
        cancelled_by: Sequelize.INTEGER,
        broker_id: Sequelize.INTEGER,
        customer_id: Sequelize.INTEGER,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Customer, {
      foreignKey: 'customer_id',
      as: 'customer',
    });
    this.belongsTo(models.Broker, { foreignKey: 'broker_id', as: 'broker' });
    this.belongsTo(models.Category, {
      foreignKey: 'category_id',
      as: 'category',
    });
  }
}

export default Assurance;
