import Broker from '../../../models/Broker';

class BrokerController {
  async store(req, res) {
    const brokerExists = await Broker.findOne({
      where: { email: req.body.email },
    });

    if (brokerExists) {
      return res.status(400).json({ error: 'Broker already exists' });
    }

    const { id, name, email } = await Broker.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const broker = await Broker.findByPk(req.userId);

    if (email !== broker.email) {
      const brokerExists = await Broker.findOne({
        where: { email },
      });

      if (brokerExists) {
        return res.status(400).json({ error: 'Broker already exists' });
      }
    }

    if (oldPassword && !(await broker.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await broker.update(req.body);

    const { id, name } = await Broker.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new BrokerController();
