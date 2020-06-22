import Order from '../models/order';
import * as Yup from 'yup';
import { Op } from 'sequelize';
import { startOfHour, parseISO, isBefore, isAfter, format, setHours, setMinutes, setSeconds } from 'date-fns';

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

    const topLimit = setSeconds(setMinutes(setHours(new Date(), 8), 0), 0);
    const botLimit = setSeconds(setMinutes(setHours(new Date(), 18), 0), 0);

    if(isBefore(new Date(), topLimit) || isAfter(new Date(), botLimit)){
      return res.status(401).json({ error: 'The package can only be taken between 9am and 6pm' });
    }



    await order.update(req.body);
    return res.json(order);
  }
}

export default new WithdrawnController();
