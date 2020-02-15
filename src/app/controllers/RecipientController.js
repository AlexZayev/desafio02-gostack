import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    // uso para o fututo
    // const user = await User.findByPk(req.userId);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street: Yup.string().required(),
      number: Yup.number(),
      complement: Yup.string(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Create Validation fails' });
    }

    const recipientNameExists = await Recipient.findOne({
      where: { name: req.body.name },
    });

    if (recipientNameExists) {
      return res.status(400).json({ error: 'Recipient already exists' });
    }

    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipCode,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipCode,
    });
  }

  async update(req, res) {
    const idRecipient = req.params.id;

    const schema = Yup.object().shape({
      // name: Yup.string().required(),
      street: Yup.string(),
      number: Yup.number().required(),
      complement: Yup.string().required(),
      state: Yup.string().required(),
      city: Yup.string().required(),
      zipCode: Yup.string().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Create Validation fails' });
    }

    if (req.body.name) {
      const recipientNameExists = await Recipient.findOne({
        where: { name: req.body.name },
      });
      if (recipientNameExists) {
        return res.status(400).json({ error: 'Recipient already exists' });
      }
    }

    const recipient = await Recipient.findByPk(idRecipient);

    if (!recipient) {
      return res.status(400).json({ error: 'Recipient not found' });
    }

    /*
    const {
      id,
      name,
      street,
      number,
      complement,
      state,
      city,
      zipCode } = */

    await Recipient.update(req.body, { where: { id: recipient.id } });

    return res.status(200).json({ msg: 'Recipient updated' });
  }

  async show(req, res) {
    console.log('show');
  }
}

export default new RecipientController();
