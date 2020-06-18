import Deliveryman from '../models/deliveryman';
import * as Yup from 'yup';

class DeliverymanController {
  async store(req, res) {
    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
        email: Yup.string().required().email(),
      }
    )

    if(!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'validation fails '});
    }

    const userExist = await Deliveryman.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'email ja cadastrado' });
    }

    const { name, email } =await Deliveryman.create(req.body);

    return res.json({
      name,
      email,
    });
  }

  async update(req, res) {
    const user = await Deliveryman.findByPk(req.params.id);
    await user.update(req.body);

    return res.json(user);
  }

  async delete(req, res) {
    const user = await Deliveryman.findByPk(req.params.id);
    await user.destroy(user);

    return res.json("User has been deleted");
  }

  async index(req, res) {
    const userList = await Deliveryman.findAll();

    return res.json(userList);
   }
 }

export default new DeliverymanController();
