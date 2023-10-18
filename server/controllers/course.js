const Course = require('../models/Course');
const Contributor = require('../models/Contributor');
const createMail = require('../services/mailService');

/* READ */

const getCourse = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id);
        res.json({
            status: 'ok',
            data: course
        })
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getCourses = async (req, res) => {
    try {
        const { id, authorName, status, subject, unit } = req.query;
        if (id) {
            const course = await Course.findById(id);
            res.json({
                status: 'ok',
                data: course
            });
            return;
        } else if (authorName && status) {
            const courses = await Course.find({ authorName: authorName, status: status });
            res.json({
                status: 'ok',
                data: courses
            });
            return;
        } else if (authorName) {
            const courses = await Course.find({ authorName: authorName });
            res.json({
                status: 'ok',
                data: courses
            });
            return;
        } else if (status) {
            const courses = await Course.find({ status: status });
            res.json({
                status: 'ok',
                data: courses
            });
            return;
        } else if (subject) {
            const courses = await Course.find({ 'subjectData.subjectName': subject });
            res.json({
                status: 'ok',
                data: courses
            });
            return;
        } else if (unit) {
            const courses = await Course.find({ 'unitData.unitName': unit });
            res.json({
                status: 'ok',
                data: courses
            });
            return;
        }
        const courses = await Course.find();
        res.json({
            status: 'ok',
            data: courses
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getCoursesBySubject = async (req, res) => {
    try {
        const { subject } = req.params;
        const courses = await Course.find({ subject: subject });
        res.json({
            status: 'ok',
            data: courses
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getCoursesByUnit = async (req, res) => {
    try {
        const { unit } = req.params;
        const courses = await Course.find({ unit: unit });
        res.json({
            status: 'ok',
            data: courses
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getCoursesByAuthor = async (req, res) => {
    try {
        const { authorName, status } = req.query;
        const courses = await Course.find({ authorName: authorName, status: status });
        res.json({
            status: 'ok',
            data: courses
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

const getCoursesBySubjects = async (req, res) => {
    try {
        const { subjects, isPublic, status } = req.query;
        const courses = await Course.find({ 'subjectData.subjectName': { $in: subjects }, isPublic: isPublic, status: status });
        res.json({
            status: 'ok',
            data: courses
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

/* CREATE */

const createCourse = async (req, res) => {
    try {
        const user = req.user;
        if (user.role !== 'CONTRIBUTOR') {
            throw 'Unauthorized access';
        }
        const course = new Course(req.body);
        await course.save();
        res.json({
            status: 'ok',
            message: 'Course created successfully',
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

/* UPDATE */

const updateCourseContent = async (req, res) => {
    const user = req.user;
    const courseId = req.params.courseId;
    const { courseContent, status, isPublic } = req.query;
    try {
        if (user.role !== 'CONTRIBUTOR' && user.role !== 'EVALUATOR' && user.role !== 'ADMIN') {
            throw 'Unauthorized access';
        }
        const course = await Course.findById(courseId);
        if (!course) {
            throw 'Course not found';
        } else {
            if (courseContent) {
                course.courseContent = courseContent;
            }
            if (status) {
                course.status = status;
            }
            if (isPublic) {
                const authorProfile = await Contributor.findOne({ username: course.authorName });
                await createMail(authorProfile.firstName, authorProfile.email, 'Course made public', `<p>Your course on subject ${course.subjectData.subjectName}, unit ${course.unitData.unitName} has been made public on Edulib<p><br /><p>regards,<br />Team Edulib</p>`)
                course.isPublic = isPublic;
            }
            await course.save();
            // console.log(course);
            res.json({
                status: 'ok',
                message: 'Course content updated successfully',
            });
        }
    } catch (error) {
        console.log(error);
        res.json({ status: 'error', error: err });
    }
}

/* DELETE */

const deleteCourse = async (req, res) => {
    const user = req.user;
    if (user.role !== 'CONTRIBUTOR') {
        throw 'Unauthorized access';
    }
    try {
        const id = req.params.courseId;
        const course = await Course.findOne({ _id: id });
        if (course) {
            await Course.deleteOne({ _id: id });
            res.json({
                status: 'ok',
                message: 'deleted course with id = ' + id,
            });
        } else {
            throw "Course not found";
        }
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

module.exports = {
    getCourse,
    getCourses,
    getCoursesBySubject,
    getCoursesBySubjects,
    getCoursesByUnit,
    getCoursesByAuthor,
    createCourse,
    updateCourseContent,
    deleteCourse
};
