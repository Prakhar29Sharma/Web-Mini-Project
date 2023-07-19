const express = require('express');

const {getUser, getUsers} = require('../controllers/users');

const router = express.Router();

/* READ */
router.get('/', getUsers);
router.get('/:id', getUser);

module.exports = router;