const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamSchema = new Schema({
    bookingOpening: {
        type: Number,
        required: true
    },
    bookingClosing: {
        type: Number,
        required: true,
    },
    teacherCode: {
        type: String,
        required: true
    },
    teacher: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true
    },
    courseName: {
        type: String,
        required: true
    },
    examDate: {
        type: Number,
        required: true
    },
    occurrences: {
        type: Number
    },
    subscribed: {
        type: Object
    }
}, {collection: 'exams'});

const model = mongoose.model('ExamSchema', ExamSchema)

module.exports = model