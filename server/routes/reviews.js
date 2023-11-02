const express = require('express');

const { createCourseReview, getReviewsByCourseId } = require('../controllers/reviews');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/:courseId', getReviewsByCourseId);

/* CREATE */
router.post('/', createCourseReview);

module.exports = router;