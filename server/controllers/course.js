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
        const courses = await Course.find({});
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
const getUnitBySubject = async (req, res) => {
    try{
        const {subject}=req.params;
        const courses=await Course.find({subject:subject})
        res.json({
            status:'ok',
            courses:courses
        })
    }
    catch(err){
        res.json({status:'error',error:err});
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
        const { author } = req.params;
        const courses = await Course.find({ author: author });
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



module.exports = {
    getCourse,
    getCourses,
    getCoursesBySubject,
    getCoursesByUnit,
    getCoursesByAuthor,
    createCourse,
    getUnitBySubject,
};