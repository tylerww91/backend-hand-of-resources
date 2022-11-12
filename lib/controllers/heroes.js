const { Router } = require('express');
const { Hero } = require('../models/Hero');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Hero.getById(req.params.id);
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
      const data = await Hero.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Hero.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
