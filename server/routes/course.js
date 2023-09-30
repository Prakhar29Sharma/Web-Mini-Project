const express = require('express');

const {
    getCourses,
} = require('../controllers/course');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */

router.get('/', getCourses);

module.exports = router;