const Subject = require('../models/Subject');

/* READ */

const getSemList=(req,res)=>{
    try{
        const minSem=1;
        const maxSem=8;
    //    const maxSem = Subject.schema.path('semester').validators[0].max; // Get the max value validator

    const semList=Array.from({length: maxSem-minSem+1},(_,i)=>i+minSem);
    res.json({
        status: 'ok',
        semList: semList,
    })
    }
    catch(err){
        res.status(500).json({ status: 'error', error: err.message });
    }
}

const getDeptList = (req, res) => {
    try {
        const deptEnum = Subject.schema.path('department').enumValues;
      res.json({
        status: 'ok',
        deptEnum: deptEnum,
      });
    } catch (err) {
      res.status(500).json({ status: 'error', error: err.message });
    }
  };

const getYearByDept =(req,res)=>{
    try{
        const yearEnum  = Subject.schema.path('year').enumValues;
        res.json({
            status: 'ok',
            yearEnum: yearEnum
        })
    }
    catch(err){ 
        res.status(501).json({ status: 'error', error: err.message });
    }
}
  

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
};

const getSubjectBySem = async (req, res) => {
    try {
        const sem = req.params.sem;
        const subjects = await Subject.find({ semester: sem });
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
        const subjects = await Subject.find({ year: year.toUpperCase() });
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
        const subjects = await Subject.find({ department: dept.toUpperCase() });
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
    const user = req.user;
    if (user.role !== 'ADMIN') {
        return res.json({ status: 'error', error: 'You are not authorized to perform this action'});
    }
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
    const user = req.user;
    if (user.role !== 'ADMIN') {
        return res.json({ status: 'error', error: 'You are not authorized to perform this action'});
    }
    try {
        const id = req.params.id;
        const subject = await Subject.findOne({ _id: id });
        if (subject) {
            await Subject.deleteOne({ _id: id });
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

module.exports = {getSemList,getYearByDept, getDeptList, getSubject, getSubjects, createSubject, deleteSubject, getSubjectBySem, getSubjectByYear, getSubjectByDept }