const { Router } = require('express');
const { Pet } = require('../models/Pet');

module.exports = Router().get('/pets', async (req, res, next) => {
  try {
    const data = await Pet.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
