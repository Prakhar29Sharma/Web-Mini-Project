const { json } = require('express');
const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    author: {
        type: String,
        required: true,
    },
    username: {
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
        type: [String],
    },
    content: {
        type: json
    },
    isPublic: {
        type: Boolean,
        default: false,
    },
    status: {
        type: String,
        default: 'Not Submitted',
        enum: ['Not Submitted', 'Under Review', 'Approved']
    }
});

const Course = mongoose.model('Course', courseSchema);

module.exports = Course;