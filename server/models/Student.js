const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    dob: {
        type: Date,
    },
    email: {
        type: String,
        unique: false,
        required: true,
        trim: true,
        lowercase: true,
        validate: {
        validator: function (value) {
            // Regular expression to validate email format
            return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value);
        },
        message: 'Please provide a valid email address',
        },
    },
    phone: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    university: {
        type: String,
        required: true,
    },
    college: {
        type: String,
        required: true,
    },
    recentlyVisited: {
        type: [String],
    },
    profileImagePath: {
        type: String,
    },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

module.exports = Student;
