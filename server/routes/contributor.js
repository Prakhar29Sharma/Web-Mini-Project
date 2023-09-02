const express = require('express');

const {
    getContributor,
    getContributors,
    createContributor,
    getSubjectsToContribute,    
} = require('../controllers/contributor');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getContributors);
router.get('/:username', getContributor);
router.get('/subjects', getSubjectsToContribute);
/* CREATE */
// router.post('/', createContributor);

module.exports = router;