const { Router } = require('express');
const { Team } = require('../models/Team');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Team.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next();
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Team.getAll();
      res.json(data);
    } catch (e) {
      next();
    }
  });
