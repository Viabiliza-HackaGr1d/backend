import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class Customer extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    );

    this.addHook('beforeSave', async (customer) => {
      if (customer.password) {
        customer.password_hash = await bcrypt.hash(customer.password, 8);
      }
    });

    return this;
  }

  static associate(models){
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default Customer;
