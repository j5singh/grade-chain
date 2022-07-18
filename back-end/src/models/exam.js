const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateCourseCode = function(nameORsurname) {
    var re = /^[0-9]+$/;
    return re.test(nameORsurname)
};

var validateCourseName = function(nameORsurname) {
    var re = /^[a-zA-Z]+$/;
    return re.test(nameORsurname)
};

const ExamSchema = new Schema({
    bookingOpening: {
        type: Number,
        required: true,
        validate: [validateCourseName, 'Please fill a valid course name']
    },
    bookingClosing: {
        type: Number,
        required: true,
    },
    teacherCode: {
        type: String,
        required: true,
        validate: [validateCourseCode, 'Please fill a valid teacher code'],
    },
    teacher: {
        type: String,
        required: true,
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        validate: [validateCourseCode, 'Please fill a valid course code'],
    },
    courseName: {
        type: String,
        required: true,
        validate: [validateCourseCode, 'Please fill a valid course code'],
    },
    examDate: {
        type: Number,
        required: true,
        validate: [validateCourseCode, 'Please fill a valid course code'],
    }
}, {collection: 'exams'});

const model = mongoose.model('ExamSchema', ExamSchema)

module.exports = model