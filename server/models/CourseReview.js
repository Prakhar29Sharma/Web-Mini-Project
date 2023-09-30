const mongoose = require('mongoose');

const courseReviewSchema = new mongoose.Schema({
    course_id: {
        type: String,
        required: true,
    },
    author: {
        type: String, 
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    title: {
        type: String,
    },
    content: {
        type: String,
    },

}, { timestamps: true });

const CourseReview = mongoose.model('CourseReview', courseReviewSchema);

export default CourseReview
