import jwt from 'jsonwebtoken';

import authConfig, { guards } from '../../../../config/auth';
import Broker from '../../../models/Broker';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const broker = await Broker.findOne({ where: { email } });

    if (!broker) {
      res.status(401).json({ error: 'Broker not found' });
    }

    if (!(await broker.checkPassword(password))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    const { id, name } = broker;
    return res.json({
      broker: {
        id,
        name,
        email,
      },
      token: jwt.sign({ id, guard: guards.broker }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
