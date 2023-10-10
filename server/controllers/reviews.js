const CourseReview = require('../models/CourseReview');
const Course = require('../models/Course');

const createCourseReview = async (req, res) => {
    try {
        const { courseId, authorId, authorName, authorRole, rating, review } = req.body;
        const courseReview = new CourseReview({
            courseId: courseId,
            authorId: authorId,
            authorName: authorName,
            authorRole: authorRole,
            rating: rating,
            review: review,
        });
        await courseReview.save();
        const courseReviews = (await CourseReview.find({ courseId: courseId })).map((review) => review.rating);
        const avgRating = courseReviews.reduce((a, b) => a + b, 0) / courseReviews.length;
        const course = await Course.findById(courseId);
        course.rating = avgRating;
        await course.save();
        res.json({
            status: 'ok',
            data: courseReview
        })
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

module.exports = {
    createCourseReview
}