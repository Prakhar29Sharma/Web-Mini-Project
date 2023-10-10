const { getNotifications, createNotification } = require('../controllers/notification');
const express = require('express');

const router = express.Router();

/* READ */
router.get('/:username', getNotifications);

/* CREATE */
router.post('/', createNotification);

module.exports = router;
