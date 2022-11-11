const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Pet.getById(req.params.id);
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
      const data = await Pet.getAll();
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Pet.insert(req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .put('/:id', async (req, res, next) => {
    try {
      const data = await Pet.updateById(req.params.id, req.body);
      res.json(data);
    } catch (e) {
      next(e);
    }
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const data = await Pet.delete(req.params.id);
      res.json(data);
    } catch (e) {
      next(e);
    }
  });
