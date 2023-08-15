import Subject, { findOne, find, deleteOne } from '../models/Subject';

/* READ */

const getSubject = async (req, res) => {
    try {
        const { subjectCode } = req.params;
        const subject = await findOne({ subjectCode: subjectCode });
        res.json({
            status: 'ok',
            subject: subject
        })
    } catch (err) {
        res.json({ status: 'error', error: err })
    }
};

const getSubjects = async (req, res) => {
    try {
        const subjects = await find({});
        res.json({
            status: 'ok',
            subjects: subjects 
        })
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getSubjectBySem = async (req, res) => {
    try {
        const sem = req.params.sem;
        const subjects = await find({ semester: sem });
        res.json({
            status: 'ok',
            subjects: subjects,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getSubjectByYear = async (req, res) => {
    try {
        const year = req.params.year;
        const subjects = await find({ year: year.toUpperCase() });
        res.json({
            status: 'ok',
            subjects: subjects,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

const getSubjectByDept = async (req, res) => {
    try {
        const dept = req.params.dept;
        const subjects = await find({ department: dept.toUpperCase() });
        res.json({
            status: 'ok',
            subjects: subjects,
        });
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
};

/* CREATE */

const createSubject = async (req, res) => {
    try {
        const newSubject = Subject(req.body);
        await newSubject.save();
        res.json({
            status: 'ok',
            message: 'new subject added',
        });
    } catch (err) {
        res.json({ status: 'error', error: 'subject already exists' });
    }
};

/* DELETE */

const deleteSubject = async (req, res) => {
    try {
        const id = req.params.id;
        const subject = await findOne({ _id: id });
        if (subject) {
            await deleteOne({ _id: id });
            res.json({
                status: 'ok',
                message: 'deleted subject with id = ' + id,
            });
        } else {
            throw Error;
        }

    } catch (err) {
        res.json({ status: 'error', error: 'invalid subject id' });
    }
};

export default { getSubject, getSubjects, createSubject, deleteSubject, getSubjectBySem, getSubjectByYear, getSubjectByDept }