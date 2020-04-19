import Customer from '../app/models/Customer';
import Broker from '../app/models/Broker';

export default {
  secret: process.env.APP_SECRET,
  expiresIn: '7d',
};

export const guards = {
  customer: 'customer',
  broker: 'broker',
};

export const providers = {
  customer: Customer,
  broker: Broker,
};
