const mongoose = require('mongoose');
const { Schema } = mongoose;

const ExamSchema = new Schema({
    bookingOpening: {
        type: Number,
        required: true
    },
    bookingClosing: {
        type: Number,
        required: true
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
        required: true
    },
    courseName: {
        type: String,
        required: true
    },
    examDate: {
        type: Number,
        required: true
    }
}, {collection: 'exams'})

const SubscriptionSchema = new Schema({
    serialNumber: {
        type: String,
        required: true
    },
    exam: {
        type: ExamSchema,
        required: true
    }
}, {collection: 'exam_subscriptions'});

const model = mongoose.model('SubscriptionSchema', SubscriptionSchema)

module.exports = model