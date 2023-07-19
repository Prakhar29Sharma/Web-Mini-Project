const mongoose = require('mongoose');

const rolesEnum = ['ADMIN', 'EVALUATOR', 'CONTRIBUTOR', 'STUDENT'];

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true,
        minlength: 2,
        immutable: true,
        validate: {
            // checking if user already exists
            validator: function(v, cb) {
                User.find({name: v}, function(err,docs){
                    cb(docs.length == 0);
                });
            },
            message: 'User already exists!'
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
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
        default: 'ADMIN',
    },
}, { timestamps: true });

const User = mongoose.model("User", userSchema);

module.exports = User