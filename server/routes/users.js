const express = require('express');

const {
    getUser, 
    getUsers, 
    getUserWithRole,
    getNumOfUsers,
    createUser,
    updateUser
} = require('../controllers/users');

const authMiddleware = require('../middleware/auth');

const router = express.Router();

router.use(authMiddleware);

/* READ */
router.get('/', getUsers);
router.get('/:id', getUser);
router.get('/role/:role', getUserWithRole);
router.get('/count/:role', getNumOfUsers);

/* UPDATE */
router.patch('/:id', updateUser);

/* CREATE */
router.post('/', createUser);

module.exports = router;