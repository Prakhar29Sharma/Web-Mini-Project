const express = require("express");
const authMiddleware = require("../middleware/auth");
const { getUnit, getUnits, createUnit, deleteUnit } = require("../controllers/unit");

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getUnits);
router.get('/:subjectCode/:unitNum', getUnit);

/* CREATE */

router.post('/', createUnit);

/* DELETE */

router.delete('/:id', deleteUnit);

module.exports = router;
