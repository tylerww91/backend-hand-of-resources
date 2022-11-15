const { Router } = require('express');
const { Player } = require('../models/Player');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Player.getById(req.params.id);
      if (!data) {
        next();
      }
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const data = await Player.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
