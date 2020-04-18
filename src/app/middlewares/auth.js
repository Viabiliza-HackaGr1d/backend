import jwt from 'jsonwebtoken';
import { promisify } from 'util';

import authConfig from '../../config/auth';

export default guard => {
  return async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: 'Token not provided' });
    }

    const [, token] = authHeader.split(' ');

    try {
      const decoded = await promisify(jwt.verify)(token, authConfig.secret);

      req.userId = decoded.id;
      const tokenGuard = decoded.guard;

      if (!(tokenGuard === guard)) {
        return res
          .status(401)
          .json({ error: `You don't have permissions to access this route` });
      }

      return next();
    } catch (err) {
      return res.status(401).json({ error: 'Token Invalid' });
    }
  };
};
