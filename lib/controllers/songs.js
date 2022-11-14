const { Router } = require('express');
const { Song } = require('../models/Song');

module.exports = Router()
  .get('/:id', async (req, res, next) => {
    try {
      const data = await Song.getById(req.params.id);
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
      const data = await Song.getAll();
      res.json(data);
    } catch (e) {
      next();
    }
  })

  .post('/', async (req, res, next) => {
    try {
      const data = await Song.insert(req.body);
      res.json(data);
    } catch (e) {
      next();
    }
  });
