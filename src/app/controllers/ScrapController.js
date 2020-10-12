import * as Yup from 'yup';

import Scrap from '../models/Scrap';

class ScrapController {
  async index(req, res) {
    try {
      const scraps = await Scrap.findAll({
        attributes: ['id', 'title', 'message'],
        where: {
          user_id: req.userId,
        },
      });
      return res.json(scraps);
    } catch (error) {
      return res.json(error);
    }
  }

  async store(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string().required(),
        message: Yup.string().required(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validation failed' });
      }

      const scrap = {
        user_id: req.userId,
        ...req.body,
      };

      const { id, title, message } = await Scrap.create(scrap);

      return res.json({
        id,
        title,
        message,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  async update(req, res) {
    try {
      const schema = Yup.object().shape({
        title: Yup.string(),
        message: Yup.string(),
      });

      if (!(await schema.isValid(req.body))) {
        return res.status(400).json({ error: 'Validate failed' });
      }

      const scrap = await Scrap.findByPk(req.params.id);

      if (!scrap) {
        return res.status(404).json({ error: 'Scrap does not exist' });
      }

      const { id, title, message } = await scrap.update(req.body);

      return res.json({
        id,
        title,
        message,
      });
    } catch (error) {
      return res.json(error);
    }
  }

  async delete(req, res) {
    try {
      const scrap = await Scrap.findByPk(req.params.id);

      if (!scrap) {
        return res.status(404).json({ error: 'Scrap does not exist' });
      }
      if (scrap.user_id !== req.userId) {
        return res.status(401).json({ error: 'You do not own this scrap!' });
      }

      await scrap.destroy();

      return res.status(204).send();
    } catch (error) {
      return res.json(error);
    }
  }
}

export default new ScrapController();
