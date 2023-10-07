const mongoose = require('mongoose');

const unitSchema = new mongoose.Schema({
    unitNumber: {
        type: Number,
        required: true,
    }, 
    unitName: {
        type: String,
        required: true,
    },
    subjectCode: {
        type: String,
        required: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    unitDescription: {
        type: String,
        required: true,
    },
    unitPrerequisites: {
        type: [String],
        required: true,
    },
    unitObjectives: {
        type: [String],
        required: true,
    },
    unitImagePath: {
        type: String,
        required: true,
    },
});

const Unit = mongoose.model('Unit', unitSchema);

module.exports = Unit