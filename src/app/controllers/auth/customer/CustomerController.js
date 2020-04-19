import Customer from '../../../models/Customer';

class CustomerController {
  async store(req, res) {
    const customerExists = await Customer.findOne({
      where: { email: req.body.email },
    });

    if (customerExists) {
      return res.status(400).json({ error: 'Customer already exists' });
    }

    const { id, name, email } = await Customer.create(req.body);

    return res.json({
      id,
      name,
      email,
    });
  }

  async update(req, res) {
    const { email, oldPassword } = req.body;

    const customer = await Customer.findByPk(req.userId);

    if (email !== customer.email) {
      const customerExists = await Customer.findOne({
        where: { email },
      });

      if (customerExists) {
        return res.status(400).json({ error: 'Customer already exists' });
      }
    }

    if (oldPassword && !(await customer.checkPassword(oldPassword))) {
      return res.status(401).json({ error: 'Password does not match' });
    }

    await customer.update(req.body);

    const { id, name } = await Customer.findByPk(req.userId);

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new CustomerController();
