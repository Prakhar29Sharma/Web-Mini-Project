const express = require('express');
const { getCourseStats } = require('../controllers/stats');
const router = express.Router();

router.get('/course', getCourseStats);

module.exports = router;