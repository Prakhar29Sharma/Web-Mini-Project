const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    read: {
        type: Boolean,
        default: false
    }, 
    date: {
        type: Date,
        default: Date.now
    }
}, { timestamps: true });

const Notification = mongoose.model('Notification', NotificationSchema);

module.exports = Notification;