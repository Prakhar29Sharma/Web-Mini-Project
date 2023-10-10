const express = require('express');
const { getEvaluator } = require('../controllers/evaluator');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/:username', getEvaluator);


module.exports = router;