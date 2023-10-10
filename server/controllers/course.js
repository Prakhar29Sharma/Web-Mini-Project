const Course = require('../models/Course');

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
        const { subjects, isPublic } = req.query;
        const courses = await Course.find({ 'subjectData.subjectName': { $in: subjects }, isPublic: isPublic });
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
    if (user.role !== 'CONTRIBUTOR') {
        throw 'Unauthorized access';
    }
    const courseId = req.params.courseId;
    const { courseContent, status } = req.query;
    try {
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
            await course.save();
            console.log(course);
            res.json({
                status: 'ok',
                message: 'Course content updated successfully',
            });
        }
    } catch (error) {
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
