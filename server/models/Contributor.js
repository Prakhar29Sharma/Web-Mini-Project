const mongoose = require('mongoose');

const contributorSchema = new mongoose.Schema({
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
    subjectsToContribute: {
        type: String,
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
    },
    noOfCoursesPublic: {
        type: Number,
        default: 0,
    },
});

const Contributor = mongoose.model('Contributor', contributorSchema);

module.exports = Contributor;
