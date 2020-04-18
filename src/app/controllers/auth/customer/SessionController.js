import jwt from 'jsonwebtoken';

import authConfig from '../../../../config/auth';
import Customer from '../../../models/Customer';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const customer = await Customer.findOne({ where: { email } });

    if (!customer) {
      res.status(401).json({ error: 'Customer not found' });
    }

    if (!(await customer.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = customer;
    return res.json({
      customer: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
