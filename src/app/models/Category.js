import Sequelize, { Model } from 'sequelize';

class Category extends Model {
  static init(connection) {
    super.init(
      {
        name: Sequelize.STRING,
      },
      {
        sequelize: connection,
      }
    );

    return this;
  }

}

export default Category;
