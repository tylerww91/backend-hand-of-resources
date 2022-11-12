const { Router } = require('express');
const { Hero } = require('../models/Hero');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Hero.getAll();
    console.log(data);
    res.json(data);
  } catch (e) {
    next(e);
  }
});
