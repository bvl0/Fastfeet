import Sequelize, { Model } from 'sequelize';


class Recipient extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        street: Sequelize.STRING,
        house: Sequelize.INTEGER,
        complement: Sequelize.STRING,
        state: Sequelize.STRING,
        city: Sequelize.STRING,
        cep: Sequelize.INTEGER,
      },
      {
        sequelize
      }
    );
  }
}

export default Recipient;
