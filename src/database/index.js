import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import Customer from '../app/models/Customer';
import Broker from '../app/models/Broker';

import databaseConfig from '../config/database';

const models = [Customer, Broker];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map((model) => model.init(this.connection))
      .map(
        (model) => model.associate && model.associate(this.connection.models)
      );
  }

  mongo() {
    this.mongoConnection = mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
}

export default new Database();
