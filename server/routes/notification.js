const { getNotifications, createNotification, deleteNotification } = require('../controllers/notification');
const express = require('express');

const router = express.Router();

/* READ */
router.get('/:username', getNotifications);

/* CREATE */
router.post('/', createNotification);

/* DELETE */
router.delete('/:id', deleteNotification);

module.exports = router;
