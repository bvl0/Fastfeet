import Order from '../models/order';
import Deliveryman from '../models/deliveryman';
import Recipient from '../models/order';
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

    const recipeExist = await Recipient.findByPk(req_recip_id);
    const deliverymanExist = await Deliveryman.findByPk(req_deliveryman_id);

    if(orderExist){
      return res.status(401).json({ error: " Order already in progress" });
    }
    if(!(recipeExist)){
      return res.status(401).json({ error: "This recipe dont exist" });
    }
    if(!(deliverymanExist)){
      return res.status(401).json({ error: "This deliveryman dont exist" });
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
    let { recipient_id: req_recip_id , deliveryman_id: req_deliveryman_id , product_name:name } = req.body;
    const orderExist = await Order.findOne({
      where: {
        recipient_id: req_recip_id,
        deliveryman_id: req_deliveryman_id,
        product_name: name,
      }
    })

    const recipeExist = await Recipient.findByPk(req_recip_id);
    const deliverymanExist = await Deliveryman.findByPk(req_deliveryman_id);

    if(!(orderExist)){
      return res.status(404).json({ error: "Order doesn't exists" });
    }
    if(!(recipeExist)){
      return res.status(401).json({ error: "This recipe dont exist" });
    }
    if(!(deliverymanExist)){
      return res.status(401).json({ error: "This deliveryman dont exist" });
    }

    await orderExist.update(req.body);
    return res.json("updated");
  }

  async delete(req, res){
    const order = await Order.findByPk(req.params.id);
    if(!(order)){
      return res.status(404).json({ error: "Order doesn't exists"})
    }
    if(order.canceled_at !== null){
      return res.status(400).json({ error: "order is already cancelled" });
    }
    const date = new Date();
    await order.update({ canceled_at: date});
    return res.json(order);
  }

  async index(req, res){
    const id = req.params.id;
    const index = await Order.findAll({
      where: {
        deliveryman_id: id,
        canceled_at: null,
      }
    });

    return res.json(index);
  }
}

export default new OrderController();
