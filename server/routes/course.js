const express = require('express');

const {
    getCourse,
    getCourses,
    getCoursesBySubject,
    getCoursesByUnit,
    getUnitBySubject,
    getCoursesByAuthor,
    createCourse,
} = require('../controllers/course');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getCourses);

router.get('/:id', getCourse);

router.get('/subject/:subject', getCoursesBySubject);

router.get('/unit/:unit', getCoursesByUnit);

router.get('/author/:author', getCoursesByAuthor);

router.get('/unit/:subject', getUnitBySubject);

/* CREATE */
// router.post('/', createCourse);

module.exports = router;