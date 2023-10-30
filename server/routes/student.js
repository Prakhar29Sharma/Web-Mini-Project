const express = require('express');
const { getStudent, getStudents } = require('../controllers/student');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getStudents);
router.get('/:username', getStudent);

/* CREATE */
// router.post('/', createContributor);

module.exports = router;