const express = require('express');

const {
    getCourses,
    updateCourseContent,
} = require('../controllers/course');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getCourses);

/* UPDATE  */

router.patch('/:courseId', updateCourseContent);

module.exports = router;