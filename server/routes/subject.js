const express = require("express");

const { getSubject, getSubjects, createSubject, deleteSubject, getSubjectBySem, getSubjectByYear, getSubjectByDept } = require("../controllers/subject");

const router = express.Router();

/* READ */

router.get('/', getSubjects);
router.get('/:subjectCode', getSubject);
router.get('/sem/:sem', getSubjectBySem);
router.get('/year/:year', getSubjectByYear);
router.get('/dept/:dept', getSubjectByDept);

/* CREATE */
router.post('/', createSubject);

/* DELETE */
router.delete('/:id', deleteSubject);

module.exports = router;