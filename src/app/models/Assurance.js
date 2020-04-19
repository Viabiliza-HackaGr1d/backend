import Sequelize, { Model } from 'sequelize';

class Assurance extends Model {
  static init(connection) {
    super.init(
      {
        desc: Sequelize.STRING,
        clauses: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }

  static associate(models){
    this.belongsTo(models.Customer, { foreignKey: 'customer_id', as: 'customer' });
    this.belongsTo(models.Broker, { foreignKey: 'broker_id', as: 'broker' });
    this.belongsTo(models.Customer, { foreignKey: 'category_id', as: 'category' });
  }

}

export default Assurance;
