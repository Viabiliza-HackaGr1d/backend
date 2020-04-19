import Broker from '../models/Broker';
import Assurance from '../models/Assurance';
import File from '../models/File';
import Customer from '../models/Customer';

class BrokerDashboardController {
  async index(req, res) {
    const id = req.userId;

    const broker = await Broker.findByPk(id, {
      include: [
        {
          model: Assurance,
          as: 'assurances',
          order: [['created_at', 'DESC']],
          limit: 10,
          include: [
            {
              model: Customer,
              as: 'customer',
            },
          ],
        },
      ],
    });

    return res.json(broker);
  }
}

export default new BrokerDashboardController();
