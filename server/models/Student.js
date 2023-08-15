const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    user_id: {
        type: String,
        unique: true,
    },
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
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
    phone_no: {
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
    enrolled_in: {
        type: [String],
    },
    last_login: {
        type: Date,
    },
}, { timestamps: true });

const Student = mongoose.model('Student', studentSchema);

export default Student
