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

    // const userExist = await Deliveryman.findOne({ where: { email: req.body.email } });

    // if (userExist) {
    //   return res.status(400).json({ error: 'email ja cadastrado' });
    // }

    const { name, email } =await Deliveryman.create(req.body);

    return res.json({
      name,
      email,
    });
  }
}

export default new DeliverymanController();
