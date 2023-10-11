const Course = require('../models/Course');

/* READ */

const getCourseStats = async (req, res) => {
    try {
        const totalCourseCount = await Course.countDocuments({});
        const approvedCourseCount = await Course.countDocuments({ status: 'Approved' });
        const underReviewCourseCount = await Course.countDocuments({ status: 'UnderReview' });
        const draftCourseCount = await Course.countDocuments({ status: 'Draft' });
        const publicCourseCount = await Course.countDocuments({ isPublic: true });
        res.json({
            status: 'ok',
            totalCourseCount: totalCourseCount,
            approvedCourseCount: approvedCourseCount,
            underReviewCourseCount: underReviewCourseCount,
            draftCourseCount: draftCourseCount,
            publicCourseCount: publicCourseCount,
        })
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

module.exports = { getCourseStats };