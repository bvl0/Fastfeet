import Order from '../models/order';
import * as Yup from 'yup';
import { startOfHour, parseISO, isBefore, format, subHours } from 'date-fns';

class WithdrawnController {
  async update(req, res) {
    const schema = Yup.object().shape({
      start_date: Yup.date(),
      end_date: Yup.date(),
      signature_id: Yup.number().when('end_date', (end_date, field) =>
        end_date ? field.required() : field
      ),
    });
    if(!(await schema.isValid(req.body))){
      return res.status(400).json({ error: "Validation fails"});
    }

    const order = await Order.findByPk(req.params.id);

    if(!order){
      return res.status(400).json({ error: "order dosn't exist "})
    }

    await order.update(req.body);
    return res.json(order);
  }
}

export default new WithdrawnController();
