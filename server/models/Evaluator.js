const mongoose = require('mongoose');

const EvaluatorSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required:true
    },
    lastName: {
        type: String,
        required:true
    },
    email: {
        type: String,
        required:true
    },
    dob: {
        type: Date,
        required:true,
    },
    phone: {
        type: String,
    },
    city: {
        type: String,
    },
    university: {
        type: String,
    },
    college: {
        type: String,
    },
    qualification: {
        type: String,
    },
    yearsOfExperience: {
        type: Number,
    },
    subjectsOfInterest: {
        type: String,
    },
    linkedIn: {
        type: String,
    },
    github: {
        type: String,
    },
    portfolio: {
        type: String,
    },
    profileImagePath: {
        type: String,
    }
});

const Evaluator = mongoose.model('Evaluator', EvaluatorSchema);

module.exports = Evaluator;