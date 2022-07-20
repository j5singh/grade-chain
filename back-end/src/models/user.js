const mongoose = require('mongoose');
const { Schema } = mongoose;

var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

var validateNameSurname = function(nameORsurname) {
    var re = /^[a-zA-Z]+$/;
    return re.test(nameORsurname)
};

const UserSchema = new Schema({
    serialNumber: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
        validate: [validateNameSurname, 'Please fill a valid name']
    },
    surname: {
        type: String,
        required: true,
        validate: [validateNameSurname, 'Please fill a valid surname']
    },
    email: {
        type: String,
        trim: true,
        lowercase: true,
        unique: true,
        required: 'Email address is required',
        validate: [validateEmail, 'Please fill a valid email address'],
    },
    roles: {
        type: String,
        enum: ['student', 'teacher'],
        default: 'student'
    },
    token: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    }
}, {collection: 'users'});

const model = mongoose.model('UserSchema', UserSchema)

module.exports = model