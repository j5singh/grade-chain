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

const TeacherSchema = new Schema({
    teacherCode: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    surname: {
        type: String,
        require: true
    }
})

const CourseSchema = new Schema({
    courseName: {
        type: String,
        required: true,
        validate: [validateCourseName, 'Please fill a valid course name']
    },
    teacher: {
        type: TeacherSchema,
        required: true,
    },
    cfu: {
        type: Number,
        required: true,
    },
    year: {
        type: Number,
        enum: [1, 2, 3],
    },
    courseCode: {
        type: String,
        required: true,
        unique: true,
        validate: [validateCourseCode, 'Please fill a valid course code'],
    }
}, {collection: 'courses'});

const model = mongoose.model('CourseSchema', CourseSchema)

module.exports = model