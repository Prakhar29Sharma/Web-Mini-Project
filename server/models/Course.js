const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    authorId: {
        type: String,
        required: true,
    },
    authorName: {
        type: String,
        required: true
    },
    subjectData: {
        type: JSON,
        required: true,
    },
    unitData: {
        type: JSON, 
        required: true,
    },
    courseVideoPath: {
        type: String,
    },
    coursePdfPath: {
        type: [String],
    },
    courseContent: {
        type: String,
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'Draft',
        enum: ['Draft', 'UnderReview', 'Approved']
    },
    rating: {
        type: Number,
        default: 0,
    },
}, { timestamps: true });

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
