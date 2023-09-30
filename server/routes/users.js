const express = require('express');

const {
    getUser, 
    getUsers, 
    getUserWithRole,
    getNumOfUsers,
    createUser
} = require('../controllers/users');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/role/:role', getUserWithRole);
router.get('/count/:role', getNumOfUsers);

/* CREATE */
router.post('/', createUser);

module.exports = router;