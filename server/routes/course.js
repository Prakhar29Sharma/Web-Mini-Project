const express = require('express');

const {
    getCourses,
    updateCourseContent,
    deleteCourse,
    updateStatus
} = require('../controllers/course');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getCourses);

/* UPDATE  */

router.patch('/:courseId', updateCourseContent);


/* DELETE */

router.delete('/:courseId', deleteCourse);

module.exports = router;