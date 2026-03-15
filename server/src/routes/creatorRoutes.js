const express = require('express');
const { getCreatorProducts } = require('../controllers/creatorController');

const router = express.Router();

router.get('/:id/products', getCreatorProducts);

module.exports = router;
