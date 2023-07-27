const Subject = require('../models/Subject');

/* READ */

const getSubject = async (req, res) => {
    try {
        const { subjectCode } = req.params;
        const subject = await Subject.findOne({ subjectCode: subjectCode });
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
        const subjects = await Subject.find({});
        res.json({
            status: 'ok',
            subjects: subjects 
        })
    } catch (err) {
        res.json({ status: 'error', error: err });
    }
}

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
        res.json({ status: 'error', error: err });
    }
};

module.exports = { getSubject, getSubjects, createSubject }