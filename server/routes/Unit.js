const express = require("express");

const { getUnit, getUnits, createUnit, deleteUnit } = require("../controllers/unit");

const router = express.Router();

/* READ */

router.get('/', getUnits);
router.get('/:subjectCode/:unitNum', getUnit);

/* CREATE */

router.post('/', createUnit);

/* DELETE */

router.delete('/:id', deleteUnit);

module.exports = router;