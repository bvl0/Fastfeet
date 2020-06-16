import User from '../models/user';
import * as Yup from 'yup';

class userController {
  async store(req, res) {
    const schema = Yup.object().shape(
      {
        name: Yup.string().required(),
        email: Yup.string().required().email(),
        password: Yup.string().min(8).required(),
      }
    )

    if(!(await schema.isValid(req.body))) {
      res.status(400).json({ error: 'validation fails '});
    }

    const userExist = await User.findOne({ where: { email: req.body.email } });

    if (userExist) {
      return res.status(400).json({ error: 'email ja cadastrado' });
    }

    const { name, email, password } =await User.create(req.body);

    return res.json({
      name,
      email,
      password,
    });
  }
}

export default new userController();
