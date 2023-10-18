const Notification = require('../models/Notification');

/* READ */

const getNotifications = async (req, res) => {
    try {
        const { username } = req.params;
        const notifications = await Notification.find({ username: username });
        res.status(200).json({ notifications });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/* CREATE */

const createNotification = async (req, res) => {
    try {
        const { username, title, message } = req.body;
        const notification = new Notification({ username, title, message });
        await notification.save();
        res.status(200).json({ notification });
    } catch (error) {
        res.status(500).json({ error });
    }
}

/* DELETE */
const deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        await Notification.findByIdAndDelete(id);
        res.status(200).json({ message: 'Notification deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}

module.exports = {
    getNotifications,
    createNotification,
    deleteNotification
}
