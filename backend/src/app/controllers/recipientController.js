import Recipient from '../models/recipent';

class RecipientController {
  async store(req, res){
    const recipient = await Recipient.create(req.body);

    return res.json( recipient );
  }
}

export default new RecipientController();
