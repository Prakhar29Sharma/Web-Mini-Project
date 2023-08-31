const express = require('express');

const {
    getContributor,
    getContributors,
    createContributor
} = require('../controllers/contributor');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getContributors);
router.get('/:username', getContributor);

/* CREATE */
// router.post('/', createContributor);

module.exports = router;