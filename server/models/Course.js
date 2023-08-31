const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    author_id: {
        type: String,
        required: true,
    },
    author_name: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true,
    },
    unit: {
        type: String, 
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    objectives: {
        type: [String],
    },
    prerequisites: {
        type: [String],
    },
    course_video_path: {
        type: String,
    },
    content: {
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
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;
