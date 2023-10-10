const express = require('express');

const { createCourseReview } = require('../controllers/reviews');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* CREATE */
router.post('/', createCourseReview);

module.exports = router;