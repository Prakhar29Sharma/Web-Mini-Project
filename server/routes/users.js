const express = require('express');

const {
    getUser, 
    getUsers, 
    getUserWithRole,
    getNumOfUsers
} = require('../controllers/users');

const router = express.Router();

/* READ */
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/role/:role', getUserWithRole);
router.get('/count/:role', getNumOfUsers);

module.exports = router;