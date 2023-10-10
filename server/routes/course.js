const express = require('express');

const {
    getCourses,
    updateCourseContent,
    deleteCourse,
    getCoursesBySubjects,

} = require('../controllers/course');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getCourses);
router.get('/subjects/', getCoursesBySubjects);

/* UPDATE  */

router.patch('/:courseId', updateCourseContent);

/* DELETE */

router.delete('/:courseId', deleteCourse);

module.exports = router;