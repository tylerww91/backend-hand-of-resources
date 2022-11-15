const { Router } = require('express');
const { Player } = require('../models/Player');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Player.getAll();
    res.json(data);
  } catch (e) {
    next(e);
  }
});
