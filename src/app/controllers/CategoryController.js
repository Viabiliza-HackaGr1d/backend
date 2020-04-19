import Category from '../models/Category';
import { Sequelize } from 'sequelize';

class CategoryController {
  async store(req, res) {
    const { name } = req.body;

    if (!name){
      return res.status(400).json({error: 'A category must have a name.'});
    }

    const loweredName = name.toLowerCase();
    let category = await Category.findOne({
      where: {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + loweredName + '%')
      }
    });

    if (category){
      return res.status(409).json({ error: 'A category for this name already exists.' });
    }

    category = await Category.create(req.body);

    return res.json(category);

  }

  async update(req, res){

    const { id, name } = req.body;
    const category = await Category.findByPk(id);

    if (!category){
      return res.status(404).json({error: 'No category found for this ID.'});
    }

    await category.update({ id, name });

    return res.json({ id, name });
  }

  async delete(req, res){

  }
}

export default new CategoryController();
