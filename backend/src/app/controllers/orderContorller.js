import Order from '../models/order';
import * as Yup from 'yup';
class OrderController {
  async store(req, res) {
    const schema = Yup.object().shape(
      {
        recipient_id: Yup.number().integer().required(),
        deliveryman_id: Yup.number().integer().required(),
        signature_id: Yup.number().integer(),
        product_name: Yup.string().required(),
      }
    );

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: " Invalid data "});
    }
    let { recipient_id: req_recip_id , deliveryman_id: req_deliveryman_id , product_name:name } = req.body;
    const orderExist = await Order.findOne({
      where: {
        recipient_id: req_recip_id,
        deliveryman_id: req_deliveryman_id,
        product_name: name,
      }
    })

    if(orderExist){
      return res.status(401).json({ error: " Order already in progress" });
    }

    const order = await Order.create(req.body);
    return res.json(order);
  }

  async update(req, res){
    const schema = Yup.object().shape(
      {
        recipient_id: Yup.number().integer().required(),
        deliveryman_id: Yup.number().integer().required(),
        signature_id: Yup.number().integer(),
        product_name: Yup.string().required(),
      }
    );

    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: " Invalid data "});
    }
  }

  async delete(req, res){

  }

  async index(req, res){

  }
}

export default new OrderController();
