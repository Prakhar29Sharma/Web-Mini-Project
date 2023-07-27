const express = require("express");

const { getSubject, getSubjects, createSubject } = require("../controllers/subject");

const router = express.Router();

/* READ */

router.get('/', getSubjects);
router.get('/:subjectCode', getSubject);

/* CREATE */
router.post('/', createSubject);

module.exports = router;
