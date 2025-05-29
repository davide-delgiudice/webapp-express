const express = require('express');

const router = express.Router();

const movieController = require('../controllers/movieController');

// rotta index
router.get('/', movieController.index);

// rotta show
router.get('/:id', movieController.show);


module.exports = router;