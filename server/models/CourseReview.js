const mongoose = require('mongoose');

const courseReviewSchema = new mongoose.Schema({
    courseId: {
        type: String,
        required: true,
    },
    authorId: {
        type: String, 
        required: true,
    },
    authorName: {
        type: String,
        required: true,
    },
    authorRole: {
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
