import Assurance from '../models/Assurance';
import Broker from '../models/Broker';
import Category from '../models/Category';

class AssuranceController {

  // This route should be used only by the broker
  async store(req, res){

    const { category_id, customer_id, desc, clauses } = req.body;
    const broker_id = req.userId;

    if (customer_id === broker_id){
      return res.status(401).json({ error: 'Broker must be different thant the customer.' });
    }

    const broker = await Broker.findByPk(broker_id);

    if (!broker){
      return res.status(400).json({ error: "Broker doesn't exist." });
    }

    const category = await Category.findByPk(category_id);

    if (!category){
      return res.status(400).json({ error: "Category doesn't exist" });
    }

    const { company_name, company_cnpj } = req.body;

    const assurance = await Assurance.create({
      customer_id,
      broker_id,
      category_id,
      company_name,
      company_cnpj,
      desc,
      clauses
    });

    return res.json(assurance);

  }

  async update(req, res){
    const { id } = req.body;

    const assurance = await Assurance.findByPk(id);

    if (!assurance){
      return res.status(404).json({ error: 'No assurance found for this ID.' });
    }

    if (assurance.status === 4){
      return res.status(401).json({ error: 'This assurance has already been cancelled.' });
    }

    const { status, clauses } = req.body;
    switch (req.userId){
      default:
        return res.status(401).json({ error: "You're not allowed to make changes to this assurance." });
      case assurance.broker_id:
        if (clauses){
          assurance.clauses = clauses;
          status = 0; // Since clausules were changed, the customer needs to approve it
        }
        break;
      case assurance.customer_id:
        break;
    }

    if (status){
      assurance.status = status;
      if (status === 3) assurance.cancelled_by = req.userId;
    }

    await assurance.save();

    return res.json(assurance);

  }

  async delete(req, res){

    const { id } = req.body;

    const assurance = await Assurance.findByPk(id);

    if (!assurance){
      return res.status(404).json({ error: 'No assurance found for this ID.' });
    }

    const { customer_id, broker_id } = assurance;

    if (req.userId !== customer_id || req.userId !== broker_id){
      return res.status(401).json({ error: "You're not allowed to delete this assurance." });
    }

    if (assurance.status !== 3){
      return res.status(400).json({ error: "This assurance is not pending to be cancelled." });
    }

    if (assurance.cancelled_by === req.userId){
      return res.status(401).json({ error: "An user can't cancel its own pending cancellation." })
    }

    assurance.status = 4;

    await assurance.save();

    return res.json(assurance);

  }

};

export default new AssuranceController();
