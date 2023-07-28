const mongoose = require('mongoose');

const deptEnum = ['IT', 'EXTC', 'MECH', 'COMP'];

const subjectSchema = new mongoose.Schema({
    subjectCode: {
        type: String,
        required: true,
        unique: true,
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
    year: {
        type: String
    },
    department: {
        type: String,
        required: true,
        default: 'IT',
        enum: deptEnum,
    },
    subjectType: {
        type: String,
        enum: ['Theory', 'Practical'],
        default: 'Theory',
    },
}, { timestamps: true });

const Subject = mongoose.model('Subject', subjectSchema);

module.exports = Subject