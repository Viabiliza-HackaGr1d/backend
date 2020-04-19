import Category from '../models/Category';

import * as Yup from 'yup';

export const updateValidator = async (req, res, next)=>{
  try {
    const schema = Yup.object().shape({
      id: Yup.number().integer().required("An ID must be informed."),
      name: Yup.string().trim().required("A name must be informed.")
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ messages: err.inner });
  }
};
