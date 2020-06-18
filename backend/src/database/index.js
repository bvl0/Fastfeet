import Sequelize from 'sequelize';

import User from '../app/models/user';
import Recipient from '../app/models/recipent';
import Deliveryman from '../app/models/deliveryman';
import File from '../app/models/file';
import Order from '../app/models/order';



import databaseConfig from '../config/database'

const models = [User, Recipient, Deliveryman, File, Order];
class Database{
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
