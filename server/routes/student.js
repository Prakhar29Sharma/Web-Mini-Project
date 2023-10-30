const express = require('express');
const { getStudent, getStudents, updateStudent } = require('../controllers/student');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getStudents);
router.get('/:username', getStudent);

/* UPDATE */
router.patch('/add_course/:username', updateStudent);

/* CREATE */
// router.post('/', createContributor);

module.exports = router;