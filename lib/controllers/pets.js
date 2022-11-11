const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router()
  .get('/:id', async (req, res) => {
    const data = await Pet.getById(req.params.id);
    // if (!data) {
    //   next();
    // }
    res.json(data);
    // } catch (e) {
    //   try {
    //     next(e);
    //   }
  })

  .get('/pets', async (req, res) => {
    const data = await Pet.getAll();
    res.json(data);
    // try {
    // } catch (e) {
    //   next(e);
    // }
  });
