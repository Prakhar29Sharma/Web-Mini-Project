const mongoose = require('mongoose');

const rolesEnum = ['ADMIN', 'EVALUATOR', 'CONTRIBUTOR', 'STUDENT'];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 2,
        immutable: true,
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
    password: {
        type: String,
        required: true,
        minlength: 3,
    },
    role: {
        type: String,
        required: true,
        enum: rolesEnum,
    },
    portfolio: {
        type: String,
        default: '',
    },
    experience: {
        type: String,
        default: 0,
    },
    isActive: {
        type: Boolean,
        default: false,
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User