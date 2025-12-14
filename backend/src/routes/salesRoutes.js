const express = require('express');
const { getSalesHandler } = require('../controllers/salesController');

const router = express.Router();

// GET /api/sales
router.get('/', getSalesHandler);

module.exports = router;
