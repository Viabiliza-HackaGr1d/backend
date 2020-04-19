import * as Yup from 'yup';

export const storeValidator = async (req, res, next)=>{

  try {

    const schema = Yup.object().shape({
      customer_id: Yup.number().integer().required(),
      category_id: Yup.number().integer().required(),
      desc: Yup.string().trim().required(),
      clauses: Yup.string().required(),
      company_name: Yup.string().trim().required(),
      comapny_cnpj: Yup.string().trim().required()
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();

  } catch (err) {
    return res.status(400).json({ messages: err.inner });
  }

};

export const updateValidator = async (req, res, next)=>{
  try {
    const schema = Yup.object().shape({
      id: Yup.number().integer().required(),
      status: Yup.number().integer(),
      clauses: Yup.string().trim()
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ messages: err.inner });
  }
};

export const deleteValidator = async(req, res, next) => {
  try {
    const schema = Yup.object().shape({
      id: Yup.number().integer().required(),
    });

    await schema.validate(req.body, { abortEarly: false });

    return next();
  } catch (err) {
    return res.status(400).json({ messages: err.inner });
  }
};
