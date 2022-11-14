const { Router } = require('express');
const { Team } = require('../models/Team');

module.exports = Router().get('/', async (req, res, next) => {
  try {
    const data = await Team.getAll();
    res.json(data);
  } catch (e) {
    next();
  }
});
