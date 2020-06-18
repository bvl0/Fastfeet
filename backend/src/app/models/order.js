import Sequelize, { Model } from 'sequelize';


class Order extends Model {
  static init(sequelize) {
    super.init(
      {
        recipient_id: Sequelize.INTEGER,
        deliveryman_id: Sequelize.INTEGER,
        signature_id: Sequelize.INTEGER,
        product_name: Sequelize.STRING,
        signature_id: Sequelize.INTEGER
      },
      {
        sequelize
      }
    );
    return this;
  }
}

export default Order;
