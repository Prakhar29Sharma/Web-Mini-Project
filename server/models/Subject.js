const mongoose = require('mongoose');

const deptEnum = ['IT', 'EXTC', 'MECH', 'COMP'];

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true,
    },
    subjectName: {
        type: String,
        required: true,
    },
    semester: {
        type: Number,
        required: true,
        min: 1,
        max: 8,
    },
    department: {
        type: String,
        required: true,
        default: 'IT',
        enum: deptEnum,
    },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject